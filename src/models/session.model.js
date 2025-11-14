import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    userAgent: { type: String, required: true },
    valid: { type: Boolean, default: true, required: false }
}, {
    timestamps: true
});

export default mongoose.model('Session', sessionSchema);