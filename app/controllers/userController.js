import { UserService } from "../services/userService.js"

class UserController {

    constructor(){
        this.service = new UserService()
    }

    findAll = async (req, res, next) => {
        try{

            const users = await this.service.getAll();

            return res.status(200).json({users:users})

        }catch(error){
            next(error)
        }
        next()   
    }

    update = async (req, res, next) => {

        try {

            const userNewData = req.body 

            const updatedUser = await this.service.update(userNewData)

            if(updatedUser){
                return res.status(200).json({userUpdated:updatedUser})
            }
            
        } catch (error) {
            next(error)
        }


    }

    findOne = (req, res, next) => {
    }


}

export { UserController }