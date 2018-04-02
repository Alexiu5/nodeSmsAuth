const services = require('../services/services.js')

isAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'you are not allowed enter here'})
    }
    const token = req.headers.authorization.split(" ")[1]
    services.decodeToken(token)
        .then(response =>{
            req.user = response
            next()
        })
        .catch(response =>{
            res.status(response.status)
        })
}

module.exports = isAuth