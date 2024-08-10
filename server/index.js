const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The server is Running on port ${PORT}`);
});
