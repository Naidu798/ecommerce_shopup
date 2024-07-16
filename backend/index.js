const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

const PORT = 5000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to db");
    console.log("Server is running");
  });
});
