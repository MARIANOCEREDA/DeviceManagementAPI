import { UserService } from '../services/userService.js';

class LoginController{

    constructor(){
        this.service = new UserService();
    }

    login = async (request, response, next) => {

        try {
            
            const loginData = request.body;

            const result = await this.service.authenticate(loginData.username, loginData.password)

            if(result.auth){
                response.json({token:result.token})
            }

        } catch (error) {
            next(error);
        }
    }

}

export { LoginController }