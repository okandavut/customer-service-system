const express = require("express");
const config = require("./config/config");
var requestsRouter = require("./routes/requestsRoutes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
var morgan = require("morgan");
const mongoose = require("mongoose");
var cors = require('cors')

const app = express();
app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://mrokt:123456**@cluster0-1xc2u.mongodb.net/customerservice?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(morgan("tiny"));

app.use(requestsRouter);

app.listen(config.port);

module.exports = { app };
