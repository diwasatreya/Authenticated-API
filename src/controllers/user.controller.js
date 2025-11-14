import { getUserAPI } from "../services/api.services.js";

const showHomePage = async (req, res) => {
    try {
        if (!req.user) return res.redirect('/auth/login');

        const userAPI = await getUserAPI(req.user.userID);
        return res.render('home.ejs', { user: req.user, userAPI });
    } catch (error) {
        console.error(error);
        return;
    }
}

export {
    showHomePage
}