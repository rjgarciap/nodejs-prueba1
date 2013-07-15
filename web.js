#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

var os = require('os');

console.log("iniciando la aplicacion");
var int_network=os.networkInterfaces();
for(var hola in int_network){
  console.log(hola);
};

var mi_funcion= function(request, response){
  var fs = require('fs');
  var cpu_info =os.cpus();
  var int_network=os.networkInterfaces();
  console.log("hemos recibido algo");

  var codigo_html="<html><head></head><body>";
    codigo_html+="<ul><li><p><b>Sistema operativo: </b>"+os.type()+"</p></li><li><p><b>Plataforma: </b>"+os.platform()+"</p> </li><li><p><b>Host name: </b>"+os.hostname()+"</p></li><li><p><b>Arquitectura CPU OS: </b>"+os.arch()+"</p></li><li><p><b>Release del SO: </b>"+os.release()+"</p></li><li><p><b>Memoria total del sistema(Bytes): </b>"+os.totalmem()+"</p></li><li><p><b>Memoria libre del sistema(Bytes): </b>"+os.freemem()+"</p></li><li><p><b>Directorio archivos temporales: </b>"+os.tmpdir()+"</p></li><li><p><b>Host name: </b>"+os.hostname()+"</p></li><li><p><b>Endianness de la CPU: </b>"+os.endianness()+"</p></li><li><p><b>CPUs: </b></p>";

   for(var i=0;i<cpu_info.length;i++){
   codigo_html+="<li>Modelo: "+cpu_info[i]["model"]+"</li><li>Speed: "+cpu_info[i]["speed"]+"</li><li>Tiempos: <br><ul><li>user: "+cpu_info[i]["times"]["user"]+"</li><li>nice: "+cpu_info[i]["times"]["nice"]+"</li><li>sys: "+cpu_info[i]["times"]["sys"]+"</li><li>idle: "+cpu_info[i]["times"]["idle"]+"</li><li>irq: "+cpu_info[i]["times"]["irq"]+"</li></ul></li><br>";
}
  codigo_html+="</li><li><p><b>Network Interface: </b></p><ul>";
  
  codigo_html+="<li>"+int_network.eth0[0]["address"]+"</li>";

	
  codigo_html+="</ul></li></ul></body></html>";
  fs.writeFileSync('index.html',codigo_html);
  var cad = fs.readFileSync('index.html','utf8');
  response.send(cad);

  
 
};

app.get('/', mi_funcion);
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

