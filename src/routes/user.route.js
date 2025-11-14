import { Router } from 'express';
import { showHomePage } from '../controllers/user.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(checkAuth);
router.get('/', showHomePage);


export default router;