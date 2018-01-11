$.ventanaPruebas.open();

//efecto en el reloj
function startTime(){
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    hr = checkTime(hr);
    min = checkTime(min);
    $.label.text = hr+":"+min;
    var liga = $.label.getText();
	var attr = Ti.UI.createAttributedString({
	    text: liga,
	    attributes: [
	        {
	            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            	value: "white",
	            range: [2, 1]
	        }  
	    ]
	});
	$.label.attributedString = attr;
    setTimeout(changeText, 1000);
}
function changeText(){
	var liga = $.label.getText();
	var attr = Ti.UI.createAttributedString({
	    text: liga,
	    attributes: [
	        {
	            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            	value: "black",//#B40F70
	            range: [2, 1]
	        }  
	    ]
	});
	$.label.attributedString = attr;
	setTimeout(startTime, 1000);	
}
function checkTime(i){
    if (i < 10) {
    	i = "0"+i;
    };
    return i;
}
startTime();

//parseo de un XML
function openWindowParseoXml(e){
	Alloy.createController('parseoXml');
}

//formula de Haversine (distancia entre dos puntos)
function openWindowHaversine(e){
	var mapa = Alloy.createController('mapaHaversine').getView();
	mapa.open();
}
