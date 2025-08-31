import dotenv from "dotenv";
import app from "./app";
import dbConnection from "./DbConnection/connection";

dotenv.config();

const PORT = process.env.PORT || 3000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
