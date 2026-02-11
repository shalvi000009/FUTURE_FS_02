import express from 'express';
import { loginUser, registerUser, adminLogin, listUsers, verifyAdmin, setupAdmin } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register',registerUser);
userRouter.post('/admin',adminLogin)
// One-time setup (only works if no admin exists yet)
userRouter.post('/setup-admin', setupAdmin)
// Admin-only
userRouter.get('/list', adminAuth, listUsers);
userRouter.get('/verify-admin', adminAuth, verifyAdmin);

export default userRouter;