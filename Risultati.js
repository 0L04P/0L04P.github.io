var testata = '';
 var oggi='';
 

 $(document).ready(function(){
	GestioneMenu();
	
	if (localStorage['MyApiKey'] == 'undefined'){	
		console.log('cambio api')	
		localStorage['MyApiKey'] = '501224a88dmsh2fcbd7f640a6f54p123732jsn90242d2d745c';
		localStorage['MyOtherApiKey'] = '46f1613b96msheee8098853bf83ep1d513ajsnd12cda8354af';
	}	
	if(localStorage['olo_APIcalls']!= 'undefined'){
		$('#calls').text(localStorage['olo_APIcalls']);	
	}else{
		$('#calls').text('-');	
	}
	
	try{
			
		let oggi = GetOggi().replaceAll('-', '');
		let ieri = GetIeri().replaceAll('-', '');
		if (localStorage['olo_API_Risultati'+oggi] != 'undefined'){
			SetRisultati(localStorage["olo_API_Risultati" + oggi], 1)
		}
		else if(localStorage['olo_API_Risultati'+ieri] != 'undefined'){
			SetRisultati(localStorage["olo_API_Risultati" + ieri], 1)
		}		
	}catch(error){
		console.log('Errrore in avvio: '+ error)		
	}	
 })
 
 Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function GestioneMenu(){
	$('#btnMenuRanking').on('click', function(){
		window.location.href = 'Ranking.html';
	});
	
	$('#btnMenuRisultati').on('click', function(){
		//window.location.href = 'Risultati.html';
	});
	
	$('#btnMenuAltro').on('click', function(){
		window.location.href = 'Altro.html';
	});
}
 
 function GetOggi(){	
	oggi = new Date();
	let anno = 1900 + oggi.getYear();
	let mese = 1+ oggi.getMonth();
	if (mese.toString().length == 1){mese = '0' + mese;}
	let giorno = oggi.getDate();
	oggi = anno + '-' + mese + '-' + giorno;
	return oggi;
 }
 
  function GetIeri(){	
	oggi = new Date();
	ieri = oggi.addDays(-1);
	let anno = 1900 + ieri.getYear();
	let mese = 1+ ieri.getMonth();
	if (mese.toString().length == 1){mese = '0' + mese;}
	let giorno = ieri.getDate();
	ieri = anno + '-' + mese + '-' + giorno;
	return ieri;
 }
 
  function FormattaDataToIta(data){		
	p = data.substr(0,10).split('-')
	return p[2] + '-' + p[1] + '-' +p[0];
 }
 
// Prende in input "atp" o "wta"
 function AggiornaRisultati(data, isIeri){
	 //se di ieri restituisco il valore salvato se presente	 
	

	 if (localStorage["olo_API_Risultati" + data.replaceAll('-', '')] != 'undefined' && isIeri == 1){
		 //console.log('uso il local st ');
		SetRisultati(localStorage["olo_API_Risultati" + data.replaceAll('-', '')], 1)	
	 }else
		{	 $.ajax({
				"async": true,
				"crossDomain": true,
				"url": "https://tennis-live-data.p.rapidapi.com/matches-by-date/" + data,   
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "tennis-live-data.p.rapidapi.com",
					"x-rapidapi-key": localStorage['MyApiKey']
					},
				success: function(output, status, xhr) { 		 
								
					//////////api = output;//////////////
					headers = xhr.getAllResponseHeaders("application/json");			
					// Convert the header string into an array of individual headers
					var arr = headers.trim().split(/[\r\n]+/);
					// Create a map of header names to values
					var testata = {};			
					//console.log("2");				
					arr.forEach(function (line) {
						var parts = line.split(': ');
						var header = parts.shift().replaceAll('-', '_');
						var value = parts.join(': ');
						testata[header] = value;
					});				 
						
					localStorage['olo_APIcalls'] = testata.x_ratelimit_requests_remaining +'/' +testata.x_ratelimit_requests_limit;
					$('#calls').text(localStorage['olo_APIcalls']);
					//salvo le API
					
					if (localStorage['olo_APIcalls'].substr(0,localStorage['olo_APIcalls'].indexOf('/')) == '1'){						
						let aux = localStorage['MyApiKey'];
						localStorage['MyApiKey'] = localStorage['MyOtherApiKey'];
						localStorage['MyOtherApiKey'] = aux;
					}
									 
					localStorage["olo_API_Risultati" + data.replaceAll('-', '')] = JSON.stringify(output);					
					SetRisultati(output, 0)
				 },
				 error: function(output) {
					//console.log("Error in API call:" + output);
				 }		
			  });
	}
	 
 }
 
 //modalita = classica o orizzontale
 function SetRisultati(output,  isLocalStorage){
	 $('#divRisultati').html('');
	if(isLocalStorage == 1){
		output= JSON.parse(output);
	}
	
	let sHTML = ''
	let sHTML_NomeTorneo = '';	
	let iNumTornei = output.results.length;
	//ciclo tutti i tornei e ne creo l'intestazione: nelle classi torneo0, torneo1  andrò ad appendere il codice html relativo
	for (let i = 0; i<= iNumTornei -1; ++i){		
		sHTML_NomeTorneo = `
			<div class='col-xs-12 divTitoloTorneo' style='margin-top:10px;'>
				<h5 class='titoloTorneo'>`
				+ output.results[i].tournament.name +', '+ output.results[i].tournament.city + ' (' + output.results[i].tournament.surface +')' + output.results[i].tournament.code +
		    `</div>
			<div class='col-xs-12 torneo torneo` + i + `' style='padding:0'></div>`;
		$('#divRisultati').append(sHTML_NomeTorneo);		
	}
	
	$('#dataRisultati').text(FormattaDataToIta(output.results[0].matches[0].date))
	
	for (let iTorneo = 0; iTorneo<= iNumTornei - 1; ++iTorneo){	
	//console.log('iTorneo' + iTorneo)
		sHTML = '';	
		
		for (let iPartita = 0; iPartita<= output.results[iTorneo].matches.length -1; ++iPartita){
			try{				
				let partita = output.results[iTorneo].matches[iPartita]; //partita.away || '-' || partita.away.ranking
				
				//console.log('iPartita' + iPartita)
				let rnk_home, rnk_away;
				
				if (partita.away && partita.away.ranking){
					rnk_away = partita.away.ranking;
				}else{
					rnk_away ='';
				}
				if (partita.home && partita.home.ranking){
					rnk_home = partita.home.ranking;
				}else{
					rnk_home ='';
				}
				let identificativo = + iTorneo.toString() +iPartita.toString();
				let sHTML_partita = `<div class='col-xs-12 divRisultato'>
					<!--giocatori-->
					<div class='col-xs-12 col-sm-2 col-md-3 NoPad'></div>					
					<div class='col-xs-6 col-sm-4 col-md-3 NoPad'  style='text-align:right; padding-riht: 5px;'>
						<label class='NoPad rnk'>&nbsp;(` +  rnk_home + `)</label><label id="lblH` +  identificativo + `"class='NoPad giocatoreHome'>` +  partita.home_player  + `</label>
					</div>
					<div class='col-xs-6 col-sm-4 col-md-3 NoPad' style='text-align:left; padding-left: 5px;'>
						<label id="lblA` +  identificativo + `" class='NoPad giocatoreAway' style='font-size:15px'>` + (partita.away_player) + `</label><label class='NoPad rnk'>(` +  rnk_away + `)&nbsp;</label>
					</div>
					<div class='col-xs-12 col-sm-2 col-md-3 NoPad'></div>
					<div class='col-xs-12'></div>
					<!--risultati-->
					
					<div class='col-xs-2 col-sm-2 divLive NoPad'  style='padding: 0px 0px 0px 10px'>
						<span class="badge badge-pill badgeLive">LIVE</span>
					</div>
					<div  id="FlagHome"  class='col-xs-2 col-sm-4 NoPad AlignRight' style='padding: 0;'>
						<label style='margin-left:-15px;' id="bandHome` + identificativo +`"></label>					
					</div>					
					<div class='col-xs-4 col-sm-2 NoPad'  style='text-align:center;'>						
						<label style='font-size:15px'>` + getRisultati(partita.status, partita.result, iPartita) + `</label>
					</div>
					<div id="FlagAway" class='col-xs-2 col-sm-2 NoPad AlignLeft'>
						<label style='margin-right:-15px;' id="bandAway` + identificativo +`"></label>
					</div>											
					<div class='col-xs-2 col-sm-2 divRound NoPad' style='padding: 0px 0px 0px 10px'>
						<span class="badge badge-pill badgeRound">` + partita.round_name +`</span>
					</div>
				</div>`;
				
				let b = false;
				if  (partita.result != null && (partita.result.result_description == 'Ended' || partita.result.result_description == 'Walkover') )
					{ b= true;} 		
				if ( output.results[iTorneo].matches[iPartita].result && output.results[iTorneo].matches[iPartita].result.winner_id && b){
					if (output.results[iTorneo].matches[iPartita].result.winner_id == output.results[iTorneo].matches[iPartita].away_id){					
						sHTML_partita = sHTML_partita.replace('giocatoreAway','giocatoreAway vincitore')
					}else{
						sHTML_partita = sHTML_partita.replace('giocatoreHome','giocatoreHome vincitore')	
					}					
				}
				
				if(partita.status != 'inprogress'){
					sHTML_partita = sHTML_partita.replaceAll('badgeLive', 'hidden'); 
				}
				sHTML += sHTML_partita					 
				
			}catch(error){
				debugger;
				console.error(error);			
				console.log('iPartita: ' + iPartita)
				console.log('iTorneo: ' + iTorneo)								
			}
		}	
		$('.torneo' + iTorneo).append(sHTML);
	
	}	
	
	SetFlagRis(output, iNumTornei);
}

function getRisultati(status, result, iPartita){
	let sRet ='';
		try{
	//verifico lo stato della partita	
	switch(status){
		
		case 'canceled':
			return '<i style="font-size: 13px; padding-top: 5px">Cancellata</i>'
			break;
		case 'notstarted':
			return '<i style="font-size: 13px; padding-top: 5px">Non iniziata</i>'
			break;
		case 'finished':			
			break;
		case 'inprogress':			
			break;
	}
	
	if( result == null || result == 'null' || result == undefined || result == 'undefined'){
		return '';
	}	
	
	if (result.away_set1 != undefined){
		sRet += result.home_set1 +''+ result.away_set1 + ' ';
		sRet += getTieBreakResult(result, 1);
		
		if (result.home_set2 != undefined){
			sRet += result.home_set2 +''+result.away_set2 + ' ';
			sRet += getTieBreakResult(result, 2);
			
			if (result.home_set3 != undefined){
				sRet += ' ' + result.home_set3 +''+result.away_set3;
				sRet += getTieBreakResult(result, 3);
				
				if (result.home_set4 != undefined){
				sRet += ' ' + result.home_set4 +''+result.away_set4;
				sRet += getTieBreakResult(result, 4);

				if (result.home_set5 != undefined){
					sRet += ' ' + result.home_set5 +''+result.away_set5;
					sRet += getTieBreakResult(result, 5);				
					}				
				}
			}
		}		
	}
	}
	catch(ex){
		//console.log('ERRORE nella getRisultati:'+ ex)
	}
	 if (result.result_description == 'Walkover'){
		 sRet = sRet.replaceAll('NaN', ' ');
		 sRet = sRet.replaceAll('N/A', ' ');
		 sRet += '<i style="font-size: 13px; padding-top: 5px">Ritiro</i>'
	 }
	 if (status == 'inprogress'){
		 sRet = sRet.replaceAll('NaN', ' ');
		 sRet = sRet.replaceAll('N/A', ' ');		 
	 }
	return sRet;
}

function getTieBreakResult(result, index){
	let tb = '';
	let h, a, h_tb, a_tb;
	
	switch(index){		
		case 1: 
		h = result.home_set1;
		a = result.away_set1;
		h_tb = result.home_tb1;
		a_tb = result.away_tb1;			 
			break;		
		case 2:
			h = result.home_set2;
			 a = result.away_set2;
			h_tb = result.home_tb2;
			a_tb = result.away_tb2;					 
			break;		
		case 3:
			h = result.home_set3;
			a = result.away_set3;
			h_tb = result.home_tb3;
			a_tb = result.away_tb3;				
			break;
		case 4:
			 h = result.home_set4;
			a = result.away_set4;
			h_tb = result.home_tb4;
			a_tb = result.away_tb4;	
			break;
		case 5:
			h = result.home_set5;
			a = result.away_set5;
			h_tb = result.home_tb5;
			a_tb = result.away_tb5;	
			break;			
		default:
			tb = '';
	}
	 
	if (h != undefined && a != undefined){
			if (parseInt(h) + parseInt(a) >= 13){	//CON IL >=13 CONTEMPLO ANCHE IL TB SUL 12-12 DEL QUINTO SET A WIMBLEDON
				tb = '(' + (Math.min(parseInt(h_tb), parseInt(a_tb))) + ')'	;
				if (isNaN(tb)){tb = '';}
				
			}								
		}		
	return tb;	
}

 function SetFlagRis(output, iNumTornei){	 
	for (let iTorneo = 0; iTorneo<= iNumTornei - 1; ++iTorneo){					
		for (let iPartita = 0; iPartita<= output.results[iTorneo].matches.length -1; ++iPartita){
			try{		
				//console.log('iTorneo' + iTorneo + ' --- iPartita'  + iPartita)			
				let partita = output.results[iTorneo].matches[iPartita]; 								
				
				const parentElement = document.getElementById("bandHome" + iTorneo.toString() +iPartita.toString());
				if(partita && partita.home && partita.home.country){
					const flag = new CountryFlag(parentElement).selectByName(partita.home.country);
					//console.log('1' + iTorneo + ' --- iPartita'  + iPartita)
				}
				GestioneFont('H' + iTorneo.toString() +iPartita.toString());
				
				const parentElement2 = document.getElementById("bandAway" + iTorneo.toString() +iPartita.toString());
				if(partita && partita.away && partita.away.country){
					const flag2 = new CountryFlag(parentElement2).selectByName(partita.away.country);
					//console.log('2' + iTorneo + ' --- iPartita'  + iPartita)
				}		
				GestioneFont('A' + iTorneo.toString() +iPartita.toString());
			}
			catch(error){
				console.log('ERRORE IN iTorneo' + iTorneo + ' --- iPartita'  + iPartita)
				console.error(error);	
			}
		}
	}
 }	
				
function GestioneFont(id){
//debugger;
	//let id = ID.toString.replace('lbl', '');
	let a = $('#lbl' + id).parent().css('width');
	let b = $('#lbl' + id).css('width');
	if (a.replaceAll('px', '') - b.replaceAll('px', '')  < 30){
		console.log(id+ '1)' + (a.replaceAll('px', '') - b.replaceAll('px', '')))
		$('#lbl' + id).css('font-size', '13px')		
	}
	//ulteriore controllo:
	a = $('#lbl' + id).parent().css('width');
	b = $('#lbl' + id).css('width');
	if (a.replaceAll(id + 'px', '') - b.replaceAll('px', '')  < 40){
		console.log('2)' + (a.replaceAll('px', '') - b.replaceAll('px', '')))
		$('#lbl' + id).css('font-size', '12px')		
	}

	
}				


function ViewLive(bool){	
	if(bool){
		$('.divRisultato').css('display', 'none');
		$('.badgeLive').parent().parent().css('display', '');

		$('#badgeLiveToggle').removeClass('badgeLiveToggle');
		$('#badgeLiveToggle').addClass('badgeLiveToggleChecked');		
	}else{
		$('.divRisultato').css('display', '');

		$('#badgeLiveToggle').addClass('badgeLiveToggle');
		$('#badgeLiveToggle').removeClass('badgeLiveToggleChecked');			
	}
}