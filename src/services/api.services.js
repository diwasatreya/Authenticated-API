import crypto from 'node:crypto';
import userAPI from '../models/userAPI.model.js';

const createAPIKey = async (user) => {
    try {
        if (!user) return;
        await userAPI.updateMany({ userID: user.userID }, { active: false });

        const key = crypto.randomBytes(32).toString('hex');

        const apiKey = await new userAPI({
            userID: user.userID,
            key: key
        });

        await apiKey.save();
        return apiKey;
    } catch (error) {
        console.error(error);
        return;
    }
}

const getUserAPI = async (userID) => {
    try {
        const userApi = await userAPI.findOne({ userID: userID, active: true });
        return userApi;
    } catch (error) {
        console.error(error);
        return;
    }
}

export {
    createAPIKey,
    getUserAPI
}