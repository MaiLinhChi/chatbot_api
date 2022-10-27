const mongoose = require("mongoose");

const CouponsSchema = new mongoose.Schema({
  course: String,
  link: String,
});

module.exports = mongoose.model("coupon", CouponsSchema);
