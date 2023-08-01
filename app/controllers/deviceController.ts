import { DeviceService } from "../services/deviceService";

class DeviceController{

    deviceService

    constructor(){
        this.deviceService = new DeviceService();
    }

}

export { DeviceController }