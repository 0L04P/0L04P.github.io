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
		   debugger;
		 const t = await navigator.clipboard.readText()
		// document.querySelector('txtDaTrad').value += text;
		 $('#txtNuovaTrad').val(t)
	   } catch (error) {
		 console.log('Failed to read clipboard');
	   }
	});
	 
 
	if(localStorage["olo_Traduzioni"] === undefined || localStorage["olo_Traduzioni"] === 'undefined'){
		localStorage["olo_Traduzioni"] = JSON.stringify({"traduzioni" : []})
	}
	elenco()

})

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
	let a = JSON.parse(localStorage["olo_Traduzioni"]).sort( (a,b) => (a.parola.trim().toLowerCase() < b.parola.trim().toLowerCase()) ? 1 : -1  )
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