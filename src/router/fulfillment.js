const express = require("express");
const router = express.Router();

const Fulfillment = require("../controller/Fulfillment");

router.post("/", Fulfillment.index);

module.exports = router;
