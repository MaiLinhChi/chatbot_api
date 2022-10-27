const dialogflow = require("./dialogflow");
const fulfillment = require("./fulfillment");

const route = (app) => {
  app.use("/", dialogflow);
  app.use("/", fulfillment);
};

module.exports = route;
