var url = 'https://us-central1-oloappi.cloudfunctions.net/user';
var arrAzioni, arrCodAzioni;
var arrGiocatori;
var arrPunteggiTotali;
//////var punteggi1,punteggi2,punteggi3,punteggi4
var punteggi = [];
var arrTotaliSquadra =[];
var azioni;
var finito;
var arrGetGiocatori;
var oAzioni;

$(document).ready(function(){
	arrGiocatori=[];
	arrPunteggiTotali=[];
	if(localStorage["PAGINA"]!= undefined){
		CambiaPagina(localStorage["PAGINA"]);
	}else{
		CambiaPagina('C');
	}
	/*
	getGiocatori();		
	getPunteggi(1);
	getPunteggi(2);
	getPunteggi(3);
	getPunteggi(4);
	getAzioni();
	*/
	getDati();		
}); 

function getDati(){
	$.ajax({  
	"Access-Control-Allow-Origin": "*",
		"Referrer Policy": "strict-origin-when-cross-origin",
		"url": "https://us-central1-oloappi.cloudfunctions.net/user/GetDatiTutti",   
		"method": "GET",
		"crossDomain": false,
		"dataType":"text",	
		"async" : false,			
		success: function (output)  
		{								
			let o = JSON.parse(output);
			//1 Azioni
			azioni = o.AZIONI;
			arrAzioni=[];
			arrCodAzioni=[];				 
			for(let k = 0; k < azioni.length; ++k){			 
				if(azioni[k].valore > 0){
					let kk = k+1;					
					let y = '[(' + azioni[k].id + ') ' + azioni[k].valore + 'pt.] ' + azioni[k].descrizione;
					arrAzioni.push(y);					
					arrCodAzioni.push(azioni[k].id)
				}				
			}
			
			//2 USERS			
			for(let k = 0; k < o.USERS.length; ++k){
				let y = o.USERS[k].nome
				arrGiocatori.push(y);	
			}
			arrGetGiocatori = o.USERS;		
			popolaClassifica(arrGetGiocatori);
			
			//PUNTEGGI
			punteggi[0] = o.PUNTEGGI1;
			punteggi[1] = o.PUNTEGGI2;
			punteggi[2] = o.PUNTEGGI3;
			punteggi[3] = o.PUNTEGGI4;
			
			//Popola PAGINA
			GetPunteggioGiocatore();				
			BindCMB('cmbPlayer', arrGiocatori, []);
			BindCMB('cmbAzione', arrAzioni, arrCodAzioni);	
			SetPunti();				
			HideLoading(); 
		} ,
		 error: function(output) 
		 {					 
			console.log("Error in API GetDati call:" + output);
			alert("Error in API GetDati call:" + output);
			HideLoading();
		 }
			
	}); 
	
}

 function BindCMB(cmb, arrayDesc, arrValore = []){
	 try{
		 $("#" + cmb).html('');
		 $("#" + cmb).append($("<option style='font-weight: bold;'></option>").val('').html(''));
				
		if (arrValore.length==0)
		{			
			arrayDesc.forEach(Nome => $("#" + cmb).append($("<option style='font-weight: bold;'></option>").val(Nome).html(Nome)));					 
		}else{
			for (let i = 0; i< arrayDesc.length; ++i){				
				$("#" + cmb).append($("<option style='font-weight: bold;'></option>").val(arrValore[i]).html(arrayDesc[i]))				
			}
			/*let i = 0;			
			arrayDesc.forEach(Nome => $("#" + cmb).append($("<option style='font-weight: bold;'></option>").val('').html(Nome)));
			arrValore.forEach(Valore => $("#" + cmb).append($("<option style='font-weight: bold;'></option>").val(Nome)));*/
		}		 
				
	 }catch(exc){
		 console.log(ex)
	 } 
 }
	
function getAzioni(){
	$.ajax({  
	"Access-Control-Allow-Origin": "*",
		"Referrer Policy": "strict-origin-when-cross-origin",
		"url": "https://us-central1-oloappi.cloudfunctions.net/user/GetDati/azioni",   
		"method": "GET",
		"crossDomain": false,
		"dataType":"text",	
		"async" : false,			
		success: function (output)  
		{								
			azioni = JSON.parse(output);
						//;	
			arrAzioni=[];
			arrCodAzioni=[];	
			 
			for(let k = 0; k < azioni.length; ++k){
			 
				if(azioni[k].valore > 0){
					let kk = k+1;
					
					let y = '[(' + azioni[k].id + ') ' + azioni[k].valore + 'pt.] ' + azioni[k].descrizione;
					arrAzioni.push(y);
					
					arrCodAzioni.push(azioni[k].id)
				}
				
			}
		} ,
		 error: function(output) 
		 {					 
			console.log("Error in API getAzioni call:" + output);
			alert("Error in API getAzioni call:" + output);
		 }
			
	}); 
	
}
	
function getPunteggi(giorno){
	$.ajax({  
	"Access-Control-Allow-Origin": "*",
		"Referrer Policy": "strict-origin-when-cross-origin",
		"url": "https://us-central1-oloappi.cloudfunctions.net/user/GetDati/punteggi_" + giorno,   
		"method": "GET",
		"crossDomain": false,
		"dataType":"text",	
		"async" : false,			
		success: function (output)  
		{								
			punteggi[giorno -1] = JSON.parse(output);
		} ,
		 error: function(output) 
		 {					 
			console.log("Error in API getPunteggi_" + giorno + " call:" + output);
			alert("Error in API getAzioni_" + giorno + " call:" + output);
		 }
			
	}); 
	
}	
 
function getGiocatori(){		
	$.ajax({  
	"Access-Control-Allow-Origin": "*",
		"Referrer Policy": "strict-origin-when-cross-origin",
		"url": "https://us-central1-oloappi.cloudfunctions.net/user/GetDati/users",   		
		"method": "GET",
		"crossDomain": false,
		"dataType":"text",	
		"async" : false,			
		success: function (output )  
		{							  													 
			let ret = JSON.parse(output)
			for(let k = 0; k < ret.length; ++k){
				let y = ret[k].nome
				arrGiocatori.push(y);	
			}
			arrGetGiocatori = ret;		
			popolaClassifica(arrGetGiocatori);
		} ,
		 error: function(output) 
		 {					
			console.log("Error in API getGiocatori call:" + output);
			alert("Error in API getGiocatori call:" + output);
		 }
			
	}); 	 
 }
 
function popolaClassifica(arr){
	let sHTML = '';	 
	sHTML += `<div class='col-xs-12' style='margin-bottom: 10px; font-size: 16px;'></div>`
	for (let i = 0; i< arr.length; ++i){		
		let index = [arrGiocatori.indexOf(arr[i].squadra.draft_1), arrGiocatori.indexOf(arr[i].squadra.draft_2), arrGiocatori.indexOf(arr[i].squadra.draft_3)];
				 
		sHTML += `
		<div class='col-xs-6 Giocatore ${arr[i].nome}'>
			<div class='col-xs-12 squadra sfondo${arr[i].nome}' style='border: solid 1px #ffa500; border-radius:10px; padding:5px;margin-bottom:10px;'>
				<b style='margin-left: 5px;'>${SpezzaCaMel(arr[i].nome)}</b>&nbsp;
				<i class='hidden'>${arr[i].id}</i>
				<i class="fa-solid fa-trophy coppa coppa${arr[i].nome}" style="display:none;"></i>
				<ul>
					<li>${arr[i].squadra.draft_1} <i class='TotPlayer${index[0]}'></i> </li>
					<li>${arr[i].squadra.draft_2} <i class='TotPlayer${index[1]}'></i> </li>
					<li>${arr[i].squadra.draft_3} <i class='TotPlayer${index[2]}'></i> </li>
				</ul>
				<div class='col-xs-12' style='text-align:right'>&nbsp;<b class='TotaleSquadra${i}'></b>&nbsp;punti</div>				
			</div>				
		</div>`	
	}
 
	$('#divGiovatori').html(sHTML);
 
 }
 
 function SetPunti(){
	 let arr = arrGetGiocatori;
	 arrTotaliSquadra=[];
	 for(let i = 0; i< arrGiocatori.length; ++i){
		let index = [arrGiocatori.indexOf(arr[i].squadra.draft_1), arrGiocatori.indexOf(arr[i].squadra.draft_2), arrGiocatori.indexOf(arr[i].squadra.draft_3)];
		let totali = [arrPunteggiTotali[index[0]], arrPunteggiTotali[index[1]], arrPunteggiTotali[index[2]]];	
		 for(k =0; k<=2; ++k){
			 
			 if(totali[k] === undefined){totali[k] = 0;}
		 }
		 $('.TotPlayer' + index[0]).html(totali[0]);
		 $('.TotPlayer' + index[1]).html(totali[1]);
		 $('.TotPlayer' + index[2]).html(totali[2]);
		 let t = parseInt(totali[0]) + parseInt(totali[1]) + parseInt(totali[2]);
		 $('.TotaleSquadra' + i).html(t);		 
		 arrTotaliSquadra.push(t)
	 }
	 
	 	 
	 let w = [...arrTotaliSquadra];//copio l'array
	  w.forEach((element, index) => {
	  puntiPlayer = arrPunteggiTotali[index];		
		//console.log(parseFloat(w[index]) + (parseFloat(puntiPlayer))/1000)
		w[index] = parseFloat(w[index]) + (parseFloat(puntiPlayer))/1000;
	  })
	 let q = [...w]
	 //array con il punteggio della prima, seconda e terza squadra
	 b = sort_unique(w).sort(function(a, b){return b-a})
	 b.length = 3;
	 q.forEach((element, index) => {		
		 player = arrGetGiocatori[index].id;
		 puntiPlayer = arrPunteggiTotali[index];		
		if(parseFloat(element) == parseFloat(b[0])){		
			
			$('.coppa' + player).css('color', '#FFD700').css('display', '')
			
		} 
		else if(parseFloat(element) == parseFloat(b[1])){
			 
			$('.coppa' + player).css('color', '#C0C0C0').css('display', '')
			
		} 
		else if(parseFloat(element) == parseFloat(b[2])){
			 
			$('.coppa' + player).css('color', '#CD7f32').css('display', '')
			
		} 
	 })
	 
 }
 
 function CambiaPagina(p){
	 localStorage["PAGINA"] = p;
	 switch(p){
		 case "C":
			$('.ElencoPunteggi').css('display', 'none');
			$('.ElencoGiocatori').css('display', '');
			$('.AssegnaPunti').css('display', 'none');
			break;		 
		 case "P":
			$('.ElencoPunteggi').css('display', '');
			$('.AssegnaPunti').css('display', 'none');
			$('.ElencoGiocatori').css('display', 'none');
			break;	
		case "A":
			$('.AssegnaPunti').css('display', '');
			$('.ElencoPunteggi').css('display', 'none');
			$('.ElencoGiocatori').css('display', 'none');
			break;				
	 }
	 
 }
  
 function GetPunteggioGiocatore(){
	 /*let punteggi1 = punteggi[0];
	 let punteggi2 = punteggi[1];
	 let punteggi3 = punteggi[2];
	 let punteggi4 = punteggi[3];*/
	
	 let sHTML = ''; 
	 let sNone = ''
	 for (i = 0; i < arrGiocatori.length; ++i){
	 	sHTML += creaHTMLgiocatore(punteggi[0],punteggi[1],punteggi[2],punteggi[3], arrGiocatori[i], sNone);
		sNone = 'display:none;'
	 }
	 $('#divPuntiGiocatore').html(sHTML);
 }
 
 function creaHTMLgiocatore(giorno1,giorno2,giorno3, giorno4, player,sNone){
	let index = arrGiocatori.indexOf(player);
	let p1 = giorno1[index];	
	let p2 = giorno2[index];	
	let p3 = giorno3[index];	
	let p4 = giorno4[index];	
	let n = Object.keys(p1).length/2; 
	let sHTML = '';
	let tot = 0;
	
	sHTML +='<div id="div' + player + '" style="' + sNone + '">'
	sHTML +='<div class="col-xs-12">'
	let w = "'" + player + "'"
	sHTML +='<div class="col-xs-2"></div><div class="col-xs-2"><span class="glyphicon glyphicon-arrow-left freccia ' +player +'" onclick="Freccia(-1,' + w + ')"></span></div>'
	sHTML +='<div class="col-xs-4" style="padding: 0;text-align: center;"><b style="font-size:20px; margin-top: -5px">' + SpezzaCaMel(player) + '</b></div>'
	sHTML +='<div class="col-xs-2"><span class="glyphicon glyphicon-arrow-right freccia"  onclick="Freccia(+1,' + w + ')"></span></div><div class="col-xs-2"></div>'
	sHTML +='</div>'
	sHTML +='<div class="col-xs-12">'
	sHTML +='<table style="width:100%">'
	sHTML +='<tr>'
	sHTML +='<th>AZIONE</th>'
	sHTML +='<th class="text-center">PUNTI</th>	'		
	sHTML +='</tr>'	
	for (let i = 1; i<= azioni.length -1 ; ++i){ //-1 perchè escludo AZ29 da agg a db
	 
		let objAzione = getObjAzione(i-1);
		let descrizione = objAzione.descrizione;  //getDescAzione(i-1); 
		if (descrizione != ''){
			let punteggio = 'AZ' +i;
			let moltiplicatore =  parseInt(objAzione.valore);
			 		
			let somma =  (parseInt(p1[punteggio])+parseInt(p2[punteggio])+parseInt(p3[punteggio])+parseInt(p4[punteggio]))*moltiplicatore;			
			tot+=somma;
			
			sHTML +='<tr style="border-bottom: 1px solid rgba(231, 216, 216, 0.44); line-height: 25px;">'
			sHTML +='<td>[' + punteggio + '] ' + descrizione + '</td>'
			sHTML +='<td class="text-center">' + somma + '</td>'
			sHTML +='</tr>'	
		}		
	}
	
	sHTML +='</table>'	
	sHTML += '<div class="col-xs-11" style="text-align: right; margin-top: 15px;">'
	sHTML += '<b>Tot.</b>&nbsp;' + tot +' punti'
	sHTML += '</div>'	
	sHTML +='</div>'
	sHTML +='</div>' //chiudo il divGiocatore
 
	//let indexPlayer = arrGiocatori.indexOf(player)
	if (tot >= 0){
		arrPunteggiTotali[index] = tot;
	}else{
		arrPunteggiTotali[index] = 0;
	}
	
	return sHTML;
 }
 
 function Freccia(i, currentPlayerName){
  
	 let currentIndex = arrGiocatori.indexOf(currentPlayerName);
	 let n = arrGiocatori.length;
	 let next = (parseInt(currentIndex) + parseInt(i) + n) % n;
	  
	 let nextPlayerName = arrGiocatori[next];
	 //nascondo il corrente e mostroil prossimo
	 $('#div' + currentPlayerName).css('display', 'none');
	 $('#div' + nextPlayerName).css('display', '');
 }
 
 function SetPunteggio(k){
	 if($('#cmbPlayer').val()=='' || $('#cmbAzione').val()==''){
		alert('compilare i campi')
	 }else{
		
	$('.ok').fadeOut();
	 $('.no').fadeOut();
	  
	 let index = arrGiocatori.indexOf($('#cmbPlayer').val());
	 jsonData = punteggi[$('#cmbGiorno').val()][index];
	 let CodiceAzione = $('#cmbAzione').val();
	 let newValore = parseInt(jsonData[CodiceAzione]) + k ;
	  //passo solo un json con quello che aggiorno
	 //let Data = '{' + CodiceAzione + ':"' + newValore + '"}'	 	non devo passarli in formato stringa!
	 let Json_Data = {};
	 Json_Data[CodiceAzione] = newValore;
	 let giorno = parseInt($('#cmbGiorno').val()) + 1;
	 let url = "https://us-central1-oloappi.cloudfunctions.net/user/SalvaDati/punteggi_" + giorno + "-" + $('#cmbPlayer').val();
	// console.log(url)
	 
	 $.ajax({  
		"Access-Control-Allow-Origin": "*",
		"Referrer Policy": "strict-origin-when-cross-origin",
		"url": url,
		"method": "PUT",
		"crossDomain": false,		 		 
		"data": Json_Data,		
		success: function (output)  
		{	
			if(k==1){
				$('.ok').fadeIn();
			}else{
				$('.no').fadeIn();
			}		
			
			Aggiorna();
		} ,
		 error: function(output) 
		 {					 
			console.log("Error in API SetPunteggio call:" + output.statusText);
			alert("Error in API SetPunteggio call:" + output);
		 }
			
	}); 
	 }	 
 }
 
 function getObjAzione(i){	
	 let j = i+1;
	 for (k =0; k<= azioni.length - 1;++k){		
		 if(azioni[k].id == 'AZ' + j) {			
			 return azioni[k];	
		 }	 
	 }	 
	 return '';
 }
 function ShowLoading(){
	$('#loader').css('display', '')
 }
 function HideLoading(){
	$('#loader').css('display', 'none')
 }
 
 function SpezzaCaMel(parola){
	let arr = [];
	let i = 0;
	for (i=0; i< parola.length; ++i){		
		if (parola[i] === parola[i].toUpperCase()){			
			arr.push(i);			
		}		
	}	
		
	let ret = '';
	//Ora in arr ho gli indici di tutte le maiuscole
	let j=0;
	for (j = 0; j<= arr.length - 2 ;++j){	
		let indexDa = arr[j];
		let indexA = arr[j + 1];
		let lungh = indexA - indexDa 		
		ret +=  parola.substr(arr[j], lungh ) + ' ';		
	}
	ret +=  parola.substr(arr[j]) + ' ';
	return ret
}

function aaa(id){
	//initial position
	let x0,y0,m, alt,lun;
	
	m = Math.pow(-1,Math.ceil(Math.random()*10))*Math.random()*10;	
	x0 = window.innerWidth/2;
	y0 = window.innerHeight/2;
	//console.log('x0=' + x0)
	//console.log('y0=' + y0)
	$('#' + id).offset({"top" : y0 , "left" : x0})
 
	alt = $('#' + id).css('height').replace('px','')/2
	lun = $('#' + id).css('width').replace('px','')/2
	//console.log('alt=' + alt)
	//console.log('lun=' + lun)
	
	let top,left 
	left = x0 -lun
	top = y0 - alt
	//console.log('X=' + top)
	//console.log('Y=' + left)
	$('#' + id).offset({"top" : top , "left" : left})
 

}

function Aggiorna(){
	
	setTimeout(function(){
		ShowLoading();			
	}, 15);
	let today=1;
	switch(GetOggi().substring(8)){
		case "29": today = 1;
			break;
		case "04": today = 1;
			break;
		case "30": today = 2;
			break;
		case "31": today = 3;
			break;
		case "01": today = 4;
			break;
	}
	arrGiocatori=[];
	arrPunteggiTotali=[];
	getGiocatori();	
	
	getPunteggi(today);	
		
	setTimeout(function(){
		GetPunteggioGiocatore();			
	}, 1500);	
	
	setTimeout(function(){
		SetPunti();
		HideLoading();		
	}, 1500);	
}

 function GetOggi(){	 
	oggi = new Date();
	let anno = 1900 + oggi.getYear();
	let mese = 1+ oggi.getMonth();
	if (mese.toString().length == 1){mese = '0' + mese;}
	let giorno = oggi.getDate();
	if (giorno.toString().length == 1){giorno = '0' + giorno;} //if (giorno.length = 1) giorno = '0' + giorno
	oggi = anno + '-' + mese + '-' + giorno;
	return oggi;
 }
 
 function sort_unique(arr) {
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) { return a*1 - b*1; });
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
    if (arr[i-1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  return ret;
}


function setCustomCSS(){
	if(localStorage["CustomCSS"] == '1'){
		localStorage["CustomCSS"] = '0'
	}else{
		localStorage["CustomCSS"] = '1'
	}
	location.reload();
}