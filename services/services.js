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
const createToken = (user)=>{    
    const payload={
        sub:  user.username,
        perm : user.id_profile,
        iat : moment().unix(),
        exp : moment().add(1,'days').unix()
    }   
    console.log('creating token')
    return jwt.encode(payload, config.SECRET_TOKEN)
}

const decodeToken = (token)=>{
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
const smsVerification = (phone_number,code)=>{
    nexmo.message.sendSms(config.VIRTUAL_NUMBER, phone_number,code,{type : 'unicode'},
        (err, response) =>{
            if(err){
                console.log('sms verification error',err)
                return err
            }
            console.dir(response)
        }
    )
}

const generateCode = ()=> String(Math.floor(100000 + Math.random() * 900000)).substring(0,4)
const isEmpty = (data)=>{
    if(data.length > 0){
        return true
    }
    return false
}

module.exports = {
    createToken,
    decodeToken,
    smsVerification,
    generateCode,
    isEmpty 

}
