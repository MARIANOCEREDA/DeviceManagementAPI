import { DeviceService } from "../services/deviceService.js";

class DeviceController{

    deviceService

    constructor(){
        this.deviceService = new DeviceService();
    }

}

export { DeviceController }