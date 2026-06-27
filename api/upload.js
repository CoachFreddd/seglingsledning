import { put } from "@vercel/blob";

const BLOB_PATH = "regatta/live.json";
const MAX_BODY_BYTES = 1024 * 1024;

function blobAuthOptions() {
  const options = {};
  if (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN) {
    options.storeId = process.env.BLOB_STORE_ID;
    options.oidcToken = process.env.VERCEL_OIDC_TOKEN;
  }
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    options.token = process.env.BLOB_READ_WRITE_TOKEN;
  }
  return options;
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

async function readPayload(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("Payload too large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : null;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const expectedToken = process.env.REGATTA_UPLOAD_TOKEN;
  if (!expectedToken) return res.status(500).json({ ok: false, error: "REGATTA_UPLOAD_TOKEN saknas i Vercel" });

  const gotToken = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (gotToken !== expectedToken) return res.status(401).json({ ok: false, error: "Fel token" });

  try {
    const payload = await readPayload(req);
    if (!payload || typeof payload !== "object") return res.status(400).json({ ok: false, error: "Saknar JSON" });
    if (!payload.regatta || !Array.isArray(payload.teams) || !Array.isArray(payload.schedule)) {
      return res.status(400).json({ ok: false, error: "Ogiltig regattadata" });
    }
    const body = JSON.stringify({ ...payload, serverSavedAt: Date.now() });
    const blob = await put(BLOB_PATH, body, {
      ...blobAuthOptions(),
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json"
    });
    return res.status(200).json({ ok: true, pathname: blob.pathname, updatedAt: payload.updatedAt || null });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error?.message || "Upload failed" });
  }
}
