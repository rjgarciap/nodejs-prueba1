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

var int=setInterval(function(){jsonvar()},3000);
function jsonvar(){
 int_network2=os.networkInterfaces();
   json+=",{\"Freememory\":"+os.freemem()+",\"TotalMemory\":"+os.totalmem()+",\"uptime\":"+os.uptime()+",\"cputimes\":{";
 
   for(var i=0;i<cpu_info2.length;i++){
if(i===cpu_info2.length-1){   
json+="\"user\":"+cpu_info2[i]["times"]["user"]+",\"nice\":"+cpu_info2[i]["times"]["nice"]+",\"sys\":"+cpu_info2[i]["times"]["sys"]+",\"idle\":"+cpu_info2[i]["times"]["idle"]+",\"irq\":"+cpu_info2[i]["times"]["irq"]+"}}";
}else{   
json+="\"user\":"+cpu_info2[i]["times"]["user"]+",\"nice\":"+cpu_info2[i]["times"]["nice"]+",\"sys\":"+cpu_info2[i]["times"]["sys"]+",\"idle\":"+cpu_info2[i]["times"]["idle"]+",\"irq\":"+cpu_info2[i]["times"]["irq"]+",";
}

};
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

app.get('/json', mi_funcion);

var port = process.env.PORT || 5190;
app.listen(port, function() {
  console.log("Listening on " + port);
});

