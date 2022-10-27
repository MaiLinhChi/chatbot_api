require("dotenv").config();

module.exports = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogflowSessionID: process.env.DIALOGFLOW_SESSION_ID,
    dialogflowSessionLanguageCode: process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
}