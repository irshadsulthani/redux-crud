import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import {User} from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'hello, it’s here'
    });
};

export const updateUser = async (req, res, next) => {
    console.log("✅ Request received for user update");

    console.log("Request body:", req.body);
    console.log("Authenticated user ID:", req.user?.id);
    console.log("Requested update user ID:", req.params.id); // Debug this

    if (!req.params.id) {
        return next(errorHandler(400, "User ID is missing in the request URL."));
    }

    if (!req.user || req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can update only your account!"));
    }

    try {
        let updateData = {
            userName: req.body.username,  // Fixed field name
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
