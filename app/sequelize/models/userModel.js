import { Model,DataTypes } from 'sequelize'
import config from '../../configs/index.js'

const USER_TABLE = config.mysql.userTableName

const UserModel = {

    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },

    firstName:{
        field:'FirstName',
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            max:255
        }
    },
  
    lastName:{
        field:'LastName',
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            max:255
        }
    },

    username:{
        field:'Username',
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            min:10,
            max:100
        }
    },

    phoneNumber:{
        field:'PhoneNumber',
        allowNull:true,
        type:DataTypes.STRING,
    },

    state:{
        field:'State',
        allowNull:true,
        type:DataTypes.STRING,
        validate:{
            max:255
        }
    },

    city:{
        field:'City',
        allowNull:true,
        type:DataTypes.STRING,
        validate:{
            max:255
        }
    },

    country:{
        field:'Country',
        allowNull:true,
        type:DataTypes.STRING,
        validate:{
            max:255
        }
    },

    passwordHash:{
        field:'PasswordHash',
        allowNull:false,
        type:DataTypes.STRING,
    },

    cookieId:{
        field:'CookieId',
        allowNull:true,
        type:DataTypes.STRING,
    },

    userId:{
        field:'UserId',
        allowNull:false,
        unique:true,
        type:DataTypes.STRING,
    },

    salt:{
        field:'Salt',
        allowNull:false,
        type:DataTypes.STRING,
    },

    age:{
        field:'Age',
        allowNull:true,
        type:DataTypes.INTEGER
    },

    email:{
        field:'Email',
        allowNull:false,
        type:DataTypes.STRING,
        unique: true, //Para que no haya emails iguales
    },

    refreshToken:{
      field:'RefreshToken',
      allowNull:true,
      type:DataTypes.STRING,
    },

    createdAt:{
        field:'CreatedAt',
        allowNull:false,
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

}

class User extends Model {

    static config(sequelize) {
        return {
            sequelize,
            tableName:USER_TABLE,
            modelName:'User',
            timestamps:false
        }
    }

    static associate(models) {

        this.hasMany(models.Device, {
            as:'UserHasDevices',
            foreignKey:'userId'
        })
    }

}

export { USER_TABLE, UserModel, User }