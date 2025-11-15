import crypto from 'node:crypto';
import userAPI from '../models/userAPI.model.js';
import { count } from 'node:console';

const createAPIKey = async (user) => {
    try {
        if (!user) return;
        await userAPI.updateMany({ userID: user.userID }, { active: false });

        const key = `sh-${crypto.randomBytes(32).toString('hex').slice(0, 36)}`;

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
};

const getUserAPIByKey = async (key) => {
    try {
        const userApi = await userAPI.findOne({ key: key, active: true });
        return userApi;
    } catch (error) {
        console.error(error);
        return;
    }
}

const verifyAPIKey = async (key) => {
    try {
        const userApi = await userAPI.findOne({ key: key, active: true });

        return (userApi) ? true : false;

    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateTracker = async (key, url, method) => {
    try {
        const api = await getUserAPIByKey(key);
        if (!api) return;

        const existingPath = api.track.find(t => t.url === url);

        if (existingPath) {
            return await userAPI.findOneAndUpdate(
                {
                    _id: api._id,
                    "track.url": url
                },
                {
                    $inc: {
                        "track.$.count": 1,
                        totalCounts: 1
                    }
                },
                { new: true }
            );
        }

        return await userAPI.findByIdAndUpdate(
            api._id,
            {
                $push: {
                    track: { url, method, count: 1 }
                },
                $inc: { totalCounts: 1 }
            },
            { new: true }
        );

    } catch (error) {
        console.error(error);
        return null;
    }
};


export {
    createAPIKey,
    getUserAPI,
    verifyAPIKey,
    updateTracker,
    getUserAPIByKey
}