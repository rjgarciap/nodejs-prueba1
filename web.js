#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());
var fs = require('fs');

var os = require('os');

var cpu_info2;
var int_network2;


//var codigo_html="<html><head></head><body>"; 
var antjson="{medidas:[]}";
var json="";
console.log("iniciando la aplicacion");

var int=setInterval(function(){clock()},1000);

function clock(){
 cpu_info2 =os.cpus();
 int_network2=os.networkInterfaces();
 var o=0;
 if(o==0){
   json+="{Free memory:"+os.freemem()+",Total Memory:"+os.totalmem()+",uptime:"+os.uptime()+"}";
   o++;
 }else{
   json+=",{Free memory:"+os.freemem()+",Total Memory:"+os.totalmem()+",uptime:"+os.uptime()+"}";
 };
/*   json+="Informacion CPUs: {";
   //codigo_html+="<ul><li><p><b>Free memory: </b>"+os.freemem()+"</p></li>";
   for(var i=0;i<cpu_info2.length;i++){
   if(i==cpu_info2.length-1){
json+="{'model':"+cpu_info2[i]["model"]+",'speed':"+cpu_info2[i]["speed"]+"'times':{'user':"+cpu_info2[i]["times"]["user"]+",'nice':"+cpu_info2[i]["times"]["nice"]+",'sys':"+cpu_info2[i]["times"]["sys"]+",'idle':"+cpu_info2[i]["times"]["idle"]+",'irq':"+cpu_info2[i]["times"]["irq"]+"}}},";

}else{
json+="{'model':"+cpu_info2[i]["model"]+",'speed':"+cpu_info2[i]["speed"]+"'times':{'user':"+cpu_info2[i]["times"]["user"]+",'nice':"+cpu_info2[i]["times"]["nice"]+",'sys':"+cpu_info2[i]["times"]["sys"]+",'idle':"+cpu_info2[i]["times"]["idle"]+",'irq':"+cpu_info2[i]["times"]["irq"]+"}},";
}*/
	antjson=antjson.replace("]}",json+"]}");
   //codigo_html+="<li><b>Modelo: </b>"+cpu_info2[i]["model"]+"</li><li><b>Speed: </b>"+cpu_info2[i]["speed"]+"</li><li><b>Tiempos: </b><br><ul><li><b>user: </b>"+cpu_info2[i]["times"]["user"]+"</li><li><b>nice: </b>"+cpu_info2[i]["times"]["nice"]+"</li><li><b>sys: </b>"+cpu_info2[i]["times"]["sys"]+"</li><li><b>idle: </b>"+cpu_info2[i]["times"]["idle"]+"</li><li><b>irq: </b>"+cpu_info2[i]["times"]["irq"]+"</li></ul></li><br>";
//}
  //codigo_html+="</li><li><p><b>Network Interface: </b></p><ul>";
  //recorro interface network
    //for(var hola in int_network2){
//	codigo_html+="<li><strong>"+hola+": </strong><ul>";
  //    for(var i=0;i<int_network2[hola].length;i++){
	//for(var hola2 in int_network2[hola][i]){
	//codigo_html+="<li><b>"+hola2+": </b>"+int_network2[hola][i][hola2]+"</li>";
//}
	
//}//codigo_html+="</ul></li>" 
  //  }
//codigo_html+="</ul></li></ul>";
fs.writeFileSync('informacion_s.html',antjson);
}

var mi_funcion= function(request, response){
  var fs = require('fs');
  /*var cpu_info =os.cpus();
  var int_network=os.networkInterfaces();
  console.log("hemos recibido algo");

  var codigo_html="<html><head></head><body>";
    codigo_html+="<ul><li><p><b>Sistema operativo: </b>"+os.type()+"</p></li><li><p><b>Plataforma: </b>"+os.platform()+"</p> </li><li><p><b>Host name: </b>"+os.hostname()+"</p></li><li><p><b>Arquitectura CPU OS: </b>"+os.arch()+"</p></li><li><p><b>Release del SO: </b>"+os.release()+"</p></li><li><p><b>Memoria total del sistema(Bytes): </b>"+os.totalmem()+"</p></li><li><p><b>Memoria libre del sistema(Bytes): </b>"+os.freemem()+"</p></li><li><p><b>Directorio archivos temporales: </b>"+os.tmpdir()+"</p></li><li><p><b>Host name: </b>"+os.hostname()+"</p></li><li><p><b>Endianness de la CPU: </b>"+os.endianness()+"</p></li><li><p><b>CPUs: </b></p>";
//recorro cpus_info
   for(var i=0;i<cpu_info.length;i++){
   codigo_html+="<li><b>Modelo: </b>"+cpu_info[i]["model"]+"</li><li><b>Speed: </b>"+cpu_info[i]["speed"]+"</li><li><b>Tiempos: </b><br><ul><li><b>user: </b>"+cpu_info[i]["times"]["user"]+"</li><li><b>nice: </b>"+cpu_info[i]["times"]["nice"]+"</li><li><b>sys: </b>"+cpu_info[i]["times"]["sys"]+"</li><li><b>idle: </b>"+cpu_info[i]["times"]["idle"]+"</li><li><b>irq: </b>"+cpu_info[i]["times"]["irq"]+"</li></ul></li><br>";
}
  codigo_html+="</li><li><p><b>Network Interface: </b></p><ul>";
  //recorro interface network
    for(var hola in int_network){
	codigo_html+="<li><strong>"+hola+": </strong><ul>";
      for(var i=0;i<int_network[hola].length;i++){
	for(var hola2 in int_network[hola][i]){
	codigo_html+="<li><b>"+hola2+": </b>"+int_network[hola][i][hola2]+"</li>";
}
	
}codigo_html+="</ul></li>" 
    }
  

	
  codigo_html+="</ul></li></ul><a href='informacion.html'>Informacion</a></body></html>";
  fs.writeFileSync('index.html',codigo_html);
  */
  //codigo_html+="</body></html>";
  
  var cad = fs.readFileSync('informacion_s.html','utf8');

  response.send(cad);

  
 
};

app.get('/', mi_funcion);
var port = process.env.PORT || 5190;
app.listen(port, function() {
  console.log("Listening on " + port);
});

