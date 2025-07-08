import { nanoid } from "nanoid";
const urlDB = new Map();
export const urlShortener = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortId = nanoid(6);
    const expiresAt = Date.now() + 30 * 60 * 1000;

    urlDB.set(shortId, { originalUrl: url, expiresAt });
    res.json({ shortUrl: `http://localhost:3000/${shortId}` });

  } catch (err) {
    console.error("Error in urlShortener:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export const redirectId = async (req, res) => {
  try {
    const data = urlDB.get(req.params.shortId);

    if (!data) return res.status(404).send("URL not found");
    if (Date.now() > data.expiresAt) {
      urlDB.delete(req.params.shortId);
      return res.status(410).send("URL expired");
    }

    res.redirect(data.originalUrl);


  }

  catch (err) {
    console.error("Error in redirectId:", err.message);
    res.status(500).send("Internal Server Error");
  }
}



