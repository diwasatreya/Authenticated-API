import { log } from "node:console";
import { createNewSession, createNewUser, getUserByEmail, verifyPassword } from "../services/auth.services.js";

const showLoginPage = (req, res) => {
    try {
        if (req.user) res.redirect('/');
        return res.render('login.ejs');
    } catch (error) {
        console.error(error);
        return;
    }
};

const showSignupPage = (req, res) => {
    try {

        if (req.user) res.redirect('/');
        return res.render('signup.ejs');
    } catch (error) {
        console.error(error);
        return;
    }
};

const signupNewUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password != confirmPassword) {
            console.log('Password didn\'t match');
            return res.redirect('/auth/signup');
        }

        const user = await getUserByEmail(email);

        if (user) {
            console.log('User Already Exists');
            return res.redirect('/auth/signup');
        }

        const newUser = await createNewUser(username, email, password);

        const session = await createNewSession(req, res, newUser);

        if (!session) {
            console.log(('Failed to create session'));
            return res.redirect('/auth/login');
        }

        res.redirect('/');

    } catch (error) {
        console.error(error);
        return;
    }
}


const loginNewUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            console.log("No Email or Password");
            return res.redirect('/auth/login');
        }

        const user = await getUserByEmail(email);

        if (!user) {
            console.log('User doesn\'t exists!')
            return res.redirect('/auth/signup');
        }

        const isCorrect = await verifyPassword(user.password, password);

        if (!isCorrect) {
            console.log("Password didn't match!");
            return res.redirect('/auth/login');
        }

        const session = await createNewSession(req, res, user);

        if (!session) {
            console.log(('Failed to create session'));
            return res.redirect('/auth/login');
        }


        res.redirect('/');

    } catch (error) {
        console.error(error);
        return;
    }
}

const doLogout = (req, res) => {
    try {
        req.user = null;
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        return;
    }
}

export {
    showLoginPage,
    showSignupPage,
    signupNewUser,
    loginNewUser,
    doLogout
}