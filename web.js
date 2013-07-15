#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

var os = require('os');

console.log("iniciando la aplicacion");
console.log(os.cpus());
var mi_funcion= function(request, response){
  var fs = require('fs');
  var cpu_info =os.cpus();		
  console.log("hemos recibido algo");
//  var cad = fs.readFileSync('index.html','utf8');
  response.send("hola mundo"+cpu_info);


};

app.get('/', mi_funcion);
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

