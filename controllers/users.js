const services = require('../services/services')
const daf = require('./dataAccessFile')

let formInsertMewUser = (req, res)=>{
    res.render('../public/newUser/newUser.jade')
}

let searchInfo = (req, res)=>{
    const findUser = daf.findUser(2)
        .then((data)=>{
            if(data.length > 0){
                res.status(200).send([{message : 'user finded'},{info : data}])
            }else{
                res.status(400).send({message: `user data don't found`})
            }
        })
        .catch((err)=>{
            console.log(`an error was cause ${err}`);
            res.status(500)
        })
}

let signup = (req, res, next)=>{
    let user = {
        username : req. body.username,
        password : req.body.password,
        name : req.body.name,
        mail : req.body.mail,
        phone_number : req.body.phone_number
    }
    daf.registerUser(user)
        .then((data) =>{
            console.log(data[0].phone_number)
            res.status(200).redirect(`/api/validate-sms/${data[0].phone_number}`)
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({message: 'Error al insertar un usuario'})  
        })
}

let validarMensaje = (req, res)=>{
    res.render('../public/newUser/validar.jade')
}

let validateSms = (req,res)=>{
    let phone_number = req.params.number
    console.log('hey dont touch me');
    
    return res.json({message : `phone number: ${phone_number}, verification code : ${services.generateCode()}`, data : `status ok`})
}
    
let login = (req,res)=>{
    let resultado = 
        daf.login(req.body.username, req.body.password)
            .then((data)=>{
                if(data.length > 0){
                    res.status(200).send({token : services.createToken(data[0])})
                }else{
                    res.status(404).send({message :`check your login credentials!`})
                }
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({message:`error from the server`})
            })
}

module.exports = {
    searchInfo,
    signup,
    formInsertMewUser,
    validateSms,
    login,
    validarMensaje
}

