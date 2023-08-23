import { DeviceService } from "../services/deviceService.js";

class DeviceController{


    constructor(){
        this.service = new DeviceService();
    }

    create = async (req, res, next) => {

        try{

            const deviceData = req.body 

            const createdDevice = await this.service.create(deviceData)

            return res.status(200).json({device:createdDevice})

        }catch(error){
            next(error)
        }
        next()   

    }

}

export { DeviceController }