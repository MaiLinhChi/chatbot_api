const { WebhookClient } = require("dialogflow-fulfillment");

const Demand = require("../model/Demand");
const Coupon = require("../model/Coupon");

class Fulfillment {
  async index(req, res) {
    const agent = new WebhookClient({ request: req, response: res });

    function snoopy(agent) {
      agent.add("Welcome to my Snoopy fulfillment!");
    }

    async function learn(agent) {
      Demand.findOne(
        { course: agent.parameters.courses },
        function (err, course) {
          if (course !== null) {
            course.counter++;
            course.save();
          } else {
            const demand = new Demand({ course: agent.parameters.courses });
            demand.save();
          }
        }
      );
      let responseText = `You want to learn about ${agent.parameters.courses}. Here is a link to all of my courses: https://www.udemy.com`;
      let coupon = await Coupon.findOne({ course: agent.parameters.courses });
      if (coupon !== null) {
        responseText = `You want to learn about ${agent.parameters.courses}. Here is a link to the course: ${coupon.link}`;
      }
      agent.add(responseText);
    }

    function fallback(agent) {
      agent.add("I didn't understand");
      agent.add("I'm sorry, can you try again?");
    }

    let intentMap = new Map();
    intentMap.set("snoopy", snoopy);
    intentMap.set("learn courses", learn);
    intentMap.set("Default Fallback Intent", fallback);

    intentMap.set("Default Fallback Intent", fallback);
    agent.handleRequest(intentMap);
  }
}

module.exports = new Fulfillment();
