function GetSoluzione(){
	
	$('.card').css('transform','rotateY(180deg)') 
}

function NextCard(i){
	if(i==0){
		//NON ho guardato la soluzione
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
	let a = [...JSON.parse(localStorage["olo_Traduzioni"])]
	let i = Math.floor(Math.random() * a.length);	 		
	$('#lblParola').text(a[i].parola)
	$('#lblParolaCopia').text(a[i].parola)
	$('#lblSoluzione').text(a[i].traduzioni)
}