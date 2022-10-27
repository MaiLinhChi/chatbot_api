const mongoose = require("mongoose");

const DemandSchema = new mongoose.Schema({
  course: String,
  counter: { type: Number, default: 1 },
});

module.exports = mongoose.model("demand", DemandSchema);
