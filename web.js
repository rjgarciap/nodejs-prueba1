#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());
var fs = require('fs');

var os = require('os');

var cpu_info2=os.cpus();
var int_network2;

var antjson="{\"medidas\":[{\"Freememory\":"+os.freemem()+",\"TotalMemory\":"+os.totalmem()+",\"uptime\":"+os.uptime()+",\"cputimes\":{";

for(var i=0;i<cpu_info2.length;i++){
if(i===cpu_info2.length-1){
antjson+="\"user\":"+cpu_info2[i]["times"]["user"]+",\"nice\":"+cpu_info2[i]["times"]["nice"]+",\"sys\":"+cpu_info2[i]["times"]["sys"]+",\"idle\":"+cpu_info2[i]["times"]["idle"]+",\"irq\":"+cpu_info2[i]["times"]["irq"];
}else{   
antjson+="\"user\":"+cpu_info2[i]["times"]["user"]+",\"nice\":"+cpu_info2[i]["times"]["nice"]+",\"sys\":"+cpu_info2[i]["times"]["sys"]+",\"idle\":"+cpu_info2[i]["times"]["idle"]+",\"irq\":"+cpu_info2[i]["times"]["irq"]+",";
}
};
antjson+="}}]}"
var json="";
console.log("iniciando la aplicacion");
//XML
var string = "<?xml version=\"1.0\" standalone=\"yes\"?><medidas></medidas>"

var int=setInterval(function(){jsonvar()},3000);
function jsonvar(){
//JSON

 int_network2=os.networkInterfaces();
   json+=",{\"Freememory\":"+os.freemem()+",\"TotalMemory\":"+os.totalmem()+",\"uptime\":"+os.uptime()+",\"cputimes\":{";
 
   for(var i=0;i<cpu_info2.length;i++){
if(i===cpu_info2.length-1){   
json+="\"user\":"+cpu_info2[i]["times"]["user"]+",\"nice\":"+cpu_info2[i]["times"]["nice"]+",\"sys\":"+cpu_info2[i]["times"]["sys"]+",\"idle\":"+cpu_info2[i]["times"]["idle"]+",\"irq\":"+cpu_info2[i]["times"]["irq"]+"}}";
}else{   
json+="\"user\":"+cpu_info2[i]["times"]["user"]+",\"nice\":"+cpu_info2[i]["times"]["nice"]+",\"sys\":"+cpu_info2[i]["times"]["sys"]+",\"idle\":"+cpu_info2[i]["times"]["idle"]+",\"irq\":"+cpu_info2[i]["times"]["irq"]+",";
}




};
//XML


	var uptime = os.uptime();
	var totalmem = os.totalmem();
	var freemem = os.freemem();
	var cpus = os.cpus();
	var cpuString = "<cputimes>";
	
	for(var i=0; i<cpus.length;i++){
	
	cpuString += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
}
	cpuString += "</cputimes>";	

	var stringNew = string.replace("</medidas>","<medida><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString+"</medida></medidas>");
	
	string=stringNew;
	fs.writeFileSync('medidas.xml',stringNew);
	antjson=antjson.replace("]}",json+"]}");

fs.writeFileSync('informacion.json',antjson);
}

var mi_funcion= function(request, response){
  var fs = require('fs');
  
  console.log("hemos recibido algo");

  var cad = fs.readFileSync('informacion.json','UTF-8');
  response.set('Content-Type','application/json');
  //response.attachment('informacion.json');
  response.send(cad);

 
 
};

//Para el xml






var miFuncion2 = function(request, response) {
  

  console.log("hemos recibido algo");

  //Si quito 2º parámetro (encoding) al entrar en la web me deja descargar el xml perfect y si pongo  utf-8 no sale el texto como xml. Había que usar response.set()!!!!

  fs.readFile('medidas.xml', function (err, data) {
  if (err) throw err;
  response.set('Content-Type', 'text/xml');
  response.send(data); 
  });

  //response.attachment('medidas.xml');
  
};


app.get('/json', mi_funcion);
app.get('/xml', miFuncion2);

var port = process.env.PORT || 5190;
app.listen(port, function() {
  console.log("Listening on " + port);
});

