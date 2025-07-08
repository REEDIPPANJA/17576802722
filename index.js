import express from "express";
import cors from "cors";
import urlRoute from "./routes/route.url.js"
import { logClientInfo } from "./middlewares/middleware.loggin.js";

const app = express();
app.use(cors());
app.use(express.json());



app.use('/',logClientInfo,urlRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
