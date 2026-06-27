import { list } from "@vercel/blob";

const BLOB_PATH = "regatta/live.json";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const { blobs } = await list({ ...blobAuthOptions(), prefix: BLOB_PATH, limit: 1 });
    const blob = (blobs || []).find((item) => item.pathname === BLOB_PATH) || (blobs || [])[0];
    if (!blob?.url) {
      return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu" });
    }
    const fetchHeaders = {};
    if (process.env.BLOB_READ_WRITE_TOKEN) fetchHeaders.Authorization = `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`;
    const liveRes = await fetch(blob.url, { cache: "no-store", headers: fetchHeaders });
    if (!liveRes.ok) return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu" });
    const text = await liveRes.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(text);
  } catch (error) {
    return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu" });
  }
}
