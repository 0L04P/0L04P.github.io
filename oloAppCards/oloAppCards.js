var esatte, sbagliate;
var modalita;
var array_n_parole;
var index_n_parole;
const NUM_10 = 10;

$(document).ready(function(){
	initVariabiliRis();			
	modalita = -1; //default infinito
	pModalita(modalita);
	pPopolaCarte();
	
	/*Handle dei click*/	
	$('#btnModalitaInf').on('click',function(){		 	
		pModalita(-1);		
	});
	$('#btnModalita10').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
	});	
	$('#btnCateg_1').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
	});	
	$('#btnCateg_2').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
	});	
	$('#btnCateg_3').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
	});	
	$('#btnCateg_4').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
	});		
});	

function pModalita(n){
	initVariabiliRis();
	array_n_parole = [];
	index_n_parole = 0;
	modalita = n;
	switch(modalita){
		case -1:
			$('#btnModalitaInf').addClass('ModalitaSelezionata')	
			$('#btnModalita10').removeClass('ModalitaSelezionata')				
			break;
		default:
			$('#btnModalitaInf').removeClass('ModalitaSelezionata')	
			$('#btnModalita10').addClass('ModalitaSelezionata')	
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
		//pPopolaCarte()	
		pCambiacarta()		
	}else{
		//HO SBAGLIATO
		sbagliate += 1;
		pSetRis();		
		pCambiacarta()			
	}
	
}

function pCambiacarta(){	
	setTimeout(function(){
			pPopolaCarte()				
		}, 500) 
		$('.card').css('transform','') 
}

function pPopolaCarte(){
	if(localStorage["olo_Traduzioni"] != undefined){
		if(modalita == -1){
			pPopolaCarte_inf()
		}else{
			pPopolaCarte_n()
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
		array_n_parole = pCreaSubarrayDiNParole(modalita);
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
			$('#lblParola').text('FINITO\n\nIndovinate\n' + indovinate + '/' + tot);
			$('#btnSoluzione').css('display', 'none');
		}
	}	
}

function pSetRis(){
	let sHtmlEsito
	let t;
	let testo;
	/*if(esatte > 0 || sbagliate > 0){
		t = parseInt(esatte) + parseInt(sbagliate);
		testo = 'Sbagliate: ' + sbagliate + ' su ' + t;	
	}else{
		//partita non ancora avviata		
		t = (modalita > 0) ? modalita : '-';		
		testo = 'Sbagliate: - su ' + t;
		if(modalita > 0){
			let mancanti = modalita - esatte - sbagliate;
			testo += '\n' + '(Mancanti: ' + mancanti + ')';
		}
	}*/	
	//$('#lblEsito').text(testo);		
	////////
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
	for(let j = 0; j<n; ++j){
		
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
			arrEscludiGiaUsateNEW.push(arrCompleto[i]["counter"])
		}			
		
		iter +=1;
		if(iter == MAXIMUM){j = n+1; console.log('*************')	}		
	}
	sessionStorage["arrEscludiGiaUsate"] = JSON.stringify(arrEscludiGiaUsate);
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