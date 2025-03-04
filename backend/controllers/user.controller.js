import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import {User} from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'hello, it’s here'
    });
};

export const updateUser = async (req, res, next) => {

    if (!req.params.id) {
        return next(errorHandler(400, "User ID is missing in the request URL."));
    }

    if (!req.user || req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can update only your account!"));
    }

    try {
        let updateData = {
            userName: req.body.username,  
            email: req.body.email,
            profilePicture: req.body.profilePicture,
        };

        if (req.body.password && req.body.password.trim() !== "") {
            updateData.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        console.log("Updated user:", updatedUser);

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updatedUser._doc;

        console.log('rest ',rest);
        

        res.status(200).json({
            message: "Updated Successfully",
            user: rest,
        });

    } catch (error) {
        console.error("❌ Update error:", error);
        next(error);
    }
};

export const deleteUser = async (req, res) => {     
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Account Deleted Successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
