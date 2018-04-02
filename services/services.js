'use-strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')


const Nexmo = require('nexmo') // used for send messages throught sms
const nexmo = new Nexmo({
    apiKey : config.nexmoCredentials.API_KEY,
    apiSecret : config.nexmoCredentials.API_SECRET
}, {debug : true})


// Jwt encoders and decoders 
let createToken = (user)=>{
    console.log(user);
    
    const payload={
        sub:  user.username,
        perm : user.id_profile,
        iat : moment().unix(),
        exp : moment().add(1,'days').unix()
    }   
    console.log('creating token')
    return jwt.encode(payload, config.SECRET_TOKEN)
}

let decodeToken = (token)=>{
    const decoded = new Promise ((resolve, reject) =>{
        try{
            let payload = jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message : 'the token expiried'
                })
            }
            console.log(payload)
            resolve(payload.sub)

        }catch(err){
            reject({
                status : 500,
                message : 'invalid Token'
            })
        }
    })

    return decoded
}

// Method to send a sms
let smsVerification = (data)=>{
    nexmo.message.sendSms('573005261395',data.phone_number,data.code,{type : 'unicode'},
        (err, response) =>{
            if(err){
                console.log('Error enviando el mensaje de texto')
                return err
            }
            console.dir(response)
        }
    )
}


module.exports = {
    createToken,
    decodeToken,
    smsVerification
}
