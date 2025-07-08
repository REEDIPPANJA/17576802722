import { nanoid } from "nanoid";
const urlDB = new Map(); 
export const urlShortener=async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = nanoid(6);
  const expiresAt = Date.now() + 30 * 60 * 1000; 

  urlDB.set(shortId, { originalUrl: url, expiresAt });
  res.json({ shortUrl: `http://localhost:3000/${shortId}` });
}
export const redirectId=async (req, res) => {
  const data = urlDB.get(req.params.shortId);

  if (!data) return res.status(404).send("URL not found");
  if (Date.now() > data.expiresAt) {
    urlDB.delete(req.params.shortId);
    return res.status(410).send("URL expired");
  }

  res.redirect(data.originalUrl);
}



