import { successRes, errorRes } from "../utils/response.helper.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return errorRes(req, res, {"error": 'Invalid or expired token'}, 401);
    };

    try{
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, config.app.jwtSecret)
        req.user = decodedToken;
        next()

    }catch(error){
        return errorRes(req,res,{"error": 'Invalid or expired token'},401); 
    }

}

