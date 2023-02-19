import express from "express";
import PocketBase from "pocketbase";
import categories from "./categories.js";
import axios from "axios";

const pb = new PocketBase("http://127.0.0.1:8090");
const app = express();

const getNews = () => {};

app.get("/api/categories", (req, res) => {
  res.send(JSON.stringify(categories));
});

const listener = app.listen(8080, () =>
  console.log("Server running on PORT 8080.")
);
