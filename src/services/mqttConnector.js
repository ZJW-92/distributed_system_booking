const mqtt = require('mqtt');
const Variables = require("../config/variables");

module.exports.MQTT = mqtt.connect(Variables.URL);