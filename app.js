require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "./src/public")));

app.use("/", require("./src/routes/root"));
app.use("/products", require("./src/routes/productRoutes"));
app.use("/orders", require("./src/routes/orderRoutes"));

app.all("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    result: "Not Found",
  });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});
