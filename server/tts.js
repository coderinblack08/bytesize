import azureTTS from "tts3";

azureTTS.get(azureTTS.createBrowser(), {
  text: "Hello world",
  output: "./test.ogg",
  voice: "jacob",
  language: "English (United States)",
});
