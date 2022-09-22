import express from 'express'
import { googleAuth, logout, signin, signup } from '../controllers/auth.js';

const router = express.Router();

// CREATE a user
router.post("/signup" , signup)


// SIGN IN
router.post("/signin" , signin)

// GOOGLE AUTH
router.post("/google" , googleAuth)

// LOGOUT
router.get("/logout" , logout)




export default router;