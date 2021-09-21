const {Publisher} = require( "../services/publisher");
const {BookingDataController} = require("./bookingDataController");
const variables = require("../config/variables")
const {ErrorLogger} = require('../services/errorLogger');

class BookingProcessor {
    constructor() {
        this.errorLogger = new ErrorLogger();
    }
    async checkConfirmation(confirmation) {
        let bookingDataController = new BookingDataController();
        let requestList = await bookingDataController.readData();
            let booking = {}
            if (requestList.filter(request => request.time === confirmation.time)>1) {
                let sameBookingTimeRequests = requestList.filter(bookingRequest => {
                    if (bookingRequest.time === confirmation.time) {
                        return bookingRequest
                    }
                });
                sameBookingTimeRequests.sort(  ( a, b ) => { return a.issuance - b.issuance; } );
                booking = sameBookingTimeRequests[0];
            } else {
                let index = requestList.findIndex(request => request.time === confirmation.time);
                booking = requestList[index]
            }

            if (confirmation.available && booking !== undefined) {
                this.processAcceptedRequest(booking, confirmation, requestList)
            } else if (!confirmation.available && booking !== undefined) {
                this.removeDeclinedRequests(requestList, confirmation.time, booking.dentistid);
            } else {
               this.errorLogger.logError("Error no matching booking requests with availability confirmation", 'BookingProcessor')
            }
    }

    processAcceptedRequest(booking, confirmation, requestList) {
        let publisher = new Publisher();
        let bookingDataController = new BookingDataController();
        let success = {};
        success.userid = booking.userid;
        success.requestid = booking.requestid;
        success.time = booking.time;
        bookingDataController.deleteData(booking);
        bookingDataController.writeBooking(booking);
        publisher.publishBookingResponse(success);
        if (requestList.filter(request => request.time === confirmation.time)>1) {
            const index = requestList.findIndex(request => request.userid === booking.userid);
            requestList.splice(index,1);
            this.removeDeclinedRequests(requestList, confirmation.time, booking.dentistid);
        }
    }

    removeDeclinedRequests(requestList, time) {
        let publisher = new Publisher();
        let bookingDataController = new BookingDataController();
        let updatedList = requestList.filter(bookingRequest => {
            if (bookingRequest.time === time) {
                let declinedRequest = {};
                declinedRequest.userid = bookingRequest.userid;
                declinedRequest.requestid = bookingRequest.requestid;
                publisher.publishBookingResponse(declinedRequest);
                bookingDataController.deleteData(bookingRequest);
            }
            else {
                return bookingRequest
            }
        });
    }
}
module.exports.BookingProcessor = BookingProcessor