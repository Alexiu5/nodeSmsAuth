var mysql = require('promise-mysql')
const config = require('../config')
var Promise = require("bluebird");

let db_settings = {
    host     : config.databaseCredentials.HOST,
    user     : config.databaseCredentials.USER,
    password : config.databaseCredentials.PASSWORD,
    database : config.databaseCredentials.DATABASE
}

let connection = ()=>{
    return new Promise((resolve, reject)=>{
        let connection = mysql.createConnection(db_settings)
        .catch((err)=>{
            console.log('Database connection error')
            reject(err)
        })
        
        resolve (connection)  
    })
}
module.exports = connection

