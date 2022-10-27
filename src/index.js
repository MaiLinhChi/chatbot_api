const express = require("express");
const cors = require("cors");

const route = require("./router");
const connectDb = require("./db");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

// use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// connect database
connectDb(process.env.MONGOO_URL);

// use route
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
