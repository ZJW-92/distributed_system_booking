const {Publisher} = require( "../services/publisher");
const {BookingDataController} = require("./bookingDataController");


class RequestProcessor {
    constructor() {
    }
    // Sends request to check if booking timeslot is available and saves booking request
    checkTimeSlot(bookingRequest) {
        let publisher = new Publisher();
        let timeSlot = {};
        timeSlot.dentistid = bookingRequest.dentistid;
        timeSlot.time = bookingRequest.time;
        publisher.publishTimeslotCheck(timeSlot);
        let bookingDataController = new BookingDataController();
        bookingDataController.writeRequest(bookingRequest);
    }
}
module.exports.RequestProcessor = RequestProcessor