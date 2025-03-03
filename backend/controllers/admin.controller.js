import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'


export const signUp = async(req,res)=>{
    try {
        const {username, email, password} = req.body
        const hash =  bcrypt.hashSync(password, 10)
        console.log(hash);
    const newUser = new User({userName:username,email:email,password:hash})
     await newUser.save()
     res.status(201).json({message:"user created successfull"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}