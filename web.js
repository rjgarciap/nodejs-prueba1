#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

var os = require('os');

console.log("iniciando la aplicacion");
console.log(os.cpus());
var mi_funcion= function(request, response){
  var fs = require('fs');
  var cpu_info =os.cpus();
  var int_network=os.networkInterfaces();
  var os_type=os.type();
  var host_name=os.hostname();		
  console.log("hemos recibido algo");

  var codigo_html="<html><head></head><body>"
  codigo_html+="<ul><li><p>Sistema operativo: "+os_type+"</p></li><li><p>"+os.platform()+"</p> </li></ul>";	
  codigo_html+="</body></html>";
  fs.writeFileSync('index.html',codigo_html);
  var cad = fs.readFileSync('index.html','utf8');
 

  var resultados=["Sistema operativo:",os_type,"Nombre del host:",host_name,"Informacion CPU:",cpu_info,"Interfaces de red:",int_network];
  response.send(cad);
 
};

app.get('/', mi_funcion);
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

