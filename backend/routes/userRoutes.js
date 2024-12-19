import express from 'express';
import User from '../models/User.js';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js'; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); 

export default router;