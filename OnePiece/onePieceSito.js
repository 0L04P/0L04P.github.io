var installPrompt = null;
$(document).ready(function(){
	pPopolaCmbVolumi()
	window.addEventListener("beforeinstallprompt", (event) => {
		event.preventDefault();
		installPrompt = event;			
	});
	
	if(localStorage["capitolo"] != undefined && localStorage["capitolo"] > 0){			
		$('#txtCap').val(parseInt(localStorage["capitolo"]))
		creaCapitolo(true)		
	}	

	pGestioneImgNoSource()
	
});

				
$(document).on('scroll', function(){
	//localStorage["capitolo_scroll"] = window.scrollY
})

const MAX_NUM_PAGINE= 25;
function pCreaCapitolo(numeroVolume, bScroll = false){	
	let numeroCapitolo = $('#txtCap').val();
	if(numeroCapitolo < 100){
		numeroCapitolo = PageNumberToString(numeroCapitolo,3)
	}		
	localStorage["capitolo"] = numeroCapitolo;
	localStorage["numeroVolume"] = numeroVolume;
	$('#cmbVolume').val(numeroVolume);
	let chapter = ChapterNumberToString($('#txtCap').val());
	let imageUrls = [];	
	let baseUrl = `https://onepiecepower.com/manga8/onepiece/volumi/volume${numeroVolume}/${numeroCapitolo}/`;
	for(let k = 1; k<=MAX_NUM_PAGINE;++k){
		imageUrls.push(baseUrl + PageNumberToString(k,2)+ '.jpg');
	}
		
	let sHTML = ``;
	imageUrls.forEach(function(el, index){
		let lblClassi = 'lblNumeroPagina ';
		if (index <= 9){
			lblClassi += ' pagina_singola_cifra'
		}
		let isLazy = ''	
		if(index > 0){  isLazy = ' loading="lazy" '}
		sHTML+= `
			<div id='divNumPag_${index}' class="divNumeroPagina" style='display:none;'>
				<label class='${lblClassi}'>${index}</label>
			</div>			
			<img id='img_${index}' src=${el} class='pagina' onError='aaa(this);  ' ${isLazy} />
		`;
		
	})
	$('.MyPagina').html(sHTML);
		
	if(bScroll && localStorage["capitolo_scroll"] && localStorage["capitolo_scroll"] > 0){
			let s = localStorage["capitolo_scroll"] ;
			localStorage["capitolo_scroll"]  = 0;
			$("html, body").animate({ scrollTop: s}, 'fast'); 
			return false;
	}
	pGestioneImgNoSource()
}

function creaCapitolo(){
	let numeroCapitolo = $('#txtCap').val();
	let numeroVolume = getVolumeFromPage(numeroCapitolo);
	$('#cmbVolume').val(numeroVolume);
	pCreaCapitolo(numeroVolume, false);
	/*
	pCheckImageExists(numeroCapitolo,numeroVolume )
		.then(exists => {
			//console.log(exists ? 'Image exists' : 'Image does not exist');
			if(exists){				
				console.log('Image exists' );
				pCreaCapitolo(numeroVolume, false);
			}else{
				console.log('Image does not exist');
			}
		});	
	*/
}


async function pCheckImageExists(numeroCapitolo, numeroVolume) {
    try {				
		let url = `https://onepiecepower.com/manga8/onepiece/volumi/volume${numeroVolume}/${numeroCapitolo}/01.jpg`;        
		console.log('prova con url')
		console.log(url)
		const response = await fetch(url, {
			method: 'HEAD',
			mode: 'no-cors' // This disables CORS restrictions
		});
        return response.ok; // True if status is 200-299
    } catch (error) {
        return false; // Error means the image does not exist
    }
}

function pGestioneImgNoSource(){			
	console.log('*********pGestioneImgNoSource***********')
		var images = document.querySelectorAll('img');
		images.forEach(function (img) {
		img.onerror = function () {
			img.classList.add('hidden');					
			let k = img.id.replace("img_", "");
			$('#divNumPag_' + k).css('display', 'none');
		};
		img.onload = function () {
			let k = img.id.replace("img_", "");
			//$('#divNumPag_' + k).css('display', '');
		};
	});		
}

//ritorna una string del tipo "005"
function PageNumberToString(page, lunghezza){
	let res = '000' + page;
	return res.substr(res.length - lunghezza,lunghezza);
}
function ChapterNumberToString(page){
	let res = '0000' + page;
	return res.substr(res.length - 4,4);
}
function ToTop(){	
	$("html, body").animate({ scrollTop: 0 }, 'fast'); 
	return false;
}
function ToBottom(){	
	$("html, body").animate({ scrollTop: 40000 }, 'slow'); 
}

async function INSTALLA_PWA(){
			/* Uncaught (in promise) DOMException: 
   			Failed to execute 'prompt' on 'BeforeInstallPromptEvent': The prompt() method must be called with a user gesture
   			*/
			if (!installPrompt) {
				return false;
			}
			const result = await installPrompt.prompt();
			console.log(`Install prompt was: ${result.outcome}`);
		} 
		
		
function pPopolaCmbVolumi(){
	let sHTML = '';
	for (let i = 1; i<=120; ++i){
		sHTML += `<option value="${i}">${i}</option>`		
	}
	
	$('#cmbVolume').html(sHTML);
}		
		
		
		
		
		
		
function getVolumeFromPage(p){
	let ret = '';
	if(p.toString().length <= 3){
		ret = objVolumi['CAP' + PageNumberToString(p,3)]		
	}else{
		ret = objVolumi['CAP' + PageNumberToString(p,4)]
	}	
	if(!ret){
		ret = Math.floor(p/10) - 1
	}
	return ret.replace('VOL', '');
}		