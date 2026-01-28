import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    }, 
    description: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    location : {
        address: {
            type: String,
        },
        lat : {
            type:Number
        },
        lng :{
            type:Number
        }
    },
    price : {
        type:Number,
        default : 0
    },
    isPaid :{
        type: Boolean,
        default : false
    },
    eventType:{
        type: String
    },
    weather:{
        type: Object
    },
    spotify:{
        type: Object
    },
    // creator: {
        // esto se implementará cuando se cree el auth module
    // }

},
    {timestamps: true}
);

const Event = mongoose.model('Event',eventSchema);
export default Event;