import { get } from "@vercel/blob";

const BLOB_PATH = "regatta/live.json";

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
    const blob = await get(BLOB_PATH);
    if (!blob || blob.statusCode !== 200) {
      return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu" });
    }
    const text = blob.stream ? await new Response(blob.stream).text() : await fetch(blob.url).then((r) => r.text());
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(text);
  } catch (error) {
    return res.status(404).json({ ok: false, error: "Ingen publicerad regatta ännu" });
  }
}
