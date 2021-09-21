const {Publisher} = require("./publisher");
const RateLimiter = require('limiter').RateLimiter;
const {BookingController} = require("../booking-handler/bookingController");
const {RequestLogger} = require('./requestLogger');
const {ErrorLogger} = require('../services/errorLogger');

class RequestRateLimiter {
    constructor(tokensPerInterval, Interval) {
        this.limiter = new RateLimiter(tokensPerInterval, Interval, true);
        this.bookingController = new BookingController();
        this.requestLogger = new RequestLogger();
        this.errorLogger = new ErrorLogger();
    }

    fire(message) {
        let _this = this
        let request = JSON.parse(message)
        let publisher = new Publisher();
        this.limiter.removeTokens(1, function(err, remainingRequests) {
            if (remainingRequests === -1) {
                _this.errorLogger.logError("Request limit reached starting 10s timeout", 'RequestLimiter');
            }
            if (remainingRequests === 99){
                _this.requestLogger.logLimiterAtFullCapacity("Request Limiter accepting requests")
            }
            if (remainingRequests < 0) {
               _this.requestLogger.logDeniedRequest(request)
            } else {
                _this.bookingController.processRequest(message)
                _this.requestLogger.logAcceptedRequest(request)
            }
        })

    }
}
module.exports.RequestRateLimiter = RequestRateLimiter
