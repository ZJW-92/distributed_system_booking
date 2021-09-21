module.exports = {
    URL: 'mqtt://127.0.0.1', // localhost
    REQUEST_TOPIC: 'request',
    RESPONSE_TOPIC: 'response',
    TIMESLOT_TOPIC: 'timeslots',
    CONFIRMATION_TOPIC: 'confirmation',
    DIRECTORY: './booking-data/',
    DIRECTORY_BOOKING: './booking-data/booking-',
    DIRECTORY_REQUESTS: './booking-data/requests-',
    LIMITER_TOKENS_PER_INTERVAL: 100,
    LIMITER_TIME_INTERVAL: 10000, // 10000ms = 10s
    MONGODB_URI: 'mongodb://localhost:27017/booking',
    MONGODB_LOG_URI: 'mongodb://localhost:27017/dentistimo',
    MONGODB_LOG_REQUEST_COLLECTION: 'bookings.requestslogs',
    MONGODB_LOG_ERROR_COLLECTION:'bookings.errorlogs'
};


