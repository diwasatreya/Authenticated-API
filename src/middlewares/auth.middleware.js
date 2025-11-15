import { generateNewTokens } from "../services/auth.services.js";
import { verifyJWT } from "../services/utils.services.js";

const checkAuth = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!accessToken && !refreshToken) {
            req.user = null;
            return next();
        }

        if (!accessToken) {
            await generateNewTokens(req, res, next, refreshToken);
            return next();
        }

        const decodedToken = verifyJWT(accessToken);
        if (!decodedToken) {
            req.user = null;
            return next();
        }

        req.user = decodedToken;
        return next();

    } catch (error) {
        console.error(error);
        return next();
    }
}

export {
    checkAuth
}