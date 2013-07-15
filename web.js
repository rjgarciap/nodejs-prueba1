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
    codigo_html+="<ul><li><p><b>Sistema operativo: </b>"+os_type+"</p></li><li><p><b>Plataforma: </b>"+os.platform()+"</p> </li><li><p<b>Host name: </b>"+os.hostname()+"</p></li><li><p>Arquitectura CPU OS: "+os.arch()+"</p></li><li><p>Release del SO: "+os.release()+"</p></li><li><p>Memoria total del sistema(Byte): "+os.totalmem()+"</p></li><li><p>Memoria libre del sistema(Bytes): "+os.freemem()+"</p></li><li><p>Directorio archivos temporales: "+os.tmpdir()+"</p></li><li><p>Host name: "+os.hostname()+"</p></li><li><p>Endianness de la CPU: "+os.endianness()+"</p></li></ul>";	
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

