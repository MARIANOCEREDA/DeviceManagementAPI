import { UserModel, User } from "./userModel";
import { DeviceModel, Device } from "./deviceModel";

function setUpModels(sequelize) : void {

  User.init(UserModel, User.config(sequelize));
  Device.init(DeviceModel, Device.config(sequelize));

  User.associate(sequelize.models);
  Device.associate(sequelize.models);
  
}

export { setUpModels }