import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authService = {
    registerUser: async (userData) => {
        const { email } = userData;
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            throw new Error('This email already exist');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const user = new User({
            ...userData,
            password: hashedPassword
        });

        try {
            const newUser = await user.save();
            const userWithoutPassword = newUser.toObject();
            delete userWithoutPassword.password;

            return userWithoutPassword;
        } catch (error) {
            throw new Error(`User creation error: ${error.message}`);

        }
    },
    loginUser: async (email, password) => {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("User not found");
        };

        const isPasswordsEquals = await bcrypt.compare(password, user.password);

        if (!isPasswordsEquals) {
            throw new Error("The passwords do not match");
        };

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, config.app.jwtSecret,{expiresIn: '1h'});

        const userFormated= user.toObject();
        delete userFormated.password;


        const userLogin = {
            data : userFormated, 
            token : token,
        };

        return userLogin;
    }

}