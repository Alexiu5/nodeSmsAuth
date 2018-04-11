const services = require('../services/services.js')

isAuth = (req, res, next)=>{
    console.log(req.headers)
    if(!req.headers.authorization){
        return res.status(403).send({message: 'you are not allowed enter here'})
    }
    const token = req.headers.authorization.split(" ")[1]
    services.decodeToken(token)
        .then(response =>{
            req.user = response
            console.log(req.user);
            
            next()
        })
        .catch(response =>{
            res.status(response.status).send({message:`you're the police`})
        })
}

module.exports = isAuth