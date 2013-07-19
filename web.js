#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());
var fs = require('fs');

var os = require('os');

//comprueba si es un numero
function esEntero(x){
	var y = parseInt(x);
	if (isNaN(y)) 
		return false;
	return x == y && x.toString() == y.toString();
};
function recorrerJSON(x, dato){
	var cadena="";
	for(var i=0;i<dato.length;i++){
		cadena+=dato['medidas'][i][x]+"\l";
	}

	return cadena;

};

//Cuidado con la hora en el json si no se pone como string(\"hora\"), ya que no es valido porque piensa que este separado.

function hora(){
	var fecha = new Date();
	var hora = fecha.getHours();
	var minuto = fecha.getMinutes();
	var segundo = fecha.getSeconds();
        var dia=fecha.getDate();
        var month=fecha.getMonth()+1;
        if (dia < 10) {dia ="0"+ dia}
        if (month < 10) {month ="0"+ month}
	if (hora < 10) {hora ="0"+ hora}
	if (minuto < 10) {minuto ="0"+ minuto}
	if (segundo < 10) {segundo ="0"+ segundo}
	var horita =  "\""+hora +":"+ minuto +":"+ segundo+"-"+dia+"/"+month+"/"+fecha.getFullYear()+"\"";
	
        return horita;
}
	var uptime = os.uptime();
	var totalmem = os.totalmem();
	var freemem = os.freemem();
	var cpus = os.cpus();
	var cpustring = "<cputimes>";
//Generando XML

	var cpuString2 = "<cputimes>";
	
	for(var i=0; i<cpus.length;i++){
	
		cpuString2 += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
	}
	cpuString2 += "</cputimes>";
	var string = "<?xml version=\"1.0\" standalone=\"yes\"?><medidas><medida><date>"+hora()+"</date><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString2+"</medida></medidas>";
//Generando JSON
	var antjson="{\"medidas\":[{\"date\":"+hora()+",\"freememory\":"+freemem+",\"totalmemory\":"+totalmem+",\"uptime\":"+uptime+",\"cputimes\":{";

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

var funcionJSON= function(request, response){
  var fs = require('fs');
  
  console.log("hemos recibido algo");
  
  var data1=fs.readFileSync('informacion.json','UTF-8');
  //Para las consultas en el JSON
  var parsed=JSON.parse(data1);
  
  response.set('Content-Type', 'application/json');

 
     if(esEntero(request.query.q)){
       switch (request.query.b) {
    case 'date':
       response.send(parsed['medidas'][request.query.q]['date']);
       break
    case 'freememory':
      response.send(""+parsed['medidas'][request.query.q]['freememory']);
       break
    case 'totalmemory':
       response.send(""+parsed['medidas'][request.query.q]['totalmemory']);
       break
    case 'uptime':
       response.send(""+parsed['medidas'][request.query.q]['uptime']);
       break
    case 'cputimes':
       response.send(parsed['medidas'][request.query.q]['cputimes']);
       break
    default:
       response.send(parsed['medidas'][request.query.q]);
       break;
    } 
       response.send(parsed['medidas'][request.query.q]['date']);
     }else{
	if(request.query.q==='todos'){
	 switch (request.query.b) {
	    case 'date':
	       var cadena="";
	for(var i=0;i<parsed.length;i++){
		cadena+=parsed['medidas'][i]['date']+"\l";
	}

	response.send( cadena);

	       break
	    case 'freememory':
	      response.send(recorrerJSON('freememory',parsed));
	       break
	    case 'totalmemory':
	       response.send(recorrerJSON('totalmemory',parsed));
	       break
	    case 'uptime':
	       response.send(recorrerJSON('uptime',parsed));
	       break
	    case 'cputimes':
	       response.send(recorrerJSON('cputimes',parsed));
	       break
	    default:
	       response.send("hola");
	       break
      } 
	}else{
           response.send(parsed['medidas']);
	}
     }
 


  //response.attachment('informacion.json');
 

 
 
};

var funcionXML = function(request, response) {
  

  console.log("hemos recibido algo");

  //Si quito 2º parámetro (encoding) al entrar en la web me deja descargar el xml perfect y si pongo  utf-8 no sale el texto como xml. Había que usar response.set()!!!!

  var data=fs.readFileSync('medidas.xml', 'UTF-8');
  response.set('Content-Type', 'text/xml');
  response.send(data); 

  //response.attachment('medidas.xml');
  
};

var funcionConsulta = function(request, response) {
  
 var fs = require('fs');
  
  console.log("hemos recibido algo");
  
  var data1=fs.readFileSync('informacion.json','UTF-8');
  //Para las consultas en el JSON
  var parsed=JSON.parse(data1);
  
  response.set('Content-Type', 'application/json');

  	if(esEntero(request.query.desde)&&esEntero(request.query.hasta)){
  		var cadenaJSON=[];
 		for(var i=request.query.desde;i<=request.query.hasta;i++){
     			cadenaJSON.push(parsed['medidas'][i]);
  		}
  		response.send(cadenaJSON);
  	}else{
    		response.send("Consulta no valida.");
  	}
  
  
};

var funcionConsultaFecha = function(request, response) {
  
 var fs = require('fs');
  
  console.log("hemos recibido algo");
  
  var data1=fs.readFileSync('informacion.json','UTF-8');
  //Para las consultas en el JSON
  var parsed=JSON.parse(data1);
  
  response.set('Content-Type', 'application/json');
  
  var encontrado="No existen coincidencias (formato de fechas: 10:14:23 -> 101423)";
     if(request.query.date===undefined){
      response.send("Es necesario indicar una fecha como parametro");
     }else{
      for(var i=0;i<parsed['medidas'].length;i++){
          var datecomp=parsed['medidas'][i]['date'].substring(0,2)+parsed['medidas'][i]['date'].substring(3,5)+parsed['medidas'][i]['date'].substring(6,8);
          if(request.query.date===datecomp){
   		encontrado=response.send(parsed['medidas'][i]);

          }
      }
     }
    response.send(encontrado);
  
};

var funcionConsultaFranja = function(request, response) {
  
 var fs = require('fs');
  
  console.log("hemos recibido algo");
  
  var data1=fs.readFileSync('informacion.json','UTF-8');
  //Para las consultas en el JSON
  var parsed=JSON.parse(data1);
  
  response.set('Content-Type', 'application/json');
  
  
  if(request.query.desde===undefined||request.query.hasta===undefined){
     response.send("Error hay que introducir parametros desde y hasta");
  }else{
       var resultado=[];
       for(var i=0;i<parsed['medidas'].length;i++){
          var datecomp=parsed['medidas'][i]['date'].substring(0,2)+parsed['medidas'][i]['date'].substring(3,5)+parsed['medidas'][i]['date'].substring(6,8);
          if(request.query.desde<=datecomp&&request.query.hasta>=datecomp){
   		resultado.push(parsed['medidas'][i]);

          }
     }
}
   if(resultado.length===0){
      resultado="No existen coincidencias (formato de fechas: 10:14:23 -> 101423)";
   }
   response.send(resultado);
  
};

app.get('/xml', funcionXML);
app.get('/json', funcionJSON);
app.get('/json/consulta',funcionConsulta);
app.get('/json/consultaFecha',funcionConsultaFecha);
app.get('/json/consultaFranja',funcionConsultaFranja);

var port = process.env.PORT || 5050;
app.listen(port, function() {
  console.log("Listening on " + port);
});

