import  dotenv  from "dotenv";
import fs from "fs";
import https from "https";
import app from "./app";
import dbConnection from "./DbConnection/connection";
dotenv.config();
dbConnection().then(() => {
  const options = {
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
  };

  https.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`HTTPS server running on https://localhost:${process.env.PORT}`);
  });
});