const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
require("dotenv").config();
require("./Models/db");
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`The server is Running on port ${PORT}`);
});
