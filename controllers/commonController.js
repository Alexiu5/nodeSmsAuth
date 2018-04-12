const services = require("../services/services")
const daf = require('./dataAccessFile')

const path = require('path');
const mime = require('mime');
const fs = require('fs');
// const jwt = require('jwt-simple')

// const nexmo = new Nexmo({
//     apiKey : '',
//     apiSecret : ''
// },{debug : true})

const home = (req, res) =>{
    res.render('../public/home/home.jade')
}

let downloadApp = (req, res)=>{
    var file = './public/upload-folder/example.PNG';
    
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
  
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
  
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
}


const logIn = (req, res)=>{

}

const sendSMS = ()=>{

}


module.exports = {
    home,
    downloadApp
}