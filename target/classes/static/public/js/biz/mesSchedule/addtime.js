var str = "";   
document.writeln("<div id=\"_contents\" style=\"padding:5px;background-color:#ECF7FE;font-size:12px;border:1px solid #CFD1D5;position:relative;left:170px; top:-60px; width:220px; height:20px;z-index:1;visibility:hidden\">");

str += "<select id=\"_hour\">";   
for (var h = 0; h <= 23; h++) {   
    if(h >=0 && h<=9)  
       str += "<option value=\"0" + h + "\">0" + h + "</option>";  
    else  
    	str += "<option value=\"" + h + "\">" + h + "</option>";   
}  

str += "</select>时 <select id=\"_minute\">";   
for (var m = 0; m <= 59; m++) {   
    if(m >=0 && m<=9)  
       str += "<option value=\"0" + m + "\">0" + m + "</option>";  
    else  
       str += "<option value=\"" + m + "\">" + m + "</option>";   
        
}  
str += "</select>分 <input type=\"button\" onclick=\"_select()\" value=\"\确定\" /> <input type=\"button\" onclick=\"_clear()\" value=\"\清除\" /></div>";   
document.writeln(str);  
  
var _fieldname;   
  
function _SetTime(tt) {   
    _fieldname = tt;   
    var ttop = tt.offsetTop;    //TT控件的定位点高   
	var thei = tt.clientHeight;    //TT控件本身的高   
	var tleft = tt.offsetLeft;    //TT控件的定位点宽   
	while (tt = tt.offsetParent) {   
	    ttop += tt.offsetTop;   
	    tleft += tt.offsetLeft;   
	}   
	document.all._contents.style.top = ttop + thei + 4;   
	document.all._contents.style.left = tleft;   
	document.all._contents.style.visibility = "visible";   
}   
  
function _select() {   
    _fieldname.value = document.all._hour.value+":"+ document.all._minute.value;   
    document.all._contents.style.visibility = "hidden";   
}  
  
function _clear() {   
    document.all._hour.value = document.all._minute.value = "00";  
    _fieldname.value = "";  
    document.all._contents.style.visibility = "hidden";  
    }  
  
	document.onclick = function(e){  
        e = window.event||e;  
        obj = e.srcElement ? e.srcElement : e.target;  
        if(obj.className != "time" && obj.id != "_contents" && obj.id != "_hour" && obj.id != "_minute" && obj.id != "_second"){  
        document.all._contents.style.visibility = "hidden";  
    }  
};
 