module.exports = {
    env:'production',
    serverPort:process.env.SERVER_PORT || 3001,
    mongo: {
        port:27017,
        dbHost:'localhost',
        dbName:'breakingnode',
        dbPassword:process.env.MONGO_PASSWORD,
        dbUsername:process.env.MONGO_USERNAME
    },
    mysql:{
        port:3306,
        dbName:'breakingnode',
        dbHost:'localhost',
        dbPassword:process.env.MYSQL_DB_PASSWORD,
        dbUsername:process.env.MYSQL_DB_USERNAME,
        usersTableName:'users',
   },
    jwt:{
        key:"637ab629-c9ee-4af0-ae72-14dc9c7277db"
    }
}