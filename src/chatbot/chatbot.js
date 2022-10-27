const dialogflow = require("dialogflow");

const config = require("../config/key");
const structjson = require("./structjson");
const Registration = require("../model/Registration");

const projectID = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

module.exports = {
  textQuery: async (text, userID, parameter = {}) => {
    let self = module.exports;
    const sessionPath = sessionClient.sessionPath(
      config.googleProjectID,
      config.dialogflowSessionID + userID
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogflowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameter,
        },
      },
    };

    let res = await sessionClient.detectIntent(request);
    res = await self.handleAction(res);
    return res;
  },

  eventQuery: async (event, userID, parameter = {}) => {
    let self = module.exports;
    const sessionPath = sessionClient.sessionPath(
      config.googleProjectID,
      config.dialogflowSessionID + userID
    );

    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameter: structjson.jsonToStructProto(parameter),
          languageCode: config.dialogflowSessionLanguageCode,
        },
      },
    };

    let res = await sessionClient.detectIntent(request);
    res = await self.handleAction(res);
    return res;
  },

  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
      case "recommendcourses-yes":
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
        }
        break;
    }
    return responses;
  },

  saveRegistration: async function (fields) {
    const registration = new Registration({
      name: fields.name.stringValue,
      address: fields.address.stringValue,
      phone: fields.phone.stringValue,
      email: fields.email.stringValue,
      dataSent: Date.now(),
    });

    try {
      await registration.save();
    } catch (error) {
      console.log(error);
    }
  },
};
