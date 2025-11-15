import { error } from "node:console";
import { createAPIKey, updateTracker, verifyAPIKey } from "../services/api.services.js";

const generateAPIKey = async (req, res) => {
    try {
        if (!req.user) res.redirect('/auth/login');
        const key = await createAPIKey(req.user);
        return res.redirect('/');
    } catch (error) {
        res.redirect('/');
        return;
    }
}

// authorization: 'Bearer b16bf955e142160ad6e05be0da26542c5c297c443f5c627bee60f8fc5729b47f',

const showAllUsers = async (req, res) => {
    // console.log(req.method);

    const apiKey = req.headers.authorization.replace('Bearer ', '');
    updateTracker(apiKey, req.originalUrl, req.method);

    if (typeof req.body == "undefined") {
        return res.status(400).json({ error: 'Invalid Body Request!' })
    }

    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: "Missing userID" });

    return res.status(200).json({ userId, success: true })
}

const showUser = async (req, res) => {
    const value = req.params.id;

    const apiKey = req.headers.authorization.replace('Bearer ', '');
    const url = req.originalUrl.replace(value, '{id}');
    updateTracker(apiKey, url, req.method);

    return res.status(200).json({ value, success: true })
}

export {
    generateAPIKey,
    showAllUsers,
    showUser
}