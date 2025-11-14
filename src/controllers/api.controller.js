import { createAPIKey } from "../services/api.services.js";

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

const showAllUsers = async (req, res) => {
    console.log(req.originalUrl)
    return res.status(200).json([{ _id: 2 }, { _id: 3 }])
}

const showUser = async (req, res) => {
    const value = req.params.id;
    return res.status(200).json({ _id: value })
}

export {
    generateAPIKey,
    showAllUsers,
    showUser
}