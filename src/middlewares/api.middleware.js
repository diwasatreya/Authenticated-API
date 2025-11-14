import { verifyAPIKey } from "../services/api.services.js";

const checkAPI = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization && !authorization.includes('Bearer')) {
            return res.status(401).json({ error: "Invalid Authorization Format!" });
        }
        const apiKey = authorization.replace('Bearer ', '');
        if (!apiKey) {
            return res.status(401).json({ error: "Missing API Key!" });
        }

        const isValid = await verifyAPIKey(apiKey);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid API Key!" });
        }

        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });

    }
}

export {
    checkAPI
}