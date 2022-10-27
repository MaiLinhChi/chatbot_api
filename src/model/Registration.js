const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  registerDate: Date,
});

module.exports = mongoose.model("registration", RegistrationSchema);
