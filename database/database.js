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
        console.log('this shit crash')
    }else{
        console.log('successful')
    }
})   

module.exports = connection