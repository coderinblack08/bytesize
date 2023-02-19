import { open } from "fs/promises";
import { getVoiceChunks } from "iri";

const iterator = getVoiceChunks(
  "hola!",
  "es-ES-AlvaroNeural"
)(async () => {
  const f = await open("./audio.mp3", "w+");
  for await (const chunk of iterator) {
    f.write(chunk);
  }
})();
