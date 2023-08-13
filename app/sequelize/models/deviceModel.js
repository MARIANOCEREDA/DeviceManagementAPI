import { Model, DataTypes } from 'sequelize'
import { USER_TABLE } from './userModel.js'
import config from '../../configs/index.js'

const DEVICE_TABLE = config.mysql.deviceTableName

const DeviceModel = {

    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },

    deviceId:{
        field:'uuid',
        allowNull:false,
        unique:true,
        type:DataTypes.UUID
    },

    name:{
        field:'name',
        allowNull:false,
        unique:true,
        type:DataTypes.STRING
    },

    userId:{
        field:'userId',
        allowNull:false,
        type:DataTypes.INTEGER,
        references:{
            model:USER_TABLE,
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
    },
    
    createdAt:{
        field:'createdAt',
        allowNull:false,
        type:DataTypes.TIME,
        defaultValue:DataTypes.NOW
    },

    updatedAt:{
        field:'updatedAt',
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }

}

class Device extends Model {

    static config(sequelize) {
        return{
            sequelize,
            tableName:DEVICE_TABLE,
            modelName:'Device',
            timestamps:false
        }
    }

    static associate(models) {

        this.belongsTo(models.User, {as:'user'})

    }

}

export { DEVICE_TABLE, DeviceModel, Device }