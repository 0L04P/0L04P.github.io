var esatte, sbagliate;

$(document).ready(function(){
	pPopolaCarte()
	esatte = 0;
	sbagliate = 0;
});	

function GetSoluzione(){
	sbagliate += 1;
	pSetRis();
	$('.card').css('transform','rotateY(180deg)') 
}

function NextCard(i){
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
		let a = [...JSON.parse(localStorage["olo_Traduzioni"])]
		let i = Math.floor(Math.random() * a.length);	 		
		$('#lblParola').text(a[i].parola)
		$('#lblParolaCopia').text(a[i].parola)
		$('#lblSoluzione').text(a[i].traduzioni)	
	}
		
}

function pSetRis(){
	if(esatte > 0 || sbagliate > 0){
		let t = parseInt(esatte) + parseInt(sbagliate);
		$('#lblEsito').text('Sbagliate: ' + sbagliate + ' su ' + t);
		$('#lblEsito').css('display', '');
	}
}