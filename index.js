import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const urlDB = new Map(); 

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = nanoid(6);
  const expiresAt = Date.now() + 30 * 60 * 1000; 

  urlDB.set(shortId, { originalUrl: url, expiresAt });
  res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

app.get("/:shortId", (req, res) => {
  const data = urlDB.get(req.params.shortId);

  if (!data) return res.status(404).send("URL not found");
  if (Date.now() > data.expiresAt) {
    urlDB.delete(req.params.shortId);
    return res.status(410).send("URL expired");
  }

  res.redirect(data.originalUrl);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
