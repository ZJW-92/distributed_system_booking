const winston = require('winston');
const { createLogger,transports, format} = require('winston');
require('winston-mongodb');
const variables = require("../config/variables");
const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

class RequestLogger {
    constructor() {
        this.requestLogger = createLogger({
            format: combine(
                timestamp(),
                myFormat,
                format.metadata({fillWith: ['label'] })
            ),
            transports: [
                new transports.MongoDB({
                    db: variables.MONGODB_LOG_URI,
                    collection: variables.MONGODB_LOG_REQUEST_COLLECTION,
                    capped:true,
                    options: { useUnifiedTopology: true }
                }),

                new winston.transports.Console(),
            ]
        });
    }

    logDeniedRequest(request){
        this.requestLogger.log({
            label: 'Denied',
            level: 'warn',
            message: 'Request id: ' + request.requestid + ' User id: ' + request.userid + ' Dentist id: ' + request.dentistid
        });
    }

    logAcceptedRequest(request){
        this.requestLogger.log({
            label: 'Accepted',
            level: 'info',
            message: 'Request id: ' + request.requestid + ' User id: ' + request.userid + ' Dentist id: ' + request.dentistid
        });
    }
    logDBConnectionSuccess(message){
        this.requestLogger.log({
            label: 'DB Connected',
            level: 'info',
            message: message
        });
    }
    logLimiterAtFullCapacity(message){
        this.requestLogger.log({
            label: 'Limiter Running',
            level: 'info',
            message: message
        });
    }
}
module.exports.RequestLogger = RequestLogger