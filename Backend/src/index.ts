import  dotenv  from "dotenv";

import app from "./app";
import dbConnection from "./DbConnection/connection";
dotenv.config();
dbConnection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});