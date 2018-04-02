const connection = require('../database/database')
const services = require('../services/services.js')

let searchInfo = (req, res)=>{
    let query = 'SELECT * FROM users'
    connection.query(query, (err, data)=>{
        if(err){
            console.log('query not found')
            
        }else{
            console.log(data)
            res.send(req.params)
        }
    })    
}

let formInsertMewUser = (req, res)=>{
    res.render('../public/newUser/newUser.jade')
}

let registerUser = (req, res, next)=>{
    let user = {
        username : req. body.username,
        password : req.body.password,
        name : req.body.name,
        mail : req.body.mail,
        phone_number : req.body.phone_number
    }

    let query = 'INSERT INTO users SET ?'
    connection.query(query, user,(err, data)=>{
        if(err){
           res.status(500).send({message : `error al crear el usuario ${err}`})
        }else{
            res.status(200).send({token : services.createToken(user)})
            res.redirect(`/api/validate-sms/${user.phone_number}`)
        }
    })
    
}

let validateSms = (req,res)=>{

}

let signIn = (req,res)=>{
    let user = [req.body.username,req.body.password]
    

    let query = `SELECT * FROM users WHERE username = ? AND password = ? `
    connection.query(query, user,(err,result)=>{
        if(err) return res.status(500).send({message: err})
        if(result.length < 1) return res.status(404).send({message: 'invalid credentials'})
        req.user = result
        
        res.status(200).send(
            {message: `welcome ${user[0]}`,
             token : services.createToken(result[0])}
        )
    })
}


module.exports = {
    searchInfo,
    registerUser,
    formInsertMewUser,
    validateSms,
    signIn
    
}

