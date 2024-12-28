$(document).ready(function(){
 
	 $('#txtDaTrad').on('change', function(){		 
		 pCambiatoDaTrad();
	 });
	  $('#txtDaTrad').on('dblclick', function(){		 
		 pasteFromClipboard('txtDaTrad');
	 });
	 
	const pasteButton = document.querySelector('#paste-button');
	pasteButton.addEventListener('click', async () => {
	   try {		   
		 const t = await navigator.clipboard.readText()
		// document.querySelector('txtDaTrad').value += text;
		 $('#txtNuovaTrad').val(t)
	   } catch (error) {
		 console.log('Failed to read clipboard');
	   }
	});
	
	document.getElementById("playButton").addEventListener("click", function () {
      pPronunciaParola()	  
    });
	 
 
	if(localStorage["olo_Traduzioni"] === undefined || localStorage["olo_Traduzioni"] === 'undefined'){
		localStorage["olo_Traduzioni"] = JSON.stringify({"traduzioni" : []})
	}
	elenco();

})

function pPronunciaParola(){
	// Get the input word and language
      const word = $('#txtDaTrad').val().trim();
      const language = "en";

      if (!word) {
        alert("Nessuna parola selezionata!!!");
        return false;
      }
	  
      // Construct the TTS URL
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(
        word
      )}&tl=${language}`;

      // Set the audio source to the constructed URL
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.src = ttsUrl;      
      // Play the audio
      audioPlayer.play();
}

function pCambiatoDaTrad(){
	
	console.log($('#txtDaTrad').val())
	let a = JSON.parse(localStorage['olo_Traduzioni']).filter(o => o.parola.trim().toLowerCase() == $('#txtDaTrad').val().trim().toLowerCase())
	if(a.length > 0){	
		$('#txtNuovaTrad').val(a[0].traduzioni[0]);		
	}
}

function pasteFromClipboard(id){
	try {
     const text =   navigator.clipboard.readText()
     document.querySelector(id).value += text;
     
   } catch (error) {
     alert('Failed to read clipboard');
   }
}

function ClearLS(){
	localStorage["olo_Traduzioni"] = undefined;
	 location.reload();
}

function Aggiungi(){		
	let a = JSON.parse(localStorage["olo_Traduzioni"])
	if(a.length == undefined){
		a = [];
	}
	let objParola = {
		"parola": setInizialeMaiuscola($('#txtDaTrad').val()),
		"traduzioni" : []
	}
	objParola.traduzioni.push(setInizialeMaiuscola($('#txtNuovaTrad').val()));
	a.push(objParola);
	localStorage["olo_Traduzioni"] = JSON.stringify(a);
	elenco()
	$('.tradInput').val('')
	IndicizzaParole();
	return ''
}

function EliminaParolaDaArray(index){
	let a = creaOggettoTraduzioni();//JSON.parse(localStorage['olo_Traduzioni']);
	a.splice(index, 1);
	localStorage["olo_Traduzioni"] = JSON.stringify(a);
	console.log('Eliminata parola indice ' + index);
	elenco();
}	

function ModificaParolaDaArray(index){
	//index = index - 1;
	let a = creaOggettoTraduzioni();//JSON.parse(localStorage['olo_Traduzioni']);
	$('#txtDaTrad').val(a[(index+1)%a.length].parola)
	$('#txtNuovaTrad').val(a[(index+1)%a.length].traduzioni[0])
	
	/*if(confirm('Eliminare la parola salvata?')){
		EliminaParolaDaArray(index);
	};	*/	
}
function PronunciaParola(index){
	let ID = 'btnPlay_'+index;	
	$('#' + ID).fadeOut();
	setTimeout(function(){
		$('#' + ID).fadeIn();
	}, 1000);
	let a = creaOggettoTraduzioni();//JSON.parse(localStorage['olo_Traduzioni']);
	$('#txtDaTrad').val(a[(index+1)%a.length].parola)
	$('#txtNuovaTrad').val(a[(index+1)%a.length].traduzioni[0])
	
	pPronunciaParola()
}	

function Pulisci(){
	$('#txtDaTrad').val('')
	$('#txtNuovaTrad').val('')
}

function MyTrim(s){
	try{
		if(s != undefined){
		return s.parola.trim()
	}
	return "zzz"
		
	}catch(exc){
		let err  = '';		
		return "XXX"
	}
	
}

function creaOggettoTraduzioni(){	
	let a = JSON.parse(localStorage["olo_Traduzioni"]).sort( (a,b) => 
				(MyTrim(a).toLowerCase() < b.parola.trim().toLowerCase())
				? 1 : -1  )
	return a;
}

function elenco(){
	
	let b = localStorage['olo_Traduzioni'] != undefined && JSON.parse(localStorage['olo_Traduzioni']).length > 0;
	if(b == false){return false;}
	
	/*let a = JSON.parse(localStorage["olo_Traduzioni"]).sort( (a,b) => 
				(MyTrim(a).toLowerCase() < b.parola.trim().toLowerCase())
				? 1 : -1  )*/
	let a = creaOggettoTraduzioni();
	let sHTML = ''
	for (i=a.length -1; i>= 0; --i){
		sHTML += '<div class="col-xs-12 parolaCercata">'
		sHTML += '	<div class="col-xs-6" style="padding: 0 0 0 10px;">'
		sHTML += '		<b>' + a[i].parola  + '</b><br>'		
		for (j = 0; j< a[i].traduzioni.length; ++j){
			sHTML += a[i].traduzioni[j] +'<br>'
		}
		sHTML += '	</div>'		
		sHTML += '	<div class="col-xs-2">'
		sHTML += '		<button id="btnPlay_' + i + '" onclick="PronunciaParola(' + i + ')" class="btn btn-success btnPronunciaParola"><span class="glyphicon glyphicon-play"></span></button>'
		sHTML += '	</div>'	
		sHTML += '	<div class="col-xs-2">'
		sHTML += '		<button onclick="ModificaParolaDaArray(' + i + ')" class="btn btn-warning btnModifica">M</button>'
		sHTML += '	</div>'	
		sHTML += '	<div class="col-xs-2">'
		sHTML += '		<button onclick="EliminaParolaDaArray(' + i + ')" class="btn btn-warning btnElimina">X</button>'
		sHTML += '	</div>'		
		sHTML += '</div>'						
	}
	 
	$('#elenco').html(sHTML)
	$('#elenco').fadeIn()
}

function Gioca(){ 
	window.location.href = 'oloAppCards.html';
}

function Visualizza(){
	$('#lblTraduzione1').css('display', '');
}

function CLEAR_LS(){
	localStorage["olo_Traduzioni"] = undefined
	location.reload();

}

function setInizialeMaiuscola(a){
	return a.substring(0,1).toString().toUpperCase() + a.substring(1)
}


function IndicizzaParole(){
	if(localStorage["olo_Traduzioni"] != undefined){
		a = JSON.parse(localStorage["olo_Traduzioni"]);
		if(a.length > 0){
			let counter = 1;
			a.forEach(o => { o["counter"] = counter; counter += 1; })
			localStorage["olo_Traduzioni"] = JSON.stringify(a);			
		}	else{
		console.log("a.length = 0 ")
	}		
	}else{
		console.log("olo_Traduzioni UNDEFINED")
	}	
}




function ImportaTradDefault(){
	if(typeof TRAD_DEFAULT !== 'undefined'){
		let oldArrayTrad = JSON.parse(localStorage['olo_Traduzioni']);
		let objNewTrad = JSON.parse(TRAD_DEFAULT);	
		
		let b = localStorage['olo_Traduzioni'] != undefined && JSON.parse(localStorage['olo_Traduzioni']).length > 0;
		if(b == false){
			localStorage['olo_Traduzioni'] = TRAD_DEFAULT;
			elenco();
			return true;
		}		
			
		const newArrayTrad = oldArrayTrad.concat(objNewTrad);
		
		localStorage['olo_Traduzioni'] = JSON.stringify(newArrayTrad);
		elenco();
		return true;
		
	}else{
		alert('TRAD_DEFAULT non trovata!')
		return false;
	}		
}
