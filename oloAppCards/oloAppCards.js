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
		pModalita(-1)			
	});
	$('#btnModalita10').on('click',function(){		 	
		pModalita(NUM_10)
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
}

function initVariabiliRis(){
	esatte = 0;
	sbagliate = 0;
}

function GetSoluzione(){
	sbagliate += 1;
	pSetRis();
	$('.card').css('transform','rotateY(180deg)') 
}

function NextCard(i){
	
	if(modalita == -1){
		//non faccio nulla
	}else{
		//incremento il vursore sull'array finito di parole
		index_n_parole += 1;
	}
	
	if(i==0){
		//NON ho guardato la soluzione
		esatte += 1;
		pSetRis();
		pPopolaCarte()		
	}else{
		//Ho guardato la soluzione		
		setTimeout(function(){
			pPopolaCarte()				
		}, 500) 
		$('.card').css('transform','') 				
	}
	
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
	$('#lblSoluzione').text(a[i].traduzioni)	
}
function pPopolaCarte_n(){
	if(index_n_parole == 0){
		//devo creare tutto
		array_n_parole = pCreaSubarrayDiNParole(modalita);
		index_n_parole = 0;
		
	}else{
		if(index_n_parole <= array_n_parole.length - 1){
			$('#lblParola').text(array_n_parole[index_n_parole].parola)
			$('#lblParolaCopia').text(array_n_parole[index_n_parole].parola)
			$('#lblSoluzione').text(array_n_parole[index_n_parole].traduzioni)
		}else{
			//gioco finito
			alert('FINITO')
		}
							
	}	
}

function pSetRis(){
	let t;
	let testo;
	if(esatte > 0 || sbagliate > 0){
		t = parseInt(esatte) + parseInt(sbagliate);
		testo = 'Sbagliate: ' + sbagliate + ' su ' + t;	
		if(modalita > 0){
			let mancanti = modalita - esatte - sbagliate;
			testo += '\n' + '(Mancanti: ' + mancanti + ')';
		}	
	}else{
		//partita non ancora avviata		
		t = (modalita > 0) ? modalita : '-';		
		testo = 'Sbagliate: - su ' + t;
		if(modalita > 0){
			let mancanti = modalita - esatte - sbagliate;
			testo += '\n' + '(Mancanti: ' + mancanti + ')';
		}				
	}	
	$('#lblEsito').text(testo);	
}

function pCreaSubarrayDiNParole(n){
	let arrCompleto = JSON.parse(localStorage["olo_Traduzioni"])
	if(arrCompleto == undefined){
		return []
	}
	
	let lungh = arrCompleto.length
	let arr = [];
	let i;
	if(n >= lungh){
		return arrCompleto
	}
	let MAXIMUM = 30;
	let iter = 0;
	for(let j = 0; j<n; ++j){
		//console.log('j='+ j)
		i = Math.floor(Math.random() * lungh);	
		
		if(arr.indexOf(arrCompleto[i]) == -1){			
			arr[j] = arrCompleto[i];				
		}else{
			j = j - 1;
			//console.log('j rimane uguale=')
		}	
		//console.log('-----------------')	
		iter +=1;
		if(iter == 30){j = n+1; console.log('*************')	}		
	}
	
	return arr;
	
}

