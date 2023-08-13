import { UserService } from '../services/userService.js'

class SignupController{

    constructor(){
        this.service = new UserService();
    }

    async createUser(request, response, next){
        try {

            const signupData= request.body;

            const result = await this.service.create(signupData)

            if(result){
                response.json({CreatedUser:signupData});
            }
            
        } catch (error) {
            next(error);
        }
    }

}

export { SignupController }