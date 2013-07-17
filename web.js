#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());
var fs = require('fs');

var os = require('os');


	var startTime = new Date();
	var hora = fecha.getHours();
	var minuto = fecha.getMinutes();
	var segundo = fecha.getSeconds();
	var uptime = os.uptime();
	var totalmem = os.totalmem();
	var freemem = os.freemem();
	var cpus = os.cpus();
	var cpuString = "<cputimes>";
//XML


var cpuString2 = "<cputimes>";
	
	for(var i=0; i<cpus.length;i++){
	
	cpuString2 += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
}
cpuString2 += "</cputimes>";
var string = "<?xml version=\"1.0\" standalone=\"yes\"?><medidas><medida><date>"+hora+""+minuto+""+segundo+"</date><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString2+"</medida></medidas>";
//JSON
var antjson="{\"medidas\":[{\"Freememory\":"+freemem+",\"TotalMemory\":"+totalmem+",\"uptime\":"+uptime+",\"cputimes\":{";

for(var i=0;i<cpus.length;i++){
if(i===cpus.length-1){
antjson+="\"user\":"+cpus[i]["times"]["user"]+",\"nice\":"+cpus[i]["times"]["nice"]+",\"sys\":"+cpus[i]["times"]["sys"]+",\"idle\":"+cpus[i]["times"]["idle"]+",\"irq\":"+cpus[i]["times"]["irq"];
}else{   
antjson+="\"user\":"+cpus[i]["times"]["user"]+",\"nice\":"+cpus[i]["times"]["nice"]+",\"sys\":"+cpus[i]["times"]["sys"]+",\"idle\":"+cpus[i]["times"]["idle"]+",\"irq\":"+cpus[i]["times"]["irq"]+",";
}
};
antjson+="}}]}"
var json="";
console.log("iniciando la aplicacion");

//repeticion
var int=setInterval(function(){json_xml_var()},3000);
function json_xml_var(){
 int_network2=os.networkInterfaces();
   json+=",{\"Freememory\":"+freemem+",\"TotalMemory\":"+totalmem+",\"uptime\":"+uptime+",\"cputimes\":{";
 
   for(var i=0;i<cpus.length;i++){
if(i===cpus.length-1){   
json+="\"user\":"+cpus[i]["times"]["user"]+",\"nice\":"+cpus[i]["times"]["nice"]+",\"sys\":"+cpus[i]["times"]["sys"]+",\"idle\":"+cpus[i]["times"]["idle"]+",\"irq\":"+cpus[i]["times"]["irq"]+"}}";
}else{   
json+="\"user\":"+cpus[i]["times"]["user"]+",\"nice\":"+cpus[i]["times"]["nice"]+",\"sys\":"+cpus[i]["times"]["sys"]+",\"idle\":"+cpus[i]["times"]["idle"]+",\"irq\":"+cpus[i]["times"]["irq"]+",";
}

}
	antjson=antjson.replace("]}",json+"]}");

//XML

	var cpuString = "<cputimes>";
	
	for(var i=0; i<cpus.length;i++){
	
	cpuString += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
}
	cpuString += "</cputimes>";	

	var stringNew = string.replace("</medidas>","<medida><date>"+hora+""+minuto+""+segundo+"</date><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString+"</medida></medidas>");
	
	string=stringNew;
	fs.writeFileSync('medidas.xml',stringNew);
        fs.writeFileSync('informacion.json',antjson);
};

var mi_funcion= function(request, response){
  var fs = require('fs');
  
  console.log("hemos recibido algo");
  
  var data1=fs.readFileSync('informacion.json','UTF-8');
  response.set('Content-Type', 'application/json');
  response.send(data1); 


  //response.attachment('informacion.json');
 

 
 
};

var mi_funcion2 = function(request, response) {
  

  console.log("hemos recibido algo");

  //Si quito 2º parámetro (encoding) al entrar en la web me deja descargar el xml perfect y si pongo  utf-8 no sale el texto como xml. Había que usar response.set()!!!!

  var data=fs.readFileSync('medidas.xml', 'UTF-8');
  response.set('Content-Type', 'text/xml');
  response.send(data); 

  //response.attachment('medidas.xml');
  
};

app.get('/xml', mi_funcion2);
app.get('/json', mi_funcion);


var port = process.env.PORT || 5190;
app.listen(port, function() {
  console.log("Listening on " + port);
});

