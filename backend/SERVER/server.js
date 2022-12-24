const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var dotenv = require('dotenv').config()
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
var cors = require('cors');
app.use(express.static(path.join(__dirname, '../../src')));

var whitelist = ['http://localhost:3000','http://localhost:4000']
var corsOptions = {
  origin: function (origin, callback){
    if (whitelist.indexOf(origin) !== -1 || origin === undefined){
      callback(null, true)
    }else {
      callback(new Error('not allowed'+origin))
    }
  }
}
app.use(cors(corsOptions));
var RoutesClass = require('./ROUTES');
var optionsClass = require('../../deploy')
var options = new optionsClass(true).getOptions();
var Routes = new RoutesClass(options)
Routes.addCryptos()
setInterval(function(){
  console.log('adding cryptos')
  Routes.addCryptos()
},(1000*60*60))

app.get('/updateCryptos', function(req,response){
  Routes.addCryptos(req,response,req.body)
});

app.get('/getCryptos',function(req,res){
  Routes.getCryptos(req,res,req.body)

})

app.get('/testpath',function(req,res){
  console.log('here')
  res.json({'here':true})
})

app.listen(port,function(err){
  if (err){
    console.log('err',err)
  }else {
    console.log('port',port)
  }
})



