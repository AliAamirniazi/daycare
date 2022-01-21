const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DailyActivitySchema = new mongoose.Schema({
    children:{
        type:Schema.Types.ObjectId,
        ref : "Children"
    },
    day:{
        type:String,
        required:true
    },
    activity:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = DailyActivity = mongoose.model('DailyActivity',DailyActivitySchema);