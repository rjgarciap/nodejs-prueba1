#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());
var fs = require('fs');

var os = require('os');


function hora(){
	var fecha = new Date();
	var hora = fecha.getHours();
	var minuto = fecha.getMinutes();
	var segundo = fecha.getSeconds();
	if (hora < 10) {hora ="0"+ hora}
	if (minuto < 10) {minuto ="0"+ minuto}
	if (segundo < 10) {segundo ="0"+ segundo}
	var horita = hora +"º"+ minuto +"'"+ segundo+"''";
	
        return horita;
}
	var uptime = os.uptime();
	var totalmem = os.totalmem();
	var freemem = os.freemem();
	var cpus = os.cpus();
	var cpustring = "<cputimes>";
//XML

var cpuString2 = "<cputimes>";
	
	for(var i=0; i<cpus.length;i++){
	
	cpuString2 += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
}
cpuString2 += "</cputimes>";
var string = "<?xml version=\"1.0\" standalone=\"yes\"?><medidas><medida><date>"+hora()+"</date><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString2+"</medida></medidas>";
//JSON
var antjson="{\"medidas\":[{\"date\":"+hora()+",\"freememory\":"+freemem+",\"totalMemory\":"+totalmem+",\"uptime\":"+uptime+",\"cputimes\":{";

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
var fecha2 = new Date();
function json_xml_var(){
        var uptime2 = os.uptime();
	var totalmem2 = os.totalmem();
	var freemem2 = os.freemem();
	var cpus2 = os.cpus();



   json+=",{\"date\":"+hora()+",\"freememory\":"+freemem2+",\"totalmemory\":"+totalmem+",\"uptime\":"+uptime2+",\"cputimes\":{";
 
   for(var i=0;i<cpus2.length;i++){
if(i===cpus2.length-1){   
json+="\"user\":"+cpus2[i]["times"]["user"]+",\"nice\":"+cpus2[i]["times"]["nice"]+",\"sys\":"+cpus2[i]["times"]["sys"]+",\"idle\":"+cpus2[i]["times"]["idle"]+",\"irq\":"+cpus2[i]["times"]["irq"]+"}}";
}else{   
json+="\"user\":"+cpus2[i]["times"]["user"]+",\"nice\":"+cpus2[i]["times"]["nice"]+",\"sys\":"+cpus2[i]["times"]["sys"]+",\"idle\":"+cpus2[i]["times"]["idle"]+",\"irq\":"+cpus2[i]["times"]["irq"]+",";
}

}
        var newjson=antjson.replace("]}",json+"]}");	
	//antjson=antjson.replace("]}",json+"]}");

//XML

	var cpustring = "<cputimes>";
	
	for(var i=0; i<cpus2.length;i++){
	
	cpustring += "<user>"+cpus2[i]["times"]["user"]+"</user><nice>"+cpus2[i]["times"]["nice"]+"</nice><sys>"+cpus2[i]["times"]["sys"]+"</sys><idle>"+cpus2[i]["times"]["idle"]+"</idle><irq>"+cpus2[i]["times"]["irq"]+"</irq>";   
  
}
	cpustring += "</cputimes>";	

	var stringNew = string.replace("</medidas>","<medida><date>"+hora()+"</date><uptime>"+uptime2+"</uptime><totalmem>"+totalmem2+"</totalmem><freemem>"+freemem2+"</freemem>"+cpustring+"</medida></medidas>");

	string=stringNew;
	fs.writeFileSync('medidas.xml',stringNew);
        fs.writeFileSync('informacion.json',newjson);
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


var port = process.env.PORT || 5050;
app.listen(port, function() {
  console.log("Listening on " + port);
});

