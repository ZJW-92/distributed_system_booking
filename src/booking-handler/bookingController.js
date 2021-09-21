const {RequestProcessor} = require("./requestProcessor");
const {BookingProcessor} = require("./bookingProcessor");


class BookingController {
    constructor() {
    }
    processRequest(message) {
        const bookingRequest = message.toString('utf-8');
        let requestProcessor = new RequestProcessor();
        requestProcessor.checkTimeSlot(JSON.parse(bookingRequest));
    }
    processBooking(message) {
        const confirmation = message.toString('utf-8');
        let bookingProcessor = new BookingProcessor();
        bookingProcessor.checkConfirmation(JSON.parse(confirmation))
    }
}
module.exports.BookingController = BookingController