import mongoose from "mongoose";

const userAPISchema = new mongoose.Schema({
    userID: { type: String, required: true },
    key: { type: String, required: true },
    active: { type: Boolean, default: true, required: false },
    track: { type: Array, required: false }
}, {
    timestamps: true
});

export default mongoose.model('UserAPI', userAPISchema);