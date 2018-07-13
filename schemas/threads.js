let mongoose = require('mongoose');
let schema = mongoose.Schema;

let threadSchema = new schema({
    title: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    }

});

const Threads = mongoose.model('Threads', threadSchema);
module.exports = Threads;