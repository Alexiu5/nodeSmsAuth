const userController = require('../controllers/users')
const commonController = require('../controllers/commonController.js')
const auth = require('../middlewares/auth')
module.exports = (app)=>{
    app.get('/', (req, res)=>{ res.redirect('/home')})

    // route for insert users
    app.post('/app/signin/',userController.signIn)
    app.post('/api/register-user', userController.registerUser)
    
    app.get( '/api/validate-sms/:number', userController.validateSms)
    app.get( '/api/register-user', userController.formInsertMewUser)
    app.get( '/api/validateUser', userController.searchInfo)
    
    app.get('/home',commonController.home)
    app.get('/admin', auth,(req, res)=>{
        res.status(200).send({message: 'access garanted'})
        res.send('Hello dude')
    })
}