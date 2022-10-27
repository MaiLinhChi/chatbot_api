const mongoose = require("mongoose");

const connectDb = async (mongooUrl) => {
  try {
    await mongoose.connect(mongooUrl);
    console.log("Connect database successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
