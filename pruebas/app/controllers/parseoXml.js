// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.parseoXml.open();

/*function estatusDenuncia(){
	var xhrCGCDMX = Ti.Network.createHTTPClient();
	
	var requestSOAP = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\"> \n" +
					  "<soapenv:Header/>\n" +
						   "<soapenv:Body>\n" +
						      "<tem:get_obras_app>\n" +
						         "<tem:token>de54953c71a57e47f791adea42922468</tem:token>\n" +
						         "<tem:anio>2017</tem:anio>\n" +
						      "</tem:get_obras_app>\n" +
						   "</soapenv:Body>\n" +
						"</soapenv:Envelope>";
	
	xhrCGCDMX.onload = function() {
		var xml = this.responseText;
		//console.log("this.responseText :::::::::: " + this.responseText);
		var localidades = buscarLocalizacion(xml);
		//Ti.API.info(JSON.stringify(localidades));
		Ti.API.info("**************************");
	};
	xhrCGCDMX.onerror = function() {
		alert('error xhrKEY ' + this.status);
	};
	xhrCGCDMX.open('POST', 'http://10.10.200.10/wcf_app_obras/WSAppObras.svc');
	xhrCGCDMX.setRequestHeader("Content-Type","text/xml");
	xhrCGCDMX.setRequestHeader('SOAPAction', "http://tempuri.org/IWSAppObras/get_obras_app");
	xhrCGCDMX.setRequestHeader("Cache-Control", "no-cache");
	xhrCGCDMX.send(requestSOAP);
	
	Ti.API.info('<----------------------->');
}

function buscarLocalizacion(doc){
		var xml = Ti.XML.parseString(doc);
		var nodeList = xml.documentElement.getElementsByTagName("a:Obras");
		var localizaciones = [];
		for (var i = 0; i < nodeList.length; i++) {
		    localizaciones.push({
		    	localizacion : nodeList.item(i).getElementsByTagName("a:localizacion").item(0).textContent
		    });
		};
		return localizaciones;
}*/


function estatusDenuncia(){
  var xhrCGCDMX = Ti.Network.createHTTPClient();
  
  var requestSOAP ="<soapenv:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:denunciawsdl2\"> \n"+
	               "<soapenv:Header/> \n"+
	               "<soapenv:Body> \n"+
	                  "<urn:consultaStatusDenuncia soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"> \n"+
	                     "<denuncia xsi:type=\"urn:consulta\"> \n"+
	                        "<folio xsi:type=\"xsd:string\">SIDEC17111599DC</folio> \n"+
	                        "<folio xsi:type=\"xsd:string\">SIDEC1801108CM</folio> \n"+
	                        //"<folio xsi:type=\"xsd:string\">SIDEC18011389CM</folio> \n"+
	                        //"<folio xsi:type=\"xsd:string\">SIDEC18011381CM</folio> \n"+
	                     "</denuncia> \n"+
	                  "</urn:consultaStatusDenuncia> \n"+
	               "</soapenv:Body> \n"+
	            "</soapenv:Envelope>";
  
  xhrCGCDMX.onload = function() {
    var resp = this.responseText;
    //console.log("this.responseText :::::::::: " + this.responseText);
    var respuesta = buscarItem(resp);
    //Ti.API.info(respuesta);
    Ti.API.info("**********************");
    Ti.API.info(JSON.stringify(respuesta));
  };
  xhrCGCDMX.onerror = function() {
    alert('error xhrKEY ' + this.status);
  };
  xhrCGCDMX.open('POST', 'http://www3.contraloriadf.gob.mx/sidec/WS_Sidec/service.php');
  xhrCGCDMX.setRequestHeader("Content-Type","text/xml");
  xhrCGCDMX.setRequestHeader("Cache-Control", "no-cache");
  xhrCGCDMX.send(requestSOAP);
  
  Ti.API.info('<----------------------->');
}

function buscarItem(doc){
    var xml = Ti.XML.parseString(doc);
    
    var nodeList = xml.documentElement.getElementsByTagName("item");
    var statusTotal = [];
    var guardar = agregar(xml);
    for (var i = 0; i < nodeList.length; i++) {
    		if(nodeList.item(0).getElementsByTagName("folio").item(0).textContent == nodeList.item(i).getElementsByTagName("folio").item(0).textContent){
    			statusTotal.push({
		    		foilio:"sidec",
			        Sidecs: guardar
		    	});
    		}else{
    			
    		}
    	
    };
    return statusTotal;
}
function agregar(xml){
	var nodeList = xml.documentElement.getElementsByTagName("item");
    var sidecs = []; 
    for (var i = 1; i < nodeList.length; i++) {
    		sidecs.push({
		        SIDEC: nodeList.item(i).getElementsByTagName("folio").item(0).textContent,
		        Status: nodeList.item(i).getElementsByTagName("status_proceso").item(0).textContent,
		        NombreContraliria: nodeList.item(i).getElementsByTagName("nombre_contraloria_int").item(0).textContent,
		        Comentarios: nodeList.item(i).getElementsByTagName("comentarios").item(0).textContent,
		        Improcedencia: nodeList.item(i).getElementsByTagName("nombre_improcedencia").item(0).textContent
	    	});
    };
    return sidecs;
}