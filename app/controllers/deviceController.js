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

    findAll = async (req, res, next) => {

        try{

            const username = req.params.username

            const foundDevices = await this.service.findAll(username)

            if(foundDevices){
                return res.status(200).json({devices:foundDevices})
            }

        }catch(error){
            next(error)
        }
        next()
    }

    findOneByName = async (req, res, next) => {

        try{

            const username = req.params.username
            const deviceName = req.query.deviceName

            const foundDevices = await this.service.findByName(username, deviceName)

            if(foundDevices){
                return res.status(200).json({devices:foundDevices})
            }

        }catch(error){
            next(error)
        }
        next()
    }

}

export { DeviceController }