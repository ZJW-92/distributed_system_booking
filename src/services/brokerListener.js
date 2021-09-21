const {MQTT} = require('./mqttConnector');
const variables = require("../config/variables");
const {BookingController} = require("../booking-handler/bookingController");
const {RequestRateLimiter} = require("../services/requestRateLimiter")



class BrokerListener {
    constructor() {
    }
    listenForMessage() {

        const bookingController = new BookingController();
        const requestRateLimiter = new RequestRateLimiter(variables.LIMITER_TOKENS_PER_INTERVAL, variables.LIMITER_TIME_INTERVAL);

        MQTT.on('message', function (topic, message) {

            if (topic === variables.REQUEST_TOPIC) {

                requestRateLimiter.fire(message)

            }
            else if (topic === variables.CONFIRMATION_TOPIC) {
                bookingController.processBooking(message);
            }
        })
    }
}
module.exports.BrokerListener = BrokerListener


