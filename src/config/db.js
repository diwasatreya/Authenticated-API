import mongoose from 'mongoose';

const connectDB = async (URL) => {
    try {
        if (!URL) throw new Error("No MongoDB URL provided!");
        await mongoose.connect(URL);
        console.log('🍃 Connected to MongoDB');
        return
    } catch (error) {
        console.error(error);
        return;
    }
}

export {
    connectDB
}