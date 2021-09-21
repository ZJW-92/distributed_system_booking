const winston = require('winston');
const { createLogger,transports, format} = require('winston');
const { combine, timestamp, printf } = format;
const variables = require("../config/variables");
require('winston-mongodb');
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

class ErrorLogger {
    constructor() {
        this.errorLogger = createLogger({
            format: combine(
                timestamp(),
                myFormat,
                format.metadata({fillWith: ['label'] })
            ),
            transports: [
                new transports.MongoDB({
                    db: variables.MONGODB_LOG_URI,
                    collection:variables.MONGODB_LOG_ERROR_COLLECTION,
                    capped:true,
                    options: { useUnifiedTopology: true }
                }),
                new winston.transports.Console(),
            ]
        });
    }

    logError(errorMessage, label){
        this.errorLogger.log({
            label: label,
            level: 'error',
            message: errorMessage
        });
    }


}
module.exports.ErrorLogger = ErrorLogger