const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PaymentSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    month:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true
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

module.exports = Payment = mongoose.model('Payment',PaymentSchema);