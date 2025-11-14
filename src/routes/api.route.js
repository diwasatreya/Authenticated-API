import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { generateAPIKey, showAllUsers, showUser } from "../controllers/api.controller.js";
import { checkAPI } from "../middlewares/api.middleware.js";
const router = Router();

router.route('/generate').post(checkAuth, generateAPIKey);
router.use(checkAPI);
router.route('/users').post(showAllUsers);
router.route('/users/:id').get(showUser);

export default router;