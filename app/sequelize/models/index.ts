import { UserModel, User } from "./userModel";

function setUpModels(sequelize){

  User.init(UserModel, User.config(sequelize));

  // User.associate(sequelize.models);
}

export { setUpModels }