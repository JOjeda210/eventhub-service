import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    amountPaid: {
        type: Number,
        default: 0
    },

},
    { timestamps: true }
)

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;