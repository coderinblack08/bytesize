import "cross-fetch/dist/node-polyfill.js";
import PocketBase from "pocketbase";
import * as dotenv from "dotenv";
dotenv.config();

let pb;

if (!global.pb) {
  global.pb = new PocketBase("http://127.0.0.1:8090");
  await global.pb.admins.authWithPassword(
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD
  );
}

pb = global.pb;

export default pb;
