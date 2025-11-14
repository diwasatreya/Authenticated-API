import { Router } from "express";
import { doLogout, loginNewUser, showLoginPage, showSignupPage, signupNewUser } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(checkAuth);
router.route('/login').get(showLoginPage).post(loginNewUser);
router.route('/signup').get(showSignupPage).post(signupNewUser);
router.post('/logout', doLogout);

export default router;