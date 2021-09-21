const Requests = require("../models/requests");
const Bookings = require("../models/bookings");
var mongoose = require('mongoose');
const variables = require("../config/variables")
const {ErrorLogger} = require('../services/errorLogger');
const {RequestLogger} = require('../services/requestLogger');


class BookingDataController {
    constructor() {
        this.errorLogger = new ErrorLogger();
        this.requestLogger = new RequestLogger();

    }
    writeRequest(data) {
            let request = new Requests( {
                _id: new mongoose.Types.ObjectId(),
                userid: data.userid,
                requestid:  data.requestid,
                dentistid:  data.dentistid,
                issuance: data.issuance,
                time: data.time
            })
            request.save()
    }
    writeBooking(data) {
        let booking = new Bookings( {
            _id: new mongoose.Types.ObjectId(),
            userid: data.userid,
            requestid:  data.requestid,
            dentistid:  data.dentistid,
            issuance: data.issuance,
            time: data.time
        })
        booking.save()
    }
    deleteData(data) {
        let _this = this;
        Requests.findOneAndDelete({userid: data.userid},function (err, deleted){
            if (err) {
                _this.errorLogger.logError(err, 'DB System')
            }
        });
    }

    async readData() {
       return Requests.find();
    }

    connectToDataBase() {
        let _this = this;
        mongoose.connect(variables.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function(err) {
            if (err) {
                _this.errorLogger.logError(`Failed to connect to MongoDB with URI: ${variables.MONGODB_URI}`,'DB System');
                _this.errorLogger.logError(err.stack, 'DB System');
                process.exit(1);
            }
            _this.requestLogger.logDBConnectionSuccess(`Connected to MongoDB with URI: ${variables.MONGODB_URI}`);
        });
    }

}
module.exports.BookingDataController = BookingDataController