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
        resolve (mysql.createConnection(db_settings))
    })
}
module.exports = {
    connection
}
