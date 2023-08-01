import { Model,DataTypes,Sequelize } from 'sequelize'

const DEVICE_TABLE = process.env.MYSQL_DB_DEVICES_TABLENAME


//TODO: Create device model and migrate to create table
const DeviceModel = {

}

class User extends Model{

    static config(sequelize){
        return{
            sequelize,
            tableName:DEVICE_TABLE,
            modelName:'Device',
            timestamps:false
        }
    }

}

export { DEVICE_TABLE, DeviceModel, User }