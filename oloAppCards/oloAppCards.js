var esatte, sbagliate;
var modalita;
var array_n_parole;
var index_n_parole;
var NUM_10;

$(document).ready(function(){
	SetNUM_10();
	$('#lblModalita10').html(NUM_10); 
	if(localStorage["Lingua"] == undefined){
		localStorage["Lingua"] = 'USA'
	}else if(localStorage["Lingua"] == 'USA'){
		
	}else if(localStorage["Lingua"] == 'JPN'){
		$('#chkLingua').prop('checked', true);
	}
	JSON.parse(localStorage['ParoleSbagliate']).length > NUM_10 ? $('#btnCateg_HARD').fadeIn() : $('#btnCateg_HARD').fadeOut();
	initVariabiliRis();			
	//modalita = -1; //default infinito
	//pModalita(modalita);
	//pPopolaCarte();
	/*randomFlag();*/
	pCambiaLingua();	
	/*Handle dei click*/	
	$('#btnModalitaInf').on('click',function(){	
		$('#chkLingua').prop('checked', false);
		pCambiaLingua();		
		pModalita(-1);		 	
	});
	$('#btnModalita10').on('click',function(){		 	
		pClickModalita10();
	});	
	$('#btnCateg_1').on('click',function(){		 	
		pClickModalita10();	 
	});	
	$('#btnCateg_2').on('click',function(){		 	
		pClickModalita10(); 
	});	
	$('#btnCateg_3').on('click',function(){		 	
		pClickModalita10();		 
	});	
	$('#btnCateg_4').on('click',function(){		 	
		pClickModalita10();	
	});	

	$('#chkLingua').on('change',function(){	
		pCambiaLingua();
	});	
	 
	$('#btnModalitaFlag').on('click',function(){
		$('.card').css('transform','') ; //setto sempre la carte frontale, non il retro
		$('.flag1').css('display','none');
		
		$('#btnModalitaInf').removeClass('ModalitaSelezionata')	
		$('#btnModalita10').removeClass('ModalitaSelezionata')
		$('#btnModalitaFlag').addClass('ModalitaSelezionata')
		
		setTimeout(function(){
			index_n_parole = 0;
			giocaBandiere();
			//index_n_parole = 0; 		
			$('#btnSoluzione').css('display', '');	
			$('.lblParola').css('display', 'none');	
            $('.flag1').css('display','');					
		}, 600)			
	});			 
});	


function SetNUM_10(){	
	if(localStorage["NUM"] != undefined){
		NUM_10 = parseInt(localStorage["NUM"]);
	}else{
		NUM_10 = 10
	}	
}

function pCambiaLingua(){
	if(isLinguaInglese()){			
		$('.btnGiocaCateg').css('display', '');
		$('#switchTipoKana').css('display', 'none');
		localStorage["Lingua"] = 'USA'
	}else{			
		$('.btnGiocaCateg').css('display', 'none');
		$('#switchTipoKana').css('display', '');
		localStorage["Lingua"] = 'JPN'
	}
	pClickModalita10();	
}

function pClickModalita10(){
	pModalita(NUM_10);
	index_n_parole = 1; 
	pPopolaCarte_n(NUM_10);	
}

function pModalita(n){
	initVariabiliRis();
	array_n_parole = [];
	index_n_parole = 0;
	modalita = n;
	switch(modalita){
		case -1:
			$('#btnModalitaInf').addClass('ModalitaSelezionata')	
			$('#btnModalita10').removeClass('ModalitaSelezionata')	
			$('#btnModalitaFlag').removeClass('ModalitaSelezionata')
			$('.lblParola').css('display', '')		
			$('.bandiera').css('display', 'none')			
			break;
		default:
			$('#btnModalitaInf').removeClass('ModalitaSelezionata')	
			$('#btnModalita10').addClass('ModalitaSelezionata')	
			$('#btnModalitaFlag').removeClass('ModalitaSelezionata')
			$('.lblParola').css('display', '')
			$('.bandiera').css('display', 'none')
			break;
	}
	pPopolaCarte();
	pSetRis();
	$('#btnSoluzione').css('display', '');
}

function initVariabiliRis(){
	esatte = 0;
	sbagliate = 0;
}

function GetSoluzione(){
	/*
	sbagliate += 1;
	pSetRis();
	*/
	$('.card').css('transform','rotateY(180deg)') 
}

function NextCard(i){
	if($('.bandieraBack').is(':visible')){
		modalita = 1994;
	}
	
	if(modalita == -1){
		//non faccio nulla
	}else{
		//incremento il cursore sull'array finito di parole
		index_n_parole += 1;
	}
	
	if(i==0){
		//HO INDOVINATO
		esatte += 1;
		pSetRis();		
		if(isLinguaInglese() && ($('#btnModalitaInf').hasClass('ModalitaSelezionata') ||$('#btnModalita10').hasClass('ModalitaSelezionata')) ){
			removeParolaSbagliata($('#lblParola').html().trim());
		}
		
		pCambiacarta()		
	}else{
		//HO SBAGLIATO
		sbagliate += 1;
		pSetRis();			
		if(isLinguaInglese() && ($('#btnModalitaInf').hasClass('ModalitaSelezionata') ||$('#btnModalita10').hasClass('ModalitaSelezionata')) ){
			addParolaSbagliata($('#lblParola').html().trim());
		}		
		pCambiacarta()			
	}
	
}

function addParolaSbagliata(parolaSbagliata){	
	let arr;
	let obj = {};
	
	if(localStorage["ParoleSbagliate"] == undefined){		
		obj["parola"] = parolaSbagliata;
		obj["count"] = 1;
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
			obj["count"] = 1;
			arr.push(obj);		
			localStorage["ParoleSbagliate"] = JSON.stringify(arr);			
		}		 				
	}		
}

function removeParolaSbagliata(parolaSbagliata){	
	let arr;
	let obj = {};
	
	if(localStorage["ParoleSbagliate"] == undefined){		
		return false;
	}else{
		arr = JSON.parse(localStorage["ParoleSbagliate"]);
		let q = arr.filter(o => o.parola == parolaSbagliata)
		if(q.length == 1){

			if(q[0].count == 1){				
				arr = arr.filter(o => o.parola != parolaSbagliata)
				localStorage["ParoleSbagliate"] = JSON.stringify(arr);
			}else{
				q[0].count+=-1;
				localStorage["ParoleSbagliate"] = JSON.stringify(arr);
			}						
		}		 				
	}		
}

function pCambiacarta(){	
	setTimeout(function(){
			pPopolaCarte()				
		}, 500) 
		$('.card').css('transform','') 
}

function pPopolaCarte(){
	if($('.bandieraBack').is(':visible')){		
		giocaBandiere();				
	}else{
		if(localStorage["olo_Traduzioni"] != undefined){
			if(modalita == -1){
				pPopolaCarte_inf()
			}else{
				pPopolaCarte_n()
			}			
		}
	}			
}

function pPopolaCarte_inf(){
	let a = [...JSON.parse(localStorage["olo_Traduzioni"])]
	let i = Math.floor(Math.random() * a.length);	 		
	$('#lblParola').text(a[i].parola)
	$('#lblParolaCopia').text(a[i].parola)
	$('#lblSoluzione').text(a[i].traduzioni);
	setSizeTraduzione();
}
function pPopolaCarte_n(){
	if(index_n_parole == 0){
		//devo creare tutto
		if(isLinguaInglese()){
			if($('#btnCateg_HARD').hasClass('CategSelezionata') == false){
				array_n_parole = pCreaSubarrayDiNParole(modalita);				
			}else{
				array_n_parole = pCreaArraySbagliate();
			}
			
			$('.lblParola').removeClass('kana');
		}else{
			if(isHiragana()){				
				array_n_parole = creaArrayHiragana();
			}else{
				array_n_parole = creaArrayKatakana();
			}
			
			$('.lblParola').addClass('kana')
		}
				
		index_n_parole = 0;
		console.log('array_n_parole');
		console.log(array_n_parole);
		
	}else{
		if(index_n_parole <= array_n_parole.length ){
			let indice = index_n_parole%array_n_parole.length;
			console.log('indice:' + indice);
			$('#lblParola').text(array_n_parole[indice].parola)
			$('#lblParolaCopia').text(array_n_parole[indice].parola)
			$('#lblSoluzione').text(array_n_parole[indice].traduzioni);
			setSizeTraduzione();
		}else{
			//gioco finito
			//alert('FINITO!!')
			let indovinate, sbagliate, tot
			indovinate= parseInt($('#lblIndovinate').text());
			sbagliate= parseInt($('#lblSbagliate').text());
			tot= indovinate + sbagliate;
			let sHtml = '<br><br><button class="btn btn-primary" style="background: transparent;" onclick="pClickModalita10();"><span style="font-size:65px;" class="glyphicon glyphicon-refresh"></span></button>'
			$('#lblParola').html('FINITO\n\nIndovinate\n' + indovinate + '/' + tot + sHtml);
			$('#btnSoluzione').css('display', 'none');
			$('.lblParola').removeClass('kana');
		}
	}	
}

function pSetRis(){
	let sHtmlEsito
	let t;
	let testo;	
	sHtmlEsito = `
		<span class='glyphicon glyphicon-ok fontEsito' style='color:#00ee00'></span>
		<span id='lblIndovinate' class='fontEsito' style='color:#00ee00'>${esatte}</span>&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<span class='glyphicon glyphicon-remove fontEsito' style='color:#e32c2c'></span>
		<span id='lblSbagliate' class='fontEsito' style='color:#e32c2c'>${sbagliate}</span>&nbsp;
	`;
	$('#divEsito').html(sHtmlEsito);	 
}

function pCreaSubarrayDiNParole(n){
	let arrCompleto = JSON.parse(localStorage["olo_Traduzioni"])
	if(arrCompleto == undefined){
		return []
	}
	
	//***********
	let CategSel = GetCategSelezionata();
	if(CategSel != '-1'){
		//let arrCompletoFiltratoPerCateg = arrCompleto.filter(o => o.categoria == CategSel)
		let arrCompletoFiltratoPerCateg = arrCompleto.filter(o => check_binary(o.categoria, CategSel))
		if(arrCompletoFiltratoPerCateg.length >= n){
			arrCompleto = arrCompletoFiltratoPerCateg;
			
		}else{
			alert('Non ci sono 10 traduzioni per la categoria selezionata!');
		}
		
	}else{
		//NON FILTRO PER CATEGORIA, USO TUTTE LE PAROLE!
	}
	//***********
	
	
	//15/12/2024 - escludo le parole già usate
	let arrEscludiGiaUsate = [];
	let arrEscludiGiaUsateNEW = [];	
	if(sessionStorage["arrEscludiGiaUsate"] == undefined){
		sessionStorage["arrEscludiGiaUsate"] = '[]';
	}
	let objEscudi = JSON.parse(sessionStorage["arrEscludiGiaUsate"])
	/*if( objEscudi != undefined && objEscudi.length > 0 && objEscudi.length <= 3*NUM_10){				
		arrEscludiGiaUsate = [1,2,3];
	}else{
		
	}*/
		
	let lungh = arrCompleto.length
	let arr = [];
	let i;
	if(n >= lungh){
		return arrCompleto
	}
	let MAXIMUM = 3*NUM_10;
	let iter = 0;
	//for(let j = 0; j<n; ++j){
	let j = 0;
	while(arrEscludiGiaUsateNEW.length < n){
	 
		
		i = Math.floor(Math.random() * lungh);	
		if(false && arrEscludiGiaUsate.length > 0){ 
			//----------------------------------------per ora NO nuovo siluppo da finire e testare!-----------------------------------------
			//   ESCLUSIONI
			/*
			if(arrEscludiGiaUsate.includes(arrCompleto[i]["counter"].toString())){
				console.log("VADO OLTRE " + arrCompleto[i]["counter"])
			}else{
				//Aggiungo
				if(arr.indexOf(arrCompleto[i]) == -1){			
					arr[j] = arrCompleto[i];				
				}else{
					j = j - 1;			
				}
			}
			*/
			
		}else{
			//NO ESCLUSIONI: per ora funziona solo questo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//Aggiungo
			if(arr.indexOf(arrCompleto[i]) == -1){			
				arr[j] = arrCompleto[i];				
			}else{
				j = j - 1;			
			}
			//arrEscludiGiaUsateNEW.push(arrCompleto[i]["counter"])
			if(arrEscludiGiaUsateNEW.includes(arrCompleto[i]["counter"]) == false){
				arrEscludiGiaUsateNEW.push(arrCompleto[i]["counter"]);
				j += 1;
			}
		}			
		
		iter +=1;
		if(iter == MAXIMUM){j = n+1; console.log('*************')	}		
	}
	sessionStorage["arrEscludiGiaUsate"] = JSON.stringify(arrEscludiGiaUsate);
	
	console.log(arr)
	return arr;
	
}

function setSizeTraduzione(){	
	if($('#lblSoluzione').html().length >=15){
		$('#lblSoluzione').addClass('fontsize34px');
	}else{
		$('#lblSoluzione').removeClass('fontsize34px');
	}
}

function GiocaCateg(q){
	let id = q.id;
	let b = $('#' + id).attr('class').includes('CategSelezionata');
	
	$('.btnGiocaCateg').removeClass('CategSelezionata');
	if(b == false){
		$('#' + id).addClass('CategSelezionata');
	}	
}

function GetCategSelezionata(){	
	if($('.CategSelezionata').length  == 0){
			return '-1';
	}
	let id = $('.CategSelezionata').attr('id');
	/*let Categ = id.replace('btnCateg_','');
	return Categ;*/
	switch(id){
		case "btnCateg_1": return "1";
		case "btnCateg_2": return "10";
		case "btnCateg_3": return "100";
		case "btnCateg_4": return "1000";
	}
	return '-1';
}
function check_binary(i, j){
	i = parseInt(i);
	j = parseInt(j);
	//"cast a byte"
	i = '0B' + i;
	j = '0B' + j;
	
	return i & j
}

/**************************** GIOCA BANDIERE *******************************************************************/
let BASE_URL = 'https://flagcdn.com/h240/SIGLA_DA_SOST.png';
function giocaBandiere(){
	if(index_n_parole == 0){
		//devo creare tutto
		$('.flag_to_guess').css('display', '');
		ARRAY_BANDIERE = creaArrayFlags();		
		$('#flag1').attr('src', ARRAY_BANDIERE[0].url);
		$('#flag2').attr('src', ARRAY_BANDIERE[0].url);
		$('#lblSoluzione').html(ARRAY_BANDIERE[0].soluzione + '\n<i>' + ARRAY_CAPITALI[0]+ '</i>');
		$('.lblParola').css('display', 'none')
		$('#flag1').css('display', '');
		$('#flag2').css('display', '');
	}else{
		if(index_n_parole < ARRAY_BANDIERE.length ){
			let indice = index_n_parole%ARRAY_BANDIERE.length;
			console.log('indice:' + indice);
			$('#flag1').attr('src', ARRAY_BANDIERE[indice].url);
			$('#flag2').attr('src', ARRAY_BANDIERE[indice].url);
			$('#lblSoluzione').html(ARRAY_BANDIERE[indice].soluzione + '\n<i>' + ARRAY_CAPITALI[indice] +'</i>');
			$('.lblParola').css('display', 'none')
			setSizeTraduzione();
		}else{
			//gioco finito
			//alert('FINITO!!')
			let indovinate, sbagliate, tot
			indovinate= parseInt($('#lblIndovinate').text());
			sbagliate= parseInt($('#lblSbagliate').text());
			tot= indovinate + sbagliate;
			$('#lblParola').text('FINITO\n\nIndovinate\n' + indovinate + '/' + tot);
			$('.lblParola').css('display', '')
			$('#flag1').css('display', 'none');
			$('#flag2').css('display', 'none');
			$('#btnSoluzione').css('display', 'none');
		}
	}	
}
var ARRAY_BANDIERE;
var ARRAY_CAPITALI;
const NUM_MAX_FLAG = 306
function creaArrayFlags(){
	let arr = [];
	let arrCapitali = [];
	
	const ARR_FLAG_LIST = Object.keys(FLAG_LIST);
	for(let i = 1; i<=NUM_10; ++i){
		let randomNumber = parseInt(Math.random()*NUM_MAX_FLAG);		
		const randomKey = ARR_FLAG_LIST[randomNumber];
		const soluz = FLAG_LIST[randomKey];
	 	let obj = {}
		obj["url"] = BASE_URL.replace("SIGLA_DA_SOST", randomKey);	
		obj["soluzione"] = soluz;		 
		arr.push(obj);
				 
		arrCapitali.push(CAPITALI_LIST[randomKey])		
	}
	ARRAY_CAPITALI = arrCapitali;
	return arr;
}

function randomFlag(){
	const ARR_FLAG_LIST = Object.keys(FLAG_LIST);
	let randomNumber = parseInt(Math.random()*NUM_MAX_FLAG);		
	const randomKey = ARR_FLAG_LIST[randomNumber];
	let url = BASE_URL.replace("SIGLA_DA_SOST", randomKey);
	$('#flagBtModalitaFlag').attr('src', url);
}

/**************************** GIOCA HIRAGANA *******************************************************************/

function creaArrayHiragana(){
	const startCode = 0x3041;
	const endCode = 0x3093;
	let randomCodePoint;
	let randomHiragana;
	let pronuncia;
	let obj;
	let arr = [];
	
	while (arr.length < NUM_10) {			 		
		randomCodePoint = Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
		randomHiragana = String.fromCharCode(randomCodePoint);
		
		if(arr.filter(o => o.parola == randomHiragana).length == 0){
			pronuncia = HIRAGANA_LIST[randomCodePoint.toString(16).toUpperCase()];						
			obj= {}
			obj["parola"] = randomHiragana;
			let arrTrad = [];
			arrTrad.push(pronuncia)		
			obj["traduzioni"] = arrTrad;	
			arr.push(obj);			
		}					
	}
	return arr;	
}

function creaArrayKatakana(){
	const startCode = 0x30A1;
	const endCode = 0x30FA;
	let randomCodePoint;
	let randomKatakana;
	let pronuncia;
	let obj;
	let arr = [];
	
	while (arr.length < NUM_10) {			 		
		randomCodePoint = Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
		randomKatakana = String.fromCharCode(randomCodePoint);
		
		if(arr.filter(o => o.parola == randomKatakana).length == 0){
			pronuncia = KATAKANA_LIST[randomCodePoint.toString(16).toUpperCase()];						
			obj= {}
			obj["parola"] = randomKatakana;
			let arrTrad = [];
			arrTrad.push(pronuncia)		
			obj["traduzioni"] = arrTrad;	
			arr.push(obj);			
		}					
	}
	return arr;	
}

function isLinguaInglese(){	
	let s = $('#chkLingua').prop('checked') ? 'JPN' : 'USA';
	return s == 'USA';
}
function isHiragana(){	
	let b = $('#chkTipoKana').prop('checked') ? false : true;
	return b;
}


function pCreaSubarrayDiNParole_Sbagliate(){
	let arrSb = [];
	let t = 0
	let arrSbTot = JSON.parse(localStorage["ParoleSbagliate"]);
	while (arrSb.length < NUM_10){
		
		let i = Math.floor(Math.random() * arrSbTot.length);
		if(!arrSb.includes(arrSbTot[i].parola)){
			arrSb.push(arrSbTot[i].parola);
			arrSbTot.splice(i, 1)			
		}
		console.log(t + '  ' + arrSb)
		
		if(t > 50){return arrSb;}
		t+=1;
	}
	return arrSb
}
function pCreaArraySbagliate(){
	let arrSb = pCreaSubarrayDiNParole_Sbagliate();
	let arr = [];
	let obj = JSON.parse(localStorage["olo_Traduzioni"])

	for(let i = 0; i<arrSb.length; ++i){
		arr.push(obj.filter(o=>o.parola == arrSb[i])[0])						
	}
	return arr;			
}






function elencoFiltraCategHard(){
	modalita = 'H'
	pClickModalita10();
}
