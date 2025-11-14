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
    // console.log(req.originalUrl);

    const apiKey = req.headers.authorization.replace('Bearer ', '');
    await updateTracker(apiKey, req.originalUrl, "post");

    return res.status(200).json([{ _id: 2 }, { _id: 3 }])
}

const showUser = async (req, res) => {
    const value = req.params.id;

    const apiKey = req.headers.authorization.replace('Bearer ', '');
    const url = req.originalUrl.replace(value, '{id}');
    await updateTracker(apiKey, url, "get");

    return res.status(200).json({ _id: value })
}

export {
    generateAPIKey,
    showAllUsers,
    showUser
}