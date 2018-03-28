const userController = require('../controllers/users')
module.exports = (app)=>{
    
    app.get('/', (req, res, next)=>{
        res.render('../public/index.jade')
        next()
    })

    app.get('/home', userController.home)
    app.get('/about', userController.startPage)
    
}