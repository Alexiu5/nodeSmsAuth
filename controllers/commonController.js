const services = require("../services/services")
// const jwt = require('jwt-simple')

// const nexmo = new Nexmo({
//     apiKey : '',
//     apiSecret : ''
// },{debug : true})

const home = (req, res) =>{
    res.render('../public/index.jade')
}

const logIn = (req, res)=>{

}

const sendSMS = ()=>{

}


module.exports = {
    home
}