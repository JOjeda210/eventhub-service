import { successRes, errorRes } from "../utils/response.helper.js";


export const checkRole = (allowedRoles) =>{
    return (req,res,next) =>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return errorRes(req,res,{error : "Access denied" },403);
        }
        next();
    }
}