import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        typeof : String,
        require:true,
        unique:true
    },
    email : {
        typeof : String,
        require:true,
        unique:true
    },
    password : {
        typeof : String,
        require:true,
    },
}, {timestamps:true})

export const User = mongoose.model('User', userSchema)