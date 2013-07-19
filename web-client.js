#!/usr/bin/env node
var xhr= new XMLHttpRequest();
xhr.open("GET","http://glacial-refuge-5887.herokuapp.com/json",async);

xhr.onload=function(){
	var parsed=JSON.parse(this.responseText);
	console.log(parsed["medidas"]);
}
xhr.send();
