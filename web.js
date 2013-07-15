#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

var os = require('os');

console.log("iniciando la aplicacion");
console.log(os.cpus()[0]);
var mi_funcion= function(request, response){
  var fs = require('fs');
  var cpu_info =os.cpus();
  var int_network=os.networkInterfaces();
	
  console.log("hemos recibido algo");

  var codigo_html="<html><head></head><body>"
    codigo_html+="<ul><li><p><b>Sistema operativo: </b>"+os.type()+"</p></li><li><p><b>Plataforma: </b>"+os.platform()+"</p> </li><li><p><b>Host name: </b>"+os.hostname()+"</p></li><li><p><b>Arquitectura CPU OS: </b>"+os.arch()+"</p></li><li><p><b>Release del SO: </b>"+os.release()+"</p></li><li><p><b>Memoria total del sistema(Bytes): </b>"+os.totalmem()+"</p></li><li><p><b>Memoria libre del sistema(Bytes): </b>"+os.freemem()+"</p></li><li><p><b>Directorio archivos temporales: </b>"+os.tmpdir()+"</p></li><li><p><b>Host name: </b>"+os.hostname()+"</p></li><li><p><b>Endianness de la CPU: </b>"+os.endianness()+"</p></li><li><p><b>CPUs: </b></p>";

   for(var i=0;i<cpu_info.length;i++){
   codigo_html+="<li>"+cpu_info[i]["model"]+": "+"<li>"+cpu_info[i]["speed"]+"</li></li>"
}
  codigo_html+="</li></ul>";	
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

