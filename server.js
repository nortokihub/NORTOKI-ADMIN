const express = require("express");
const ytdlp = require("yt-dlp-exec").default; // important for Render
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("downloads")); // serve mp3 files

const DOWNLOAD_DIR = path.join(__dirname, "downloads");
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR);

app.post("/convert", async (req, res) => {
  const url = req.body.url;
  if(!url) return res.json({ success:false, error:"No URL provided" });

  const fileName = `audio_${Date.now()}.mp3`;
  const filePath = path.join(DOWNLOAD_DIR, fileName);

  try {
    await ytdlp(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: filePath
    });

    // return download link
    res.json({ success:true, file:`/` + fileName });
  } catch (e) {
    console.error(e);
    res.json({ success:false, error:"Conversion failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
