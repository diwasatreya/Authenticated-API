import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { generateAPIKey, showAllUsers, showUser } from "../controllers/api.controller.js";

const router = Router();

router.route('/generate').post(checkAuth, generateAPIKey);
router.route('/users').get(showAllUsers);
router.route('/users/:id').get(showUser);

export default router;