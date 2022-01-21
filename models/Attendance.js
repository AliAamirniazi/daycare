const mongoose = require('mongoose');
const Schema = mongoose.Schema
const AttendanceSchema = new mongoose.Schema({
    children:{
        type:Schema.Types.ObjectId,
        ref : "Children"
    },
    checkIn:{
        type: Date,
        required:true,
    },
    checkOut:{
        type: Date,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = Attendance = mongoose.model('Attendance',AttendanceSchema);