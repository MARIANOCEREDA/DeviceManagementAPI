import { Model,DataTypes,Sequelize } from 'sequelize'

const USER_TABLE = process.env.MYSQL_DB_USERS_TABLENAME

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
        length:255
    },
  
    lastName:{
        field:'LastName',
        type:DataTypes.STRING,
        allowNull:false,
        length:255
    },

    username:{
        field:'Username',
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        length:45
    },

    phoneNumber:{
        field:'PhoneNumber',
        allowNull:true,
        type:DataTypes.STRING,
        length:255
    },

    state:{
        field:'State',
        allowNull:true,
        type:DataTypes.STRING,
        length:255
    },

    city:{
        field:'City',
        allowNull:true,
        type:DataTypes.STRING,
        length:255
    },

    country:{
        field:'Country',
        allowNull:true,
        type:DataTypes.STRING,
        length:255
    },

    passwordHash:{
        field:'PasswordHash',
        allowNull:false,
        type:DataTypes.STRING,
        length:256
    },

    cookieId:{
        field:'CookieId',
        allowNull:true,
        type:DataTypes.STRING,
        length:255
    },

    userId:{
        field:'UserId',
        allowNull:false,
        unique:true,
        type:DataTypes.STRING,
        length:255
    },

    salt:{
        field:'Salt',
        allowNull:false,
        type:DataTypes.STRING,
        length:255
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
        length:100
    },

    refreshToken:{
      field:'RefreshToken',
      allowNull:true,
      type:DataTypes.STRING,
    },

    createdAt:{
        filed:'CreatedAt',
        allowNull:false,
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

}

class User extends Model{


    static config(sequelize){
        return{
            sequelize,
            tableName:USER_TABLE,
            modelName:'User',
            timestamps:false
        }
    }

}

export { USER_TABLE, UserModel, User }