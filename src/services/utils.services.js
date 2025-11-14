import jwt from 'jsonwebtoken';

const generateJWT = (payload) => {
    try {
        if (!payload) throw new Error("You have to provided payload in argument");
        return jwt.sign(payload, process.env.AUTH_JWT);
    } catch (error) {
        console.error(error);
        return;
    }
};

const verifyJWT = (token) => {
    try {
        if (!token) throw new Error("No Token Provided!");
        return jwt.verify(token, process.env.AUTH_JWT);
        return
    } catch (error) {
        console.error(error);
        return false;
    }
};

const convertTime = (time) => {
    const units = {
        ms: 1,
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24,
        w: 1000 * 60 * 60 * 24 * 7,
    };

    const match = time.match(/^(\d+)(ms|s|m|h|d|w)$/i);
    if (!match) throw new Error("Invalid time format.");

    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    return value * units[unit];
};


export {
    generateJWT,
    verifyJWT,
    convertTime as convertToMs
}