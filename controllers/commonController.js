const services = require("../services/services")
const daf = require('./dataAccessFile')
// const jwt = require('jwt-simple')

// const nexmo = new Nexmo({
//     apiKey : '',
//     apiSecret : ''
// },{debug : true})

const home = (req, res) =>{
    let result = daf.testConnection()
        .then((data)=>{
            res.render('../public/index.jade')
        })
        .catch((err)=>{
            res.send('error trying to search the user data')
        })
    
}

const logIn = (req, res)=>{

}

const sendSMS = ()=>{

}


module.exports = {
    home
}