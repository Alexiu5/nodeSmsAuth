const userController = require('../controllers/users')
const commonController = require('../controllers/commonController.js')
const auth = require('../middlewares/auth')
module.exports = (app)=>{
    app.get('/', (req, res)=>{ res.redirect('/home')})

    // route for insert users
    app.post('/api/register-user', userController.registerUser)
    app.post('/app/signin/',userController.signIn)


    app.get('/api/validate-sms/:phone', userController.validateSms )
    app.get('/api/register-user', userController.formInsertMewUser)
    app.get('/home',commonController.home)
    app.get('/admin', auth,(req, res)=>{
        res.status(200).send({message: 'access garanted'})
        res.send('Hello dude')
    })
}