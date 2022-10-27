const chatbot = require("../chatbot/chatbot");

class Dialogflow {
  async text(req, res) {
    const responses = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameter
    );
    res.send(responses[0].queryResult);
  }

  async event(req, res) {
    const responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameter
    );
    res.send(responses[0].queryResult);
  }
}

module.exports = new Dialogflow();
