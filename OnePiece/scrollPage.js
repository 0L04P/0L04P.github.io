var drag_StartY
//var drag_EndY;

$(document).ready(function(){	
	console.log('SCROLLPAGE.JS OK')
	drag_StartY = -1;
	//drag_EndY = -1;
});

function dragEnd(event){ 
	event.preventDefault();
	if(drag_StartY < 0){		
		drag_StartY = event.clientY;	
	}
}
 function allowDrop(ev) {   
	event.preventDefault();	
	if(event.clientY%15 == 0){
		//console.log('event.clientY =' + event.clientY)
		
		let piu_o_meno = 1;
		if(drag_StartY > event.clientY){
			piu_o_meno = -1;			
		}
		//console.log(piu_o_meno)
		let k = window.innerHeight * 0.30 * piu_o_meno;
		let currentScrollTop = window.scrollY;
		let newScrollTop = currentScrollTop + k
		
		$("html, body").animate({ scrollTop: newScrollTop}, 'fast'); 		
	}
}
function drag(event) { 
	drag_StartY = event.clientY;	
}
function drop(ev) { 
//debugger;   
 
  ev.preventDefault();
}


