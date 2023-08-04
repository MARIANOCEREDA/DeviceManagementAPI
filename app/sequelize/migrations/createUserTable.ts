import { QueryInterfaceCreateTableOptions, Sequelize } from 'sequelize'
import { USER_TABLE, UserModel } from '../models/userModel'

class CreateUserTable {

    up = async (queryInterface, Sequelize:Sequelize) => {

        await queryInterface.createTable('User', UserModel)

    }

    down = async (queryInterface, Sequelize) => {

        await queryInterface.dropTable('User')

    }

}

export default CreateUserTable