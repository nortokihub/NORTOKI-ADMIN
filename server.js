const express = require("express");
const ytdlp = require("yt-dlp-exec");
const fs = require("fs");

const app = express();
app.use(express.json());

app.post("/convert", async (req, res) => {
  const url = req.body.url;

  try {
    const file = "audio.mp3";

    await ytdlp(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: file
    });

    res.json({ success: true, file: file });
  } catch (e) {
    res.json({ success: false, error: "failed" });
  }
});

app.listen(3000);
