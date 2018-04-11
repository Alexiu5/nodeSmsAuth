const express = require('express')
const bodyParser = require('body-parser') // used for format the http request in Json 
const jade = require('jade') // used for render the views in the page
const socketio = require('socket.io') // for socket listener
const routing = require('./routes/routing')
const config = require('./config')
const database = require('./database/database')
const cors = require('cors')

//init express aplication
const app = express()

//Template engine setup
app.set('view_engine', 'html')
// app.engine('html', jade.renderFile)  

//public folder setUp
app.use(express.static(__dirname + '/public'))

//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//starting app
let server = app.listen(config.socket, ()=>{
    console.log(`server running in port: ${config.socket}`)
})

// Enable cross origin resources sharing
app.use(cors());

// Connect to socket.io
const io = socketio(server)
io.on('connection', (socket)=>{
    console.log('user connected');
    socket.emit('message', {message : 'hello wrld'})
    io.on('disconnect', ()=>{
        console.log('disconnected')
    })
})

//Calling the router
routing(app)
