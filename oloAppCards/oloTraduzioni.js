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
    $('#txtNUM').val(localStorage["NUM"]);
})

document.addEventListener("DOMContentLoaded", function () {
    elenco();
});

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
	if(confirm('ELIMINARE LS???')){
		localStorage["olo_Traduzioni"] = undefined;
	 location.reload();
	}
	
}
function ClearLS_paroleDifficili(){
	if(confirm('ELIMINARE LS ParoleSbagliate???')){
		localStorage["ParoleSbagliate"] = undefined;
	    location.reload();
	}
	
}

function Aggiungi(){	

	if($('#txtDaTrad').val() == '' || $('#txtNuovaTrad').val() == ''){		
		return false;
	}

	let parola = setInizialeMaiuscola($('#txtDaTrad').val());
	let a = JSON.parse(localStorage["olo_Traduzioni"])
	if(a.length == undefined){
		a = [];
	}
	let objParola = {
		"parola": parola,
		"traduzioni" : [],
		"categoria" : []
	}
	objParola.traduzioni.push(setInizialeMaiuscola($('#txtNuovaTrad').val()));
	a.push(objParola);
	localStorage["olo_Traduzioni"] = JSON.stringify(a);
	addParolaSbagliata(parola, 4);
	$('.tradInput').val('')
	IndicizzaParole();
	elenco(true, parola)
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
	$('#txtDaTrad').val(a[index].parola)
	$('#txtNuovaTrad').val(a[index].traduzioni[0])
	$("html, body").animate({ scrollTop: 0 }, "fast");
	if(confirm('Eliminare la parola salvata?')){
		EliminaParolaDaArray(index);
	};
}

function PronunciaParola(index){
	//da errore perchè google ha blocccato le chiamate!
	let ID = 'btnPlay_'+index;	
	$('#' + ID).fadeOut();
	setTimeout(function(){
		$('#' + ID).fadeIn();
	}, 1000);
	let a = creaOggettoTraduzioni();//JSON.parse(localStorage['olo_Traduzioni']);
	$('#txtDaTrad').val(a[index].parola)
	$('#txtNuovaTrad').val(a[index].traduzioni[0])
	
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
function elencoFiltraCateg(filtraCateg){		
	let b = $('#btnCateg_' + filtraCateg).attr('class').includes('CategSelezionata');
	$('.btnGiocaCateg').removeClass('CategSelezionata');
	if(b == false){
		$('#btnCateg_' + filtraCateg).addClass('CategSelezionata');
		elenco(false, '', filtraCateg);
	}else{
		elenco(false, '', '');
	}	
}
function elencoFiltraCategHard(){
	
	
}

function elenco(bSetCateg = false, parola = '', filtraCateg = '-1'){
	filtraCateg = filtraCateg.toString(); 
	let b = localStorage['olo_Traduzioni'] != undefined && JSON.parse(localStorage['olo_Traduzioni']).length > 0;
	if(b == false){return false;}
	
	let a = creaOggettoTraduzioni();
	if(filtraCateg != '-1'){
		a = a.filter(o => o.categoria == filtraCateg);
	}
	let sHTML = ''
	let sHex = '';
	for (i=a.length -1; i>= 0; --i){
		
		sHex = '#00cc12'; 
		if(     checkCategoria(a[i].categoria,CATEGORIE_BIT._verbo)){			
			sHex = '#0c7eef'; 
		}else if(checkCategoria(a[i].categoria,CATEGORIE_BIT._aggettivo)){
			sHex = '#7ebf6a'; 
		}else if(checkCategoria(a[i].categoria,CATEGORIE_BIT._sostantivo)){
			sHex = '#5bff07'; 
		}else if(checkCategoria(a[i].categoria,CATEGORIE_BIT._interiezioni_modo_dire)){
			sHex = '#56aa10'; 
		}
		
		sHTML += '<div id="divParolaCercata_' + a[i].counter + '" class="col-xs-12 parolaCercata" style="border: solid ' + sHex + '; border-left-width: 10px;" ondblclick="elenco(true, \'' + a[i].parola  + '\' )">'
		sHTML += '	<div class="col-xs-8" style="padding: 0 0 0 10px;">'
		sHTML += '		<b>' + a[i].parola  + '</b><br>'		
		for (j = 0; j< a[i].traduzioni.length; ++j){
			sHTML += a[i].traduzioni[j] +'<br>'
		}

		sHTML += '</div>'		
		/*
		sHTML += '	<div class="col-xs-2">'
		sHTML += '		<button id="btnPlay_' + i + '" onclick="PronunciaParola(' + i + ')" class="btn btn-success btnPronunciaParola"><span class="glyphicon glyphicon-play"></span></button>'
		sHTML += '	</div>'	
		*/
		sHTML += '	<div class="col-xs-2">'
		sHTML += '		<button onclick="ModificaParolaDaArray(' + i + ')" class="btn btn-warning btnModifica">M</button>'
		sHTML += '	</div>'	
		sHTML += '	<div class="col-xs-2">'
		sHTML += '		<button onclick="EliminaParolaDaArray(' + i + ')" class="btn btn-warning btnElimina">X</button>'
		sHTML += '	</div>'	
		if(bSetCateg == true){
		sHTML += '	<div class="col-xs-12" style="padding:0; text-align: center;">'
		sHTML += '		<button onclick="SetCateg(' + i +', '+ CATEGORIE_BIT._verbo + ')" class="btn btn-warning btnSetCateg ' + ((checkCategoria(a[i].categoria, CATEGORIE_BIT._verbo)) ? 'sottolineato' : '') + '">VERBO</button>'
		sHTML += '		<button onclick="SetCateg(' + i +', '+ CATEGORIE_BIT._aggettivo + ')" class="btn btn-warning btnSetCateg ' + ((checkCategoria(a[i].categoria, CATEGORIE_BIT._aggettivo)) ? 'sottolineato' : '') + '">AGG/AVV</button>'
		sHTML += '		<button onclick="SetCateg(' + i +', '+ CATEGORIE_BIT._sostantivo + ')" class="btn btn-warning btnSetCateg ' + ((checkCategoria(a[i].categoria, CATEGORIE_BIT._sostantivo)) ? 'sottolineato' : '') + '">SOST.</button>'
		sHTML += '		<button onclick="SetCateg(' + i +', '+ CATEGORIE_BIT._interiezioni_modo_dire + ')" class="btn btn-warning btnSetCateg ' + ((checkCategoria(a[i].categoria, CATEGORIE_BIT._interiezioni_modo_dire)) ? 'sottolineato' : '') + '">MODO</button>'
		sHTML += '	</div>'	
		}		
		sHTML += '</div>'						
	}
	 
	$('#elenco').html(sHTML)
	$('#elenco').fadeIn();
	
	
	if(parola != ''){
		try{
			//scroll alla parola!
			parola = parola.toLowerCase();
			
			let Counter = a.filter(o => o.parola.toLowerCase() == parola)[0].counter;
			let divID = "divParolaCercata_" + Counter;			
			let divTop = $('#' + divID).offset().top - 200;
			$("html, body").animate({ scrollTop: divTop }, "fast");			
			$('#' + divID).removeClass('bbox');
			$('#' + divID).addClass('bbox');		
			console.log('Counter ' + Counter);
		}catch(ex){
				console.log('errore scroll!!!')
		}		
	}
}

function SetCateg(i, tipoCateg){
	let a = creaOggettoTraduzioni();
	let parola = a[i].parola;
	//se c'è già una categoria ed è la stessa che ho passato adesso, la rimuovo, sennò la aggiungo
	/*if(a[i].categoria == tipoCateg){		
		updateCategoria(parola, '');
	}else{
		updateCategoria(parola, tipoCateg);
	}*/
	/*if(checkCategoria(a[i].categoria, tipoCateg)){		
		updateCategoria(parola, tipoCateg);
	}else{
		updateCategoria(parola, tipoCateg);
	}*/
	updateCategoria(parola, tipoCateg);
	elenco(true)
}

function Gioca(){ 
	window.location.href = 'oloAppCards.html';
}

function Visualizza(){
	$('#lblTraduzione1').css('display', '');
}

function pGetTimestamp() {
	return new Date().toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }).replace(',', '.')
}
function CLEAR_LS(){
	ClearLS();
}
function ClearLS(){
	if(confirm("ELIMINRE I LOCAL STORAGE DELLE TRADUZIONI?")){
			//creo backup
		let timestamp = pGetTimestamp();
		timestamp = timestamp.replaceAll(',', '_').replaceAll('.', '_').replaceAll('\/','_').replaceAll(':', '_').replaceAll('  ', '_').replaceAll(' ', '___').replaceAll('/', '_');
		localStorage["bak_" + timestamp] = localStorage["olo_Traduzioni"];
		localStorage["olo_Traduzioni"] = undefined;
		location.reload();		
	}
}
function apriSetting(){
	if($('#divSettings').is(':visible')){
		$('#divSettings').fadeOut();
	}else{
		$('#divSettings').fadeIn();
		getBakup();
	}
	
}
function getBakup(){	 
	let sHTML = `<b>BACKUPS</b>
				<table style='width: 100%'>`;
	let array_nomi_bak = [];
	// Iterate through all keys in localStorage
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if(key.substring(0,3) == 'bak'){
			array_nomi_bak.push(key);
			let nome = key.replace('bak_','');
			sHTML += `<tr>
						<th style='width: 60%;'>${nome}</th>
						<th style='width: 20%;'>
							<button class='btn btn-success' onclick='RipristinaBackup("${key}")'>
								<span style='font-size: 25px;' class='glyphicon glyphicon-save-file'></span>
							</button>
						</th>
						<th style='width: 20%;'>
							<button class='btn btn-danger' onclick='localStorage.removeItem("${key}")'>
								<span style='font-size: 25px;' class='glyphicon glyphicon-remove'></span>
							</button>
						</th>
					  </tr>`;
		}		
	}
	sHTML += `<table>`
	$('#divListaBackup').html(sHTML);
	
}
function RipristinaBackup(key){
	localStorage["olo_Traduzioni"] = localStorage[key];
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
/*
const CATEGORIE = {
	_verbo : 1,
	_sostantivo : 2,
	_aggettivo : 3,
	_interiezioni_modo_dire : 4
}
*/
const CATEGORIE_BIT = {
	_verbo : 1,
	_sostantivo : 10,
	_aggettivo : 100,
	_interiezioni_modo_dire : 1000
}
function updateCategoria(parola, newCateg) {	
	let array;
	array = JSON.parse(localStorage['olo_Traduzioni']);
	parola = parola.toUpperCase();	 
					 
	let f = array.filter(o => o.parola.toUpperCase() === parola);
	let oldCateg = f[0].categoria;
	
	let a = diff_binary(oldCateg, newCateg);
	let b = sum_binary(oldCateg, newCateg);
	
	if(checkCategoria(oldCateg, newCateg) == true){
		//la categoria selezionata è già presente nelle categorie presenti:
		//la devo rimuovere!
		f[0].categoria = diff_binary(oldCateg, newCateg); //(oldCateg ^ newCateg);
	}else{
		//la categoria selezionata non è ancora presente nelle categorie presenti:
		//la devo aggiungere!
		f[0].categoria = sum_binary(oldCateg, newCateg); //(oldCateg | newCateg);
	}					
	localStorage['olo_Traduzioni'] = JSON.stringify(array);
}

function checkCategoria(valore, categoria){
	/*let b = (categoria & valore) == categoria;
	return b;*/
	return check_binary(valore, categoria);
}
function setCategToBit(){	
	if(localStorage["olo_Traduzioni"] != undefined){
		a = JSON.parse(localStorage["olo_Traduzioni"]);
		if(a.length > 0){
			let counter = 1;
			a.forEach(o => { 
				switch(o["categoria"].toString()){
					case "1": o["categoria"] = CATEGORIE_BIT._verbo; break;
					case "2": o["categoria"] = CATEGORIE_BIT._sostantivo; break;
					case "3": o["categoria"] = CATEGORIE_BIT._aggettivo; break;
					case "4": o["categoria"] = CATEGORIE_BIT._interiezioni_modo_dire; break;
				}
				console.log(o["parola"] + '  categ = ' + o["categoria"])		
					}
				)
			localStorage["olo_Traduzioni"] = JSON.stringify(a);			
		}	else{
		console.log("a.length = 0 ")
	}		
	}else{
		console.log("olo_Traduzioni UNDEFINED")
	}	
}

///operazioni binarie
function sum_binary(i, j){
	i = parseInt(i);
	j = parseInt(j);
	//"cast a byte"
	i = '0B' + i;
	j = '0B' + j;
	
	return (i | j).toString(2) //converto in base 2
}
function diff_binary(i, j){
	i = parseInt(i);
	j = parseInt(j);
	//"cast a byte"
	i = '0B' + i;
	j = '0B' + j;
	
	return (i ^ j).toString(2) //converto in base 2
}
function check_binary(i, j){
	i = parseInt(i);
	j = parseInt(j);
	//"cast a byte"
	i = '0B' + i;
	j = '0B' + j;
	
	//return i & j
	return '0B' + (i & j).toString(2) == j.toString()
}

function ToTop(velocita){
	$("html, body").animate({ scrollTop: 0 }, velocita); 
	return false;
}
function salvaNUM(){
	localStorage["NUM"] = $('#txtNUM').val();
}

function addParolaSbagliata(parolaSbagliata, k = 1){	
	let arr;
	let obj = {};
	
	if(localStorage["ParoleSbagliate"] == undefined){		
		obj["parola"] = parolaSbagliata;
		obj["count"] = k;
		arr = [];
		arr.push(obj);
		localStorage["ParoleSbagliate"] = JSON.stringify(arr);
	}else{
		arr = JSON.parse(localStorage["ParoleSbagliate"]);
		let q = arr.filter(o => o.parola == parolaSbagliata)
		if(q.length == 1){			
			q[0].count+=1;
			localStorage["ParoleSbagliate"] = JSON.stringify(arr);
		}else{
			obj["parola"] = parolaSbagliata;
			obj["count"] = k;
			arr.push(obj);		
			localStorage["ParoleSbagliate"] = JSON.stringify(arr);			
		}		 				
	}		
}



