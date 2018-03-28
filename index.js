const express = require('express')
const bodyParser = require('body-parser') // used for format the http request in Json 
const jade = require('jade') // used for render the views in the page
const nexmo = require('nexmo') // used for send messages throught sms
const socketio = require('socket.io') // for socket listener

const routing = require('./routes/routing')
const config = require('./config')

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
app.listen(config.socket, ()=>{
    console.log(`server running in port: ${config.socket}`)
})

//Calling the router
routing(app)
