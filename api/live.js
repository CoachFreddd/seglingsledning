import { get } from "@vercel/blob";

const BLOB_PATH = "regatta/live.json";

function blobAuthOptions() {
  const options = {};
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    options.token = process.env.BLOB_READ_WRITE_TOKEN;
  }
  return options;
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const blob = await get(BLOB_PATH, blobAuthOptions());
    if (!blob?.url && !blob?.stream) {
      return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu", detail: "Blob saknas på regatta/live.json i den Blob-store som API:t läser från." });
    }
    const text = blob.stream ? await new Response(blob.stream).text() : await fetch(blob.url, { cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error(`Blob HTTP ${r.status}`);
      return r.text();
    });
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(text);
  } catch (error) {
    return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu", detail: error?.message || "" });
  }
}
