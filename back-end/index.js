import express from "express";
import cors from "cors";
import qr from "qr-image";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/url", async (req, res) => {
  try {
    const url = req.body.reqUrl;

    if (!url) return res.status(400).send("URL is required");

    // Generate QR code as a PNG buffer
    const qrImage = qr.imageSync(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    res.send(qrImage);
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

app.listen(port, () => console.log(`app running at port ${port}`));
