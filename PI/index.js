
const RIGHE = 10;

$(document).ready(function(){
	$('#txtN').val(1000)
	DisegnaDati($('#txtN').val())	
})

function Approssima(raggio_MAX){
	let obj = {}
	raggio_MAX = parseInt(raggio_MAX);
	for(let i = raggio_MAX-RIGHE+1; i<=raggio_MAX; ++i){		
		obj[i] = pApprossima(i);		
	}	
	return obj;
}

function pApprossima(raggio){
	raggio = parseInt(raggio);
	let raggio_al_quadrato = raggio*raggio;
	let iAreaQuadrato = 4*raggio_al_quadrato;
	let iAreaCerchio = 0;
	let iDist=0;
	for(let x = -raggio; x<=raggio; ++x){
		for(let y = -raggio; y<=raggio; ++y){			
			iDist = x*x+y*y;
			if(iDist <= raggio_al_quadrato){
				iAreaCerchio+=1;
			}			
		}					
	}
	
	let k = iAreaCerchio / iAreaQuadrato;
	let stima_PI = 4*k;
	
	return stima_PI;	
}

function DisegnaDati(raggio_MAX){
	showloading();
	setTimeout(function () {
		
		if(raggio_MAX == undefined) raggio_MAX = $("#txtN").val();
		let obj = Approssima(raggio_MAX);
		
		let sHTML = `<table>
					<tr>
						<th>Raggio</th>				
						<th>&#960;</th>				
						<th>Precisione</th>				
					</tr>`
		for(let i = raggio_MAX; i>=raggio_MAX-RIGHE+1; --i){
			sHTML += ` <tr>
					<td>${i}</td>
					<td>${obj[i]}</td>
					<td>${Math.PI - obj[i]}</td>
				  </tr>`  
		}				
		sHTML+=`	</table>`;				

		$('#divAppr').html(sHTML);
	
	}, 300); 
	
}


const sSVG = `<div id="loader" class="loader"></div>`


function showloading(){	
	$('#divAppr').html(sSVG);
}
