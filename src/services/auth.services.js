import User from '../models/user.model.js';
import argon2 from 'argon2';
import { convertToMs, generateJWT, verifyJWT } from './utils.services.js';
import Session from '../models/session.model.js';

const getUserByEmail = async (email) => {
    try {
        if (!email) throw new Error("Please provided email in argument!");
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log(error);
        return 0;
    }
};

const hashPassword = async (password) => {
    try {
        if (!password) throw new Error('No Passoword given to hash!');
        return await argon2.hash(password);
    } catch (error) {
        console.error(error);
        return;
    }
}

const createNewUser = async (username, email, password) => {
    try {
        if (!username && !email && !password) throw new Error("Did'nt provided required credentials");

        const hashedPassword = await hashPassword(password);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return user;

    } catch (error) {
        console.error(error);
        return 0;
    }
}

const verifyPassword = async (hashedPassword, password) => {
    try {
        if (await argon2.verify(hashedPassword, password)) return true;
        else
            return false
    } catch (error) {
        return false;
    }
}

const createNewSession = async (req, res, user) => {
    try {
        if (!req) throw new Error("No req provided!");

        if (!user) throw new Error("No User found to create session!");

        const session = new Session({
            userID: user._id.toString(),
            userAgent: req.headers['user-agent']
        });

        await session.save();

        const refreshTokenInfo = {
            userID: user._id.toString()
        }

        const accessTokenInfo = {
            userID: user._id.toString(),
            username: user.username,
            sid: session._id.toString()
        }

        const accessToken = generateJWT(accessTokenInfo);
        const refreshToken = generateJWT(refreshTokenInfo);

        res.cookie('accessToken', accessToken, { maxAge: convertToMs('5m') });
        res.cookie('refreshToken', refreshToken, { maxAge: convertToMs('20d') });

        return {
            accessToken,
            refreshToken,
            session
        }

    } catch (error) {
        console.error(error);
        return 0;
    }
}

const generateNewTokens = async (req, res, next, refreshToken) => {
    try {
        const decodedToken = verifyJWT(refreshToken);

        if (!decodedToken) {
            req.user = null;
            return next();
        }

        const user = await User.findById(decodedToken.userID);
        if (!user) {
            req.user = null;
            return next();
        }

        const oldSession = await Session.findOne({ userID: decodedToken.userID });
        if (!oldSession) {
            req.user = null;
            next();
        }

        const session = new Session({
            userID: user._id.toString(),
            userAgent: req.headers['user-agent']
        });

        await session.save();

        const refreshTokenInfo = {
            userID: user._id.toString()
        }

        const accessTokenInfo = {
            userID: user._id.toString(),
            username: user.username,
            sid: session._id.toString()
        }

        const newAccessToken = generateJWT(accessTokenInfo);
        const newRefreshToken = generateJWT(refreshTokenInfo);

        res.cookie('accessToken', newAccessToken, { maxAge: convertToMs('5m') });
        res.cookie('refreshToken', newRefreshToken, { maxAge: convertToMs('20d') });

        req.user = accessTokenInfo || null;

        return {
            newAccessToken,
            newRefreshToken,
            session,
            user,
            accessTokenInfo
        }

    } catch (error) {
        console.error(error);
        return next()
    }
}

export {
    getUserByEmail,
    createNewUser,
    verifyPassword,
    createNewSession,
    generateNewTokens
}