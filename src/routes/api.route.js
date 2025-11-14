import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { generateAPIKey, showAllUsers, showUser } from "../controllers/api.controller.js";
import { checkAPI } from "../middlewares/api.middleware.js";

const router = Router();

router.route('/generate').post(checkAuth, generateAPIKey);
router.route('/users').post(checkAPI, showAllUsers);
router.route('/users/:id').get(checkAPI, showUser);

export default router;