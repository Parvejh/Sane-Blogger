const mongoose = require("mongoose");

const subsriberSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Subscriber = mongoose.model("Subscriber",subsriberSchema);

module.exports = Subscriber;