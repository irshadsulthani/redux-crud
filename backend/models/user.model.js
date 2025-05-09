import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required:true,
    },
    email : {
        type : String,
        required:true,
        unique:true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
    },
    password : {
        type : String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
    },
    
}, {timestamps:true})

export const User = mongoose.model('User', userSchema)