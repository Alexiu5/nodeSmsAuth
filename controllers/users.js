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
        username : req.body.username,
        password : req.body.password,
        name : req.body.name,
        mail : req.body.mail,
        phone_number : req.body.phone_number
    }
    daf.registerUser(user)
        .then((data) =>{    
            res.status(200).send({token : services.createToken(user)})
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send({message: 'Error al insertar un usuario'})  
        })
}

let generateCode = (req,res)=>{
    let phone_number = req.params.number
    let code = services.generateCode()
    daf.searchUserByPhone(phone_number)
        .then((data)=>{
                daf.registerCode(data[0].id_user, code).then((response) => {
                //services.smsVerification(phone_number, code); // Nexmo Service call
                res.status(200).send({phone_number: phone_number, message : 'code generated'})
            })
        })
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


let isActive = (req, res, next)=>{    
    daf.searchUserState(req.body.username)
        .then((data) =>{
            if(data[0].state == 0){
                res.status(204)
            }else{
                next()
            }
        })
}

let validate = (req, res)=>{
    let code = req.body.code
    let payload = req.user
    return daf.searchCode(payload.sub)
        .then((db_code)=>{
            let db_cde = db_code[0].sms_code

            if(code === db_cde){
                daf.updateState(1,payload.sub).then((data)=>console.log(`this should works`))
                res.status(200).send({message: 'account active'})
            }else{
                console.log('Wrong code!')
                res.status(404).send({message : 'wrong auth code'})
            }
        })
        .catch((err)=>{
            console.log('error in validate code'+ err)
        })
}

// let validateCode= (id_user, code)=>{
//     return daf.
// }

module.exports = {
    searchInfo,
    signup,
    formInsertMewUser,
    generateCode,
    login,
    isActive,
    validate 
}

