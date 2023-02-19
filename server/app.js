import express from "express";
import cors from "cors";
import categories from "./categories.js";

// const pb = new PocketBase("http://127.0.0.1:8090");
const app = express();
app.use(cors({ origin: "*" }));

app.get("/api/categories", (req, res) => {
  res.send(JSON.stringify(categories));
});

app.listen(8080, () => console.log("Server running on PORT 8080."));
