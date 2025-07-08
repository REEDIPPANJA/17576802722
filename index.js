import express from "express";
import cors from "cors";
import urlRoute from "./routes/route.url.js"

const app = express();
app.use(cors());
app.use(express.json());



app.use('/',urlRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
