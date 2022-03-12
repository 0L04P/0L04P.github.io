var testata = '';
 var oggi='';
 

 $(document).ready(function(){
	GestioneMenu();
	//debugger;

	//per non fare troppe chiamate alla API, mi salvo i dati (rankingATP e rankingWTA)
	//per fare ciò mi salvo il lunedì relativo alla pubblicazione dei ranking
	//SalvaData();
	//procedo quindi a calcolare, a partire da oggi l'ultimo lunedì in cui si è pubblicato un ranking
	//VerificaData("501224a88dmsh2fcbd7f640a6f54p123732jsn90242d2d745c");	              
	//testAPI('ATP', "501224a88dmsh2fcbd7f640a6f54p123732jsn90242d2d745c");
	//$('#calls').text(localStorage['olo_APIcalls']);
	//$('#btnATP').click();
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
 
  function FormattaData(data){		
	p = data.substr(0,10).split('-')
	return p[2] + '-' + p[1] + '-' +p[0];
 }
 
// Prende in input "atp" o "wta"
 function AggiornaRisultati(data, isIeri){
	  //console.log('data ' + data);
	   //console.log('isIeri ' + isIeri);
	 //se di ieri restituisco il valore salvato se presente
	 SetRisultati(localStorage["olo_API_Risultati" + data.replaceAll('-', '')], data)
	 /*
	 if (1!=1 &&localStorage["olo_API_Risultati" + data.replaceAll('-', '')] != 'undefined' && isIeri == 1){
		 //console.log('uso il local st ');
		SetRisultati(localStorage["olo_API_Risultati" + data.replaceAll('-', '')], data)	
	 }else
		{//console.log('NON uso il local st ');
		 //console.log("oggi:")
		  //console.log("oggi" + oggi)
		 $.ajax({
				"async": true,
				"crossDomain": true,
				"url": "https://tennis-live-data.p.rapidapi.com/matches-by-date/" + data,   
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "tennis-live-data.p.rapidapi.com",
					"x-rapidapi-key": APIkey
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
									 
					localStorage["olo_API_Risultati" + data.replaceAll('-', '')] = JSON.stringify(output);
					//salvo il codice HTML
					
					//console.log('output:');
					//console.log(output);
					SetRisultati(output, data)
				 },
				 error: function(output) {
					//console.log("Error in API call:" + output);
				 }		
			  });
	}*/
	 
 }
 
 function SetRisultati(output, data){
	 $('#divRisultati').html('');
	output= JSON.parse(output);
	 
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
	
	$('#dataRisultati').text(FormattaData(output.results[0].matches[0].date))
	
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
				
				let sHTML_partita = `<div class='col-xs-12 divRisultato'>
					<!--giocatori-->
					<div class='col-xs-12 col-sm-2 col-md-3 NoPad'></div>
					<div class='col-xs-6 col-sm-4 col-md-3 NoPad' style='text-align:right;'>
						<label class='rnk'>(` +  rnk_away + `)&nbsp;</label><label class='giocatoreAway' style='font-size:18px'>` + (partita.away_player) + `</label>
					</div>
					<div class='col-xs-6 col-sm-4 col-md-3 NoPad'  style='text-align:left;'>
						<label class='giocatoreHome'>` +  partita.home_player  + `</label><label class='rnk'>&nbsp;(` +  rnk_home + `)</label>
					</div>
					<div class='col-xs-12 col-sm-2 col-md-3 NoPad'></div>
					<div class='col-xs-12'></div>
					<!--risultati-->
					<div id="FlagAway" class='col-xs-3 col-sm-4 NoPad AlignRight'><label style='margin-right:-15px;' id="bandAway` + iTorneo.toString() +iPartita.toString() +`"></label></div>
					<div class='col-xs-6 col-sm-4 NoPad'  style='text-align:center;'>
						<label style='font-size:18px'>` + getRisultati(partita.status, partita.result, iPartita) + `</label>
					</div>			
					<div  id="FlagHome"  class='col-xs-3 col-sm-4 NoPad AlignLeft' style='padding: 0;'><label style='margin-left:-15px;' id="bandHome` + iTorneo.toString() +iPartita.toString() +`"></label></div>					
						<span class="badge badge-pill round">R16</span>
					</div>
				</div>`;
				
			
				if ( output.results[iTorneo].matches[iPartita].result && output.results[iTorneo].matches[iPartita].result.winner_id){
					if (output.results[iTorneo].matches[iPartita].result.winner_id == output.results[iTorneo].matches[iPartita].away_id){					
						sHTML_partita = sHTML_partita.replace('giocatoreAway','giocatoreAway vincitore')
					}else{
						sHTML_partita = sHTML_partita.replace('giocatoreHome','giocatoreHome vincitore')	
					}					
				}
				sHTML += sHTML_partita					 
				
			}catch(error){
				console.error(error);			
				console.log('iPartita: ' + iPartita)
				console.log('iTorneo: ' + iTorneo)								
			}
		}	
		$('.torneo' + iTorneo).append(sHTML);
	
	}	
	
	console.log('parto')
		SetFlagRis(output, iNumTornei);
	//$('#divRisultati').append(sHTML);
	//salvo il codice HTML
	/*if(s == "atp"){
		localStorage["olo_HtmlATP"] = sHTML;	
	}else{
		localStorage["olo_HtmlWTA"] = sHTML;		
	}	*/	
}

function getRisultati(status, result, iPartita){
	let sRet ='';
		try{
	
	//verifico lo stato della partita	
	switch(status){
		
		case 'canceled':
			return '<i>Cancellata</i>'
			break;
		case 'notstarted':
			return '<i>Non iniziata</i>'
			break;
		case 'finished':			
			break;
		case 'inprogress':			
			break;
	}
	
	if( result == null || result == 'null' || result == undefined || result == 'undefined'){
		return '';
	}
	
	let r = 0
	//debugger;
	if (result.away_set1 != undefined){
		sRet += result.away_set1 +''+ result.home_set1 + ' ';
		sRet += getTieBreakResult(result, 1);
		
		if (result.away_set2 != undefined){
			sRet += result.away_set2 +''+result.home_set2 + ' ';
			sRet += getTieBreakResult(result, 2);
			
			if (result.away_set3 != undefined){
				sRet += ' ' + result.away_set3 +''+result.home_set3;
				sRet += getTieBreakResult(result, 3);
				
				if (result.away_set4 != undefined){
				sRet += ' ' + result.away_set4 +''+result.home_set4;
				sRet += getTieBreakResult(result, 4);

				if (result.away_set5 != undefined){
					sRet += ' ' + result.away_set5 +''+result.home_set5;
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
		//console.log('getRisultati '+ sRet);
	return sRet;
}

function getTieBreakResult(result, index){
	let tb = '';
	let h, a, h_tb, a_tb;
	//debugger;
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
				tb = '(' + (Math.min(parseInt(h_tb), parseInt(a_tb))) + ')'					
			}								
		}		
	return tb;	
}

 function SetFlagRis(output, iNumTornei){
	 console.log('partito')
	for (let iTorneo = 0; iTorneo<= iNumTornei - 1; ++iTorneo){					
		for (let iPartita = 0; iPartita<= output.results[iTorneo].matches.length -1; ++iPartita){
			try{		
				console.log('iTorneo' + iTorneo + ' --- iPartita'  + iPartita)			
				let partita = output.results[iTorneo].matches[iPartita]; 								
				
				const parentElement = document.getElementById("bandHome" + iTorneo.toString() +iPartita.toString());
				if(partita && partita.home && partita.home.country){
					const flag = new CountryFlag(parentElement).selectByName(partita.home.country);
					console.log('1' + iTorneo + ' --- iPartita'  + iPartita)
				}
				
				const parentElement2 = document.getElementById("bandAway" + iTorneo.toString() +iPartita.toString());
				if(partita && partita.away && partita.away.country){
					const flag2 = new CountryFlag(parentElement2).selectByName(partita.away.country);
					console.log('2' + iTorneo + ' --- iPartita'  + iPartita)
				}																
			}
			catch(error){
				console.log('ERRORE IN iTorneo' + iTorneo + ' --- iPartita'  + iPartita)
				console.error(error);	
			}
		}
	}
 }	
				