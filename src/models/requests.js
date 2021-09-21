var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: { type: String, index: true},
    requestid:  {type: Number},
    dentistid: {type: Number},
    issuance: { type: Number},
    time: {type: String}
});

module.exports = mongoose.model('requests', requestSchema);