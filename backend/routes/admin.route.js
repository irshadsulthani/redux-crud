import express from 'express'
import { adminLogin } from '../controllers/admin.controller.js';

const adminRoute = express.Router()

adminRoute.post('/adminLogin', adminLogin)



export default adminRoute;