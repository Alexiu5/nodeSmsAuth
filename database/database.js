const config = require('../config')
const mysql = require('mysql')
const db_settings = {
    host     : config.databaseCredentials.HOST,
    user     : config.databaseCredentials.USER,
    password : config.databaseCredentials.PASSWORD,
    database : config.databaseCredentials.DATABASE
}
const connection = mysql.createConnection(db_settings)

connection.connect((err)=>{
    if(!!err){
        console.log('error connecting to the database')
    }else{
        console.log('db connected')
    }
})   

module.exports = connection