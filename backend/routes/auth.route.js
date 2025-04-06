import express from 'express'
import { google, logout, signIn, signUp } from '../controllers/auth.controller.js';



const router = express.Router();

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/google', google)
router.get('/logout', logout)

export default router;