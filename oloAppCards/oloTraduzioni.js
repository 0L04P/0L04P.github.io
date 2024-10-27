$(document).ready(function(){
 	btnCreaFile.addEventListener('click', async () => {		
		pCreaFile()
	});	
	
	btnLeggiFile.addEventListener('click', async () => {		
		pLeggiFile()
	});
	
	btnScriviFile.addEventListener('click', async () => {		
		//[fileHandle] = await window.showOpenFilePicker();
		//let testo = 'PROVAAAAAAAAAA';
		let testo = localStorage['olo_Traduzioni'];
		pScriviFile(testo, elenco);
	});	
	
	btnDuplicaLS.addEventListener('click', async () => {		
		pDuplicaLS()
	});
	if(localStorage["olo_Traduzioni"] === undefined || localStorage["olo_Traduzioni"] === 'undefined'){
		localStorage["olo_Traduzioni"] = JSON.stringify({"traduzioni" : []})
	}
	elenco()

})

function ClearLS(){
	localStorage["olo_Traduzioni"] = undefined;
	 location.reload();
}
function pDuplicaLS(){
	localStorage["olo_Traduzioni_" + Date.now()] = localStorage["olo_Traduzioni"] ;	
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
	return ''
}

function EliminaParolaDaArray(index){
	let a = JSON.parse(localStorage['olo_Traduzioni']);
	a.splice(index, 1);
	localStorage["olo_Traduzioni"] = JSON.stringify(a);
	console.log('Eliminata parola indice ' + index);
	elenco();
}	

function ModificaParolaDaArray(index){
	let a = JSON.parse(localStorage['olo_Traduzioni']);
	$('#txtDaTrad').val(a[index].parola)
	$('#txtNuovaTrad').val(a[index].traduzioni[0])
	
	if(confirm('Eliminare la parola salvata?')){
		EliminaParolaDaArray(index);
	};		
}	

function Pulisci(){
	$('#txtDaTrad').val('')
	$('#txtNuovaTrad').val('')
}

function elenco(){
	let a = JSON.parse(localStorage["olo_Traduzioni"])
	let sHTML = ''
	for (i=a.length -1; i>= 0; --i){
		sHTML += '<div class="col-xs-12 parolaCercata">'
		sHTML += '	<div class="col-xs-8" style="padding: 0 0 0 10px;">'
		sHTML += '		<b>' + a[i].parola  + '</b><br>'		
		for (j = 0; j< a[i].traduzioni.length; ++j){
			sHTML += a[i].traduzioni[j] +'<br>'
		}
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

function ApriBackup(){
	
	if($('#divBackup').is(':visible')){
		$('#divBackup').addClass('hidden')
		
		
	}else{
		$('#divBackup').removeClass('hidden')
		
	}
	
}
