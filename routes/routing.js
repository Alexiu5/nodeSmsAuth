const userController = require('../controllers/users')
const commonController = require('../controllers/commonController.js')
const auth = require('../middlewares/auth')

module.exports = (app)=>{
    app.get('/', (req, res)=>{ res.redirect('/home')})
    // route for insert users
    app.post('/app/login/',userController.login)
    app.post('/api/signup', userController.signup)
    app.post('/api/validate-code/', auth,userController.validate)
    
    app.get( '/api/validate-sms/:number',auth, userController.generateCode)
    app.get( '/api/register-user', userController.formInsertMewUser)
    app.get( '/api/validateUser', userController.searchInfo)
    

    app.get('/home',commonController.home)
    app.get('/admin', auth,(req, res)=>{
        res.status(200).send({message: 'access garanted'})
    })
}