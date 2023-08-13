import { UserModel, User } from "./userModel.js";
import { DeviceModel, Device } from "./deviceModel.js";

function setUpModels(sequelize) {

  User.init(UserModel, User.config(sequelize));
  Device.init(DeviceModel, Device.config(sequelize));

  User.associate(sequelize.models);
  Device.associate(sequelize.models);
  
}

export { setUpModels }