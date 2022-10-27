const express = require("express");
const router = express.Router();

const Dialogflow = require("../controller/Dialogflow");

router.post("/text_query", Dialogflow.text);
router.post("/event_query", Dialogflow.event);

module.exports = router;
