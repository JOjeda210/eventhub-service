import { authService } from "../services/auth.service.js";
import { successRes, errorRes } from "../utils/response.helper.js"


export const authController = {
    register: async (req, res) => {
        try {
            const newUser = await authService.registerUser(req.body)
            return successRes(req, res, { data: newUser }, 201);
        } catch (error) {
            return errorRes(req, res, { "error": error.message }, 400);
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            const loginUser = await authService.loginUser(email, password);
            return successRes(req,res,{data : loginUser}, 200)
        } catch (error) {
            if(error.message === 'The passwords do not match'){
                return errorRes(req,res,{error : error.message}, 401)
            }
            return errorRes(req,res,{error : error.message}, 400)
        }
    }
}