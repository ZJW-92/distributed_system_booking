const {MQTT} = require("./services/mqttConnector");
const {Subscriber} = require("./services/subscriber");
const variables = require("./config/variables");
const {BrokerListener} = require("./services/brokerListener");
const {BookingDataController} = require("./booking-handler/bookingDataController");

let bookingDataController = new BookingDataController();
bookingDataController.connectToDataBase();

MQTT.on('connect', function () {
   let subscriber = new Subscriber();
   subscriber.connectToBroker();
   subscriber.subscribeToTopic(variables.REQUEST_TOPIC);
   subscriber.subscribeToTopic(variables.CONFIRMATION_TOPIC);
   let listener = new BrokerListener();
   listener.listenForMessage();
})






