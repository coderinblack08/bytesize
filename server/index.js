import cors from "cors";
import express from "express";
import categories from "./categories.js";
// import { getVoiceChunks } from "iris-tts";

const app = express();
app.use(cors({ origin: "*" }));

app.get("/api/categories", (req, res) => {
  res.send(JSON.stringify(categories));
});

// app.get("/api/tts", async (req, res) => {
//   res.set('content-type', 'audio/mp3');
//   res.set('accept-ranges', 'bytes');
//   const iterator = getVoiceChunks(req.query.text, 'en-US-DavidNeural');
//   for await (const chunk of iterator) {
//     res.write(chunk);
//   }
//   res.end();
// })

app.listen(8080, () => console.log("Server running on PORT 8080."));
