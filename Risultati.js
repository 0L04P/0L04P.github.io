var testata = '';
 var oggi='';
 

 $(document).ready(function(){
	GestioneMenu();
		
	if (localStorage['MyApiKey'] == 'undefined' || localStorage['MyApiKey'] == undefined){	
		console.log('cambio api')	
		localStorage['MyApiKey'] = '501224a88dmsh2fcbd7f640a6f54p123732jsn90242d2d745c';
		localStorage['MyOtherApiKey'] = '46f1613b96msheee8098853bf83ep1d513ajsnd12cda8354af';
	}	
	if(localStorage['olo_APIcalls']!= 'undefined' && localStorage['olo_APIcalls']!= undefined){
		$('#calls').text(localStorage['olo_APIcalls']);	
	}else{
		$('#calls').text('-');	
	}
	
	try{
			
		let oggi = GetOggi().replaceAll('-', '');
		let ieri = GetIeri().replaceAll('-', '');
		if (localStorage['olo_API_Risultati'+oggi] != 'undefined' && localStorage['olo_API_Risultati'+oggi] != undefined){
			SetRisultati(localStorage["olo_API_Risultati" + oggi], 1)
		}
		else if(localStorage['olo_API_Risultati'+ieri] != 'undefined' && localStorage['olo_API_Risultati'+ieri] != undefined){
			SetRisultati(localStorage["olo_API_Risultati" + ieri], 1)
		}		
	}catch(error){
		console.log('Errrore in avvio: '+ error)		
	}	
	
	ViewRis(localStorage['olo_ModalitaView']);
	$('#toggleModalita').prop('checked', localStorage['olo_ModalitaView'])
	
 })
 
/*Date.prototype.addHours = function(d, h) { 
debugger;
  	var date = new Date(d);
    //date.setDate(date.getDate() + + (h*60*60*1000));
    return date;
}*/
 
 Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;	
}

 function getOraIta(data){
 let d = new Date(data); //adatta automaticamente il fuso orario!
	//d = d.addHours(data, 1);
	let min = d.getMinutes(); 
	if (min.toString().length == 1) min = '0' + min;
	let ret = d.getDate()+'/'+(d.getMonth()+1) + ' ' + d.getHours() + ':' + min;
	
	return ret;  
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
 function AggiornaRisultati(data, isIeri, UsaLocalStorage){
	 //se di ieri restituisco il valore salvato se presente	 
	
	//14/3/22 evitodi usare i local storage
	 if (UsaLocalStorage && localStorage["olo_API_Risultati" + data.replaceAll('-', '')] != 'undefined' && isIeri == 1){
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
	$('#divRisFlex').html('');
	if(isLocalStorage == 1){
		output= JSON.parse(output);
	}
	
	let sHTML = ''
	let sHTML_flex = ''
	let sHTML_NomeTorneo = '';	
	let iNumTornei = output.results.length;
	//ciclo tutti i tornei e ne creo l'intestazione: nelle classi torneo0, torneo1  andrò ad appendere il codice html relativo
	for (let i = 0; i<= iNumTornei -1; ++i){		
		sHTML_NomeTorneo = `
			<div class='col-xs-4 divTitoloTorneo' onclick='EffettoGrafico(${i})'>tournamentcode</div>
			<div class='col-xs-8 divTitoloTorneo' onclick='EffettoGrafico(${i})' style='margin-top:10px;'>
				<h5 class='titoloTorneo'>`
				+ output.results[i].tournament.name +', '+ output.results[i].tournament.city + '&nbsp; (' + output.results[i].tournament.surface +')' + //output.results[i].tournament.code +
		    `</div>
			<div class='col-xs-12 torneo torneo` + i + `' style='padding:2px; background-color:#abcdef;'></div>
			<div class='col-xs-12 torneoFlex torneoFlex` + i + ` flex-container' style='margin-top: 5px; padding: 7px; white-space: nowrap; overflow-x: auto; height: 160px;'></div>`;
				
		if(output.results[i].tournament.code.toUpperCase() == 'ATP'){
			sHTML_NomeTorneo = sHTML_NomeTorneo.replace("tournamentcode", svgATP).replaceAll("divTitoloTorneo", "divTitoloTorneo atp");			
		}else{
			sHTML_NomeTorneo = sHTML_NomeTorneo.replace("tournamentcode", svgWTA).replaceAll("divTitoloTorneo", "divTitoloTorneo wta");	
		}
		
		$('#divRisultati').append(sHTML_NomeTorneo);	
	}
	
	
	$('#dataRisultati').text(FormattaDataToIta(output.results[0].matches[0].date))
	
	for (let iTorneo = 0; iTorneo<= iNumTornei - 1; ++iTorneo){	
	//console.log('iTorneo' + iTorneo)
		sHTML = '';	
		sHTML_flex = ''
		for (let iPartita = 0; iPartita<= output.results[iTorneo].matches.length -1; ++iPartita){
			try{				
				let partita = output.results[iTorneo].matches[iPartita];
				
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
				let arrPunteggiHome_flex = [];
				let arrPunteggiAway_flex = [];
				let identificativo = + iTorneo.toString() +iPartita.toString();
				let quando = ''; 
				let classeDataOra = 'hidden';
			
				if(partita.status == 'notstarted'){
					quando = getOraIta(partita.date)
					classeDataOra = 'divDataOra'; 
				}
				let sHTML_partita = `<div class='col-xs-12 divRisultato'>
					<!--giocatori-->
					<div class='col-xs-12 col-sm-2 col-md-3 NoPad'></div>					
					<div class='col-xs-6 col-sm-4 col-md-3 NoPad'  style='text-align:right; padding-riht: 5px;'>
						<label class='NoPad rnk'>&nbsp;(` +  rnk_home + `)</label><label id="lblH` +  identificativo + `"class='NoPad giocatoreHome'>` +  CheckNomeGiocatore(partita.home_player)  + `</label>
					</div>
					<div class='col-xs-6 col-sm-4 col-md-3 NoPad' style='text-align:left; padding-left: 5px;'>
						<label id="lblA` +  identificativo + `" class='NoPad giocatoreAway' style='font-size:15px'>` + CheckNomeGiocatore(partita.away_player) + `</label><label class='NoPad rnk'>(` +  rnk_away + `)&nbsp;</label>
					</div>
					<div class='col-xs-12 col-sm-2 col-md-3 NoPad'></div>
					<div class='col-xs-12'></div>
					<!--risultati-->
					
					<div class='col-xs-2 col-sm-2 divLive NoPad'  style='padding: 0px 0px 0px 10px'>
						<span class="badge badge-pill badgeLive">LIVE</span>
					</div>
					<div class='col-xs-2 col-sm-2 ` + classeDataOra + ` NoPad'  style='padding: 0px 0px 0px 10px;'>
						<label id='` + identificativo + `dataOra'>` +  quando + `</label>
					</div>
					<div  id="FlagHome"  class='col-xs-2 col-sm-4 NoPad AlignRight' style='padding: 0;'>
						<label style='margin-left:-15px;' id="bandHome` + identificativo +`"></label>					
					</div>					
					<div class='col-xs-4 col-sm-2 NoPad'  style='text-align:center;'>						
						<label style='font-size:15px; color:#ddd; font-weight:500px;'>` + getPunteggioiPartita(partita.status, partita.result, iPartita, arrPunteggiHome_flex, arrPunteggiAway_flex) + `</label>
					</div>
					<div id="FlagAway" class='col-xs-2 col-sm-2 NoPad AlignLeft'>
						<label style='margin-right:-15px;' id="bandAway` + identificativo +`"></label>
					</div>											
					<div class='col-xs-2 col-sm-2 divRound NoPad' style='padding: 0px 0px 0px 10px'>
						<span class="badge badge-pill badgeRound">` + gestioneRound(partita.round_name) +`</span>
					</div>
				</div>`;
				
				
				sHTML_partita_flex = `
				<div id='ris1`+ iTorneo + iPartita  +`' class="divRisultatoFlex" style="width:300px;">
					<div id='row`+ iTorneo + iPartita  +`' class='row' style='padding-left: 24px; margin-top:-10px;'>				
						<table id='t`+ iTorneo + iPartita  +`'  class='tableRis'>
							<tr>
								<td style='padding-right: 10px;'>
									<div class='col-xs-2 col-sm-4 NoPad AlignRight' style='padding: 0;'>
										<label style='margin-left:-15px;' id="bandHomeFlex` + identificativo +`"></label>					
									</div>
								</td>
								<td>(` +  rnk_home + `)</td>
								<td class='giocatoreHome'>`+  CheckNomeGiocatore(partita.home_player)  +`</td>
								<td>` + NZ(arrPunteggiHome_flex[0]) + `</td>
								<td>` + NZ(arrPunteggiHome_flex[1]) + `</td>
								<td>` + NZ(arrPunteggiHome_flex[2]) + `</td>
								<td>` + NZ(arrPunteggiHome_flex[3]) + `</td>
								<td>` + NZ(arrPunteggiHome_flex[4]) + `</td>
							</tr>
							<tr>
								<td style='padding-right: 10px;'>
								<div class='col-xs-2 col-sm-4 NoPad AlignRight' style='padding: 0;'>
										<label style='margin-left:-15px;' id="bandAwayFlex` + identificativo +`"></label>					
									</div>
								</td>
								<td>(` +  rnk_away + `)</td>
								<td class='giocatoreAway'>`+  CheckNomeGiocatore(partita.away_player)  +`</td>
								<td>` + NZ(arrPunteggiAway_flex[0]) + `</td>
								<td>` + NZ(arrPunteggiAway_flex[1]) + `</td>
								<td>` + NZ(arrPunteggiAway_flex[2]) + `</td>
								<td>` + NZ(arrPunteggiAway_flex[3]) + `</td>
								<td>` + NZ(arrPunteggiAway_flex[4]) + `</td>
							</tr>
						</table>
						<div class='col-xs-12'>
							<div class='col-xs-6 divRound NoPad' style='padding: 0px 0px 0px 10px'>
								<span class="badge badge-pill badgeRound">`+ partita.round_name +`</span>
							</div>
							<div class='col-xs-6 divLive NoPad'  style='padding: 0px 0px 0px 10px'>
								<span class="badge badge-pill badgeLive badgeLiveFlex">LIVE</span>
							</div>				
							<div class='col-xs-2 col-sm-2 ` + classeDataOra + ` NoPad'  style='padding: 0px 0px 0px 10px;'>
								<label id='` + identificativo + `dataOra'>` +  quando + `</label>
							</div>
						</div>
					</div>				
				</div>
				`;				
				
				let b = false;
				if  (partita.result != null && (partita.result.result_description == 'Ended' || partita.result.result_description == 'Walkover' || partita.result.result_description == 'Retired' )   )
					{ b= true;} 		
				if ( output.results[iTorneo].matches[iPartita].result && output.results[iTorneo].matches[iPartita].result.winner_id && b){
					if (output.results[iTorneo].matches[iPartita].result.winner_id == output.results[iTorneo].matches[iPartita].away_id){					
						sHTML_partita = sHTML_partita.replace('giocatoreAway','giocatoreAway vincitore')
						sHTML_partita_flex = sHTML_partita_flex.replace('giocatoreAway','giocatoreAway vincitore')
					}else{
						sHTML_partita = sHTML_partita.replace('giocatoreHome','giocatoreHome vincitore')
						sHTML_partita_flex = sHTML_partita_flex.replace('giocatoreHome','giocatoreHome vincitore')						
					}					
				}
				
				if(partita.status != 'inprogress'){
					sHTML_partita = sHTML_partita.replaceAll('badgeLive', 'hidden'); 
					sHTML_partita_flex = sHTML_partita_flex.replaceAll('badgeLive badgeLiveFlex', 'hidden'); 
				}
				sHTML += sHTML_partita	
				sHTML_flex += sHTML_partita_flex;
				
			}catch(error){								
				console.log('Errore nella setRisultati: ' + error)
				console.log('iPartita: ' + iPartita)
				console.log('iTorneo: ' + iTorneo)								
			}
		}	
		$('.torneo' + iTorneo).append(sHTML);
		$('.torneoFlex' + iTorneo).append(sHTML_flex);
		ViewLive($('#toggleLive').prop('checked'));
		ViewRis($('#toggleModalita').prop('checked'));
	}	
	
	SetFlagRis(output, iNumTornei);
}

function getPunteggioiPartita(status, result, iPartita, arrPunteggiHome_flex, arrPunteggiAway_flex){
	let sRet ='';
		try{
	//verifico lo stato della partita	
	switch(status){
		
		case 'canceled':
				arrPunteggiHome_flex[2] = '<i style="font-size: 13px; padding-top: 5px">Cancellata</i>';
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
		sRet += FormattaPunteggio(result.home_set1, result.away_set1) ; //sRet += result.home_set1 +''+ result.away_set1 + ' ';
		sRet += getTieBreakResult(result, 1);
		arrPunteggiHome_flex[0] = result.home_set1
		arrPunteggiAway_flex[0] = result.away_set1
		
		if (result.home_set2 != undefined){
			sRet += FormattaPunteggio(result.home_set2, result.away_set2) ; //result.home_set2 +''+result.away_set2 + ' ';
			sRet += getTieBreakResult(result, 2);
			arrPunteggiHome_flex[1] = result.home_set2
			arrPunteggiAway_flex[1] = result.away_set2
			
			if (result.home_set3 != undefined){
				sRet += FormattaPunteggio(result.home_set3, result.away_set3) ; //sRet += ' ' + result.home_set3 +''+result.away_set3;
				sRet += getTieBreakResult(result, 3);
				arrPunteggiHome_flex[2] = result.home_set3
				arrPunteggiAway_flex[2] = result.away_set3
				
				if (result.home_set4 != undefined){
				sRet += FormattaPunteggio(result.home_set4, result.away_set4) ; //sRet += ' ' + result.home_set4 +''+result.away_set4;
				sRet += getTieBreakResult(result, 4);
				arrPunteggiHome_flex[3] = result.home_set4
				arrPunteggiAway_flex[3] = result.away_set4

				if (result.home_set5 != undefined){
					sRet += FormattaPunteggio(result.home_set5, result.away_set5) ; //sRet += ' ' + result.home_set5 +''+result.away_set5;
					sRet += getTieBreakResult(result, 5);	
					arrPunteggiHome_flex[4] = result.home_set5
					arrPunteggiAway_flex[4] = result.away_set5			
					}				
				}
			}
		}		
	}
	}
	catch(ex){
		//console.log('ERRORE nella getPunteggioiPartita:'+ ex)
	}
	 if (result.result_description == 'Walkover'){
		 sRet = sRet.replaceAll('NaN', ' ');
		 sRet = sRet.replaceAll('N/A', ' ');
		 sRet += '<i style="font-size: 13px; padding-top: 5px">Ritiro</i>'
	 } else if (result.result_description == 'Retired'){
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

function FormattaPunteggio(h,a){
	let sRet = '';
	if(a == '6' && h != '7') sRet = h +'<b class="Vantaggio">'+ a + '</b> ';
	if(h == '6' && a != '7') sRet = '<b class="Vantaggio">' + h +'</b>'+ a + ' ' ;
	if(a == '6' && h == '7') sRet = '<b class="Vantaggio">' + h +'</b>'+ a+ ' '; 
	if(h == '6' && a == '7') sRet = h +'<b class="Vantaggio">'+ a + '</b> ';
		
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
				//caso classico
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
				//caso flex
				const parentElement3 = document.getElementById("bandHomeFlex" + iTorneo.toString() +iPartita.toString());
				if(partita && partita.home && partita.home.country){
					const flag3 = new CountryFlag(parentElement3).selectByName(partita.home.country);
					//console.log('1' + iTorneo + ' --- iPartita'  + iPartita)
				}
				//GestioneFont('H' + iTorneo.toString() +iPartita.toString());
				
				const parentElement4 = document.getElementById("bandAwayFlex" + iTorneo.toString() +iPartita.toString());
				if(partita && partita.away && partita.away.country){
					const flag4 = new CountryFlag(parentElement4).selectByName(partita.away.country);
					//console.log('2' + iTorneo + ' --- iPartita'  + iPartita)
				}		
				//GestioneFont('A' + iTorneo.toString() +iPartita.toString());
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

function ViewRis(bool){	
	localStorage['olo_ModalitaView'] = bool;
	if(localStorage['olo_ModalitaView'] == 'true'){
		$('.torneo').css('display', 'none');
		$('.torneoFlex').css('display', '');
		$('#toggleModalita').removeClass('badgeLiveToggle');
		$('#toggleModalita').addClass('badgeLiveToggleChecked');
		$('#badgeModalitaToggle').html('Slider').css('background-color', '#BCDEFF').css('color', '#ff0000').css('font-weight', 'bold')
		
	}else{
		$('.torneo').css('display', '');
		$('.torneoFlex').css('display', 'none');	
		$('#toggleModalita').removeClass('badgeLiveToggle');
		$('#toggleModalita').addClass('badgeLiveToggleChecked');
		$('#badgeModalitaToggle').html('Classica').css('background-color', '#ff0000').css('color', '#BCDEFF').css('font-weight', 'bold')		
	}
}

function ViewLive(bool){
	if ($('#toggleModalita').prop('checked')){
		if(bool){
			$('.divRisultatoFlex').css('display', 'none');
			$('.badgeLiveFlex').parent().parent().parent().parent().css('display', '')		
			$('#badgeLiveToggle').removeClass('badgeLiveToggle');
			$('#badgeLiveToggle').addClass('badgeLiveToggleChecked');		
		}else{
			$('.divRisultatoFlex').css('display', '');
			$('#badgeLiveToggle').addClass('badgeLiveToggle');
			$('#badgeLiveToggle').removeClass('badgeLiveToggleChecked');			
		}
		
	}else{
		
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

}

function LarghezzeRisFlex(n){

	for(let i = 1; i<= n; ++i){
		let widt = 10+parseInt(($('#t'+i).css('width').replace('px', ''))) +'px';
		$('#ris'+i).css('min-width', widt)
		console.log(i+'i --->width =' + widt)
	}
}

function NZ(x){
	
	if(x == 'undefined' || x == undefined || x == null || x== 'null' || x=='N/A') {
		return ''
	}else{
		return x;
	}
}

function CheckNomeGiocatore(s){
	if (/[0-9]/.test(s)){
		return ''
	}else{
		return s;}
	
}

function gestioneRound(round){
	let r = new RegExp('Qualification round', 'i');
	if(r.test(round)){
		return  round.toLowerCase().replace("qualification round", "Qf.").replace(' ', '')		
	}
	
	
	r = RegExp('Qualification Final', 'i');
	if(r.test(round)){
		return round.toLowerCase().replace("qualification final", "Qf.F ").replace(' ', '')		
	}
	
	r = RegExp('Semifinals', 'i');
	if(r.test(round)){
		return round.toLowerCase().replace("semifinals", "SF ").replace(' ', '')		
	}
	
	r = RegExp('Final', 'i');
	if(r.test(round)){
		return round.toLowerCase().replace("final", " F ").replace(' ', '')		
	}
	return round;
}

function EffettoGrafico(i){
	debugger;
	if(!$("#toggleModalita").prop("checked")){
		
		if($('.torneo'+i).css('display') == 'none'){
			
			$(".torneo"+i).fadeIn()	
		}else{
			
			$(".torneo"+i).fadeOut()	
		}
		
	}
	
}

function OldMatches(){
	let r = new RegExp('olo_API_Risultati', 'i')
	for ( var i = 0, len = localStorage.length; i < len; ++i ) {
	  if(r.test( localStorage.getItem( localStorage.key( i ) ) )) localStorage.getItem( localStorage.key( i ) )
	}


	let sHTML = ''
	let sHTML_flex = ''
	let sHTML_NomeTorneo = '';	
	let iNumTornei = output.results.length;
	//ciclo tutti i tornei e ne creo l'intestazione: nelle classi torneo0, torneo1  andrò ad appendere il codice html relativo
	for (let i = 0; i<= iNumTornei -1; ++i){		
		sHTML_NomeTorneo = `
			<div class='col-xs-4 divTitoloTorneo' onclick='EffettoGrafico(${i})'>tournamentcode</div>
			<div class='col-xs-8 divTitoloTorneo' onclick='EffettoGrafico(${i})' style='margin-top:10px;'>
				<h5 class='titoloTorneo'>`
				+ output.results[i].tournament.name +', '+ output.results[i].tournament.city + '&nbsp; (' + output.results[i].tournament.surface +')' + //output.results[i].tournament.code +
		    `</div>
			<div class='col-xs-12 torneo torneo` + i + `' style='padding:2px; background-color:#abcdef;'></div>
			<div class='col-xs-12 torneoFlex torneoFlex` + i + ` flex-container' style='margin-top: 5px; padding: 7px; white-space: nowrap; overflow-x: auto; height: 160px;'></div>`;
				
		if(output.results[i].tournament.code.toUpperCase() == 'ATP'){
			sHTML_NomeTorneo = sHTML_NomeTorneo.replace("tournamentcode", svgATP).replaceAll("divTitoloTorneo", "divTitoloTorneo atp");			
		}else{
			sHTML_NomeTorneo = sHTML_NomeTorneo.replace("tournamentcode", svgWTA).replaceAll("divTitoloTorneo", "divTitoloTorneo wta");	
		}
		
		$('#divRisultati').append(sHTML_NomeTorneo);	
	}


	
	
}

var svgATP = `<svg id="svgATP" class="svgATPWTA" version="1.1" id="Layer_2_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 841.9 493.7" style="height: 50px; enable-background:new 0 0 841.9 493.7;" xml:space="preserve">
			<style type="text/css">
				.st0{fill:#FFFFFF;}
				.st1{fill:none;}
			</style>
			<title>ATP_Tour_RGB_Stacked_Mono_POS</title>
			<path class="st0" d="M284.6,80.1L328.4,290h-63.3l-9.3-45h-76.4l-26.9,45H82.3l29.1-45l-70.2-0.1l206.9-37.5l-6.5-30.2l0,0
				l-5.5-27.1l-11.5,19.2l13.3,4.9h-80.7l60.8-94L284.6,80.1z M680.6,80.1H527.5c0.6,0.7,1.1,1.4,1.4,2.2c0.6,1.7,1,3.5,1.2,5.3
				c0.5,3.1,1.1,3.5,0.8,5.9c-0.7,4.5-1.5,4.1-2.9,6.8c-1.1,2.2-1.9,4.4-2.5,6.7c0,0.1,0,0.2,0.1,0.2c0,0,0,0,0.1,0
				c0.5,0,1.5,0.1,1.6,1.6c0.1,2-2.3,6-3,7.2s-2.2,3.5-3.4,4.2c-2.2,1.3-2.8,0.5-3.2,1.2s-2.5,4.8-2.8,5.9c-0.4,1.4-0.6,2.9-0.7,4.4
				c0,0.2,0.1,0.4,0.3,0.5c4.4,1.7,15.8,5.8,18.6,10.5l-38.7,12.6c5.4-0.6,11.4-1.4,16.6-2c7.2-0.8,18.9-2.1,22.6-2.1
				c3.2,0.2,6.5,0.6,9.7,1.2c4.5,0.6,8.6,0.8,13.5,1.8c2.7,0.4,5.2,1.6,7.2,3.4c0.2,0.1,1.2,0.9,1.2,0.9c6-0.4,15.2-1,17.2-1.2
				c1-0.1,3-0.2,3.4-0.2c18.6-2.4,28.8-11.3,37.7-16.7c9.8-6,24.6-10.9,35.2-11.2c13.7-0.4,23.5,2,30.1,7.9s9.1,13.8,6.5,25.7
				c-2.5,11.5-6.2,16.8-14.7,22s-17.8,6.9-28.8,5.9c-18.4-1.7-34.8-13.2-41.3-16.9c-5.6-3.2-13.2-6.6-21.9-7.4c-1.7-0.1-3.4-0.1-5.1,0
				c-0.6,0-7.6,0.5-12,0.9c0.3,1.1,0.5,2.2,0.6,3.3c-0.1,2.2-1.4,3.3-2.8,3.1s-4.4-2.5-5.3-4.5c-0.1-0.2-0.4-0.3-0.4,0s0,0.7,0,1
				c-0.1,0.6-0.4,2.5-1.8,2.9c-1.4,0.3-2.9-0.1-4.1-1c-0.3-0.2-0.7-0.1-0.9,0.2c0,0,0,0.1-0.1,0.1c-0.5,1.4-0.8,2.2-3.3,1.7
				c-1.8-0.2-1.4,0.5-2.5,0.7c-2.8,0.5-4.1-0.9-6.3-1.9s-1.5-3.1-3.6-3.4c-0.4-0.1-1.2-0.2-1.6-0.3c1.6,5.1,2.7,10.4,3.5,15.8
				c0,0.2-0.1,0.4-0.3,0.4c0,0,0,0,0,0l-2.2,0.3c-0.2,0-0.3,0.2-0.3,0.4c0,0,0,0,0,0c0.5,2.9,1.9,8.2,2.2,12.1c0.5,7,0.5,9.1,0,12.6
				c0,0.2,0.1,0.4,0.3,0.4c0,0,0.1,0,0.1,0c0.9-0.2,1.8-0.5,2.6-1c0.1-1.4,0.3-2.8,0.8-4.1c0.2-0.3,0.5-0.6,0.7-0.9
				c0.2-0.2,0.3-0.4,0.4-0.7l0.6-2c0.1-0.3,0.2-0.6,0.4-0.9l3-5.5c0,0,0.7-1.5,1.9-1.2c1.2,0.6,1.9,1.8,2,3.2c-0.2,1.6-0.7,3.2-1.5,4.6
				l1.3,2.1c1.6,0.4,3.3,0.1,4.6-0.9c0.7-0.4,1.3-0.9,1.9-1.4c-0.6-1.5,0.8-3.5,4.5-2.8c1.3,0.5,4.9,3.4,0.4,6.4
				c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0.1,0.1,0.2,0.1c4.9-0.3,4.3,5.6,1,7.4c-0.3,0.1-0.4,0.5-0.2,0.7c0,0,0,0,0,0.1
				c0.7,0.9,1.1,2,1.1,3.2c0,0,0,1.6-4.8,3.2c0,0-1.5,0.6-0.9,1.7c0.6,0.2,1.2,0.4,2,0.7c0,0,4.3,1,3.5,3.4c0,0-0.7,2-4.8,0.7
				c-1.3,0.1-2.7,0-4-0.1c-2.6,0.8-5.2,1.5-7.8,1.9c-0.9,0.2-1.6,0.6-2.2,1.3l0,0c-2.7,3-10.8,7.2-14.4,7.3c-4,0-4.5-3.1-7.5-6.1
				c-5.7-5.9-6.7-13.4-7.5-20.8c0-0.2-0.3-0.4-0.5-0.4c-0.2,0-0.3,0.2-0.4,0.4c-1,8.7-1.5,16.4-6.3,20.7c-2.9,2.6-7.5,4.7-14.9,6.4
				c-28.2,6.7-58.5,24-55.1,27.9c1.4,1.6,4.5-1.5,10.1-4.1c21-9.7,48.2-11.6,57-10.9c0.6,0.1,1.1,0.6,1.2,1.2c0.3,2.1,0.7,4.2,1.4,6.2
				c0.8,2.7,1.6,7.5,4.5,10.2c5.2,4.9,4.5,6.7,3.3,13.3c-0.8,4.3,5.1,7.9,5.2,8h60.6L595,245h61.5c62.9,0,90.8-28.7,101.5-83.7
				C763,135.7,762.8,80.1,680.6,80.1z M410.3,290c0.9-0.9,1.8-2,3-3.2c2.6-2.7,0.6-9.6,1.1-12.2c0.7-3.5,6.6-5.3,7.6-8.7
				c1.3-4.6-7.9-3.8-3.5-8.7c2.7-3.1,6.7-2,6.4-5c-0.4-4.9,4.3-8.2,6.3-9.7c8.7-6.6,28.2-17,40.1-20.5c12.4-3.6-4.7-3.3-18.8,1.9
				c-12.9,4.7,16.6-13.8,39.9-19.6c16.6-4.2-12.2-5-38.8,6.7c-8.4,3.7-13.1,6-16.5,8.2c-0.1,0-0.2,0-0.2-0.1c0,0,0-0.1,0-0.1
				c1.3-2.7,4.1-7.3,3.3-12.1c-0.6-3-0.2-6.2,1.1-9c1-1.9,0.4-7,1.5-9.7c0.1-0.2,0.3-0.3,0.5-0.2l14.3,4.5l55.7-19l-53.1,7.9
				l-18.4-15.7c-2.6-2.8-5.3-13.6-2.6-17.7c2.8-4.2,6-8.1,9.6-11.7c2.5-2.2,10.2-3.1,14-5c4.2-2.1,7.6-0.7,10.6-1.2
				c3.3-0.8,6.5-1.8,9.7-3c0.1,0,0.1-0.1,0.1-0.2c0-1.2-0.1-2.5-0.3-3.7c-0.8-3.3-1.2-6.8-1-10.2c0.3-3.3,3.2-6.2,3.3-8.4
				s-1.5-4.5-0.2-6.6c1.1-2,1.4-3.6,2.7-7.8c-0.3-2.5-1.9-3.4-0.8-5.9c0.6-1.3,1.6-3.3,2.1-4.2H295l11.1,53.2h76.4l-8.4,40.9h57.6
				l-117.6,21.3l55.6-0.1L350.3,290H410.3z M615.1,168.4c1,0.5,2.2,0,2.7-1c0.2-0.3,0.2-0.7,0.2-1c0.1-5.3,1-7.7,2.1-11.9
				c0.5-1.7-1-3.1-2.4-2.3c-8.6,4.6-14.8,6.6-18.5,7.4c-0.6,0.2-1.1,0.7-1.1,1.4c0,0.6,0.3,1.1,0.8,1.3
				C604.5,163.6,609.9,165.7,615.1,168.4z"/>
			<path class="st0" d="M378.1,325.5h-35.3l3.5-16.7h90.4l-3.7,16.7h-35.3l-18.7,89.7h-19.8L378.1,325.5z"/>
			<path class="st0" d="M548.5,380.2c0.1-3.8,0.5-7.7,1.3-11.4l12.6-60.1h19.8l-12.6,59.8c-0.6,3.1-1,6.3-1.2,9.4
				c-0.1,14.5,9.7,21.4,24.7,21.4c16.9,0,28.5-9.3,33.1-31l12.4-59.6h19.5l-12.8,61c-6.5,31.3-25.8,47-54.4,47
				C564.9,416.7,548.3,402.7,548.5,380.2z"/>
			<path class="st0" d="M728.1,381.4l18.7,33.8h-21L708.6,384h-29.1l-6.4,31.2h-19.9l22.3-106.5h44c25.7,0,40.3,11.9,40.2,32.1
				C759.5,361.5,747.8,376,728.1,381.4z M739.7,342.6c0.1-11.6-8-17.2-22.5-17.2H692l-9,42.3h26.2C728.4,367.7,739.6,359.1,739.7,342.6
				z"/>
			<path class="st0" d="M537.8,361.9c-1.1,7.2-3.2,14.2-6.3,20.7c-3.4,7.1-8.3,13.5-14.2,18.8c-5.9,5.2-12.8,9.2-20.3,11.7
				c-6.8,2.3-14,3.5-21.2,3.4c-6.9,0.1-13.8-1.1-20.3-3.4c-6.5-2.4-12.4-6.4-16.9-11.7c-4.4-5.4-7.4-11.9-8.7-18.8
				c-1.2-6.9-1.3-13.9-0.3-20.8c1.1-7.2,3.2-14.2,6.3-20.8c3.5-7.1,8.3-13.5,14.2-18.8c5.9-5.2,12.8-9.2,20.3-11.7
				c6.8-2.3,14-3.4,21.2-3.4c6.9-0.1,13.8,1.1,20.3,3.4c6.5,2.4,12.3,6.4,16.8,11.7c4.4,5.4,7.4,11.9,8.7,18.8
				C538.8,348,538.9,355,537.8,361.9z M518.2,361.9c1.4-10.4,0.5-20.1-4.6-27c-2.6-3.5-6.1-6.3-10.1-7.9c-4.5-1.8-9.4-2.7-14.2-2.7
				c-5.1,0-10.2,0.9-15,2.7c-4.6,1.8-8.9,4.5-12.4,8c-7,6.8-10.8,16.6-12.4,26.9c-1.5,10.3-0.5,20.1,4.5,26.9c2.6,3.5,6.1,6.2,10.1,7.9
				c4.5,1.8,9.3,2.7,14.2,2.7c5.1,0,10.2-0.9,15-2.7c4.6-1.8,8.9-4.5,12.4-7.9C512.8,382,516.6,372.2,518.2,361.9L518.2,361.9z"/>
			<path class="st0" d="M734.8,281.2h-3.5l0.4-2h9.4l-0.4,2h-3.5l-1.8,8.8H733L734.8,281.2z M754.7,279.2l-2.1,10.8h-2.3l1.3-6.4
				l-4.1,5.3h-1.1l-2.2-5.4l-1.3,6.5h-2.3l2.2-10.8h2l2.7,6.7l5.3-6.7L754.7,279.2z"/>
			<rect class="st1" width="841.9" height="493.7"/>
		</svg>`			
var svgWTA = `<svg id="svgWTA" class="svgATPWTA" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 674.82 180" style="height: 50px;"><path fill="#7814ff" d="M476.75 61.58h-51.11c-2 0-3.34 1.14-3.34 3s1.24 3 3.34 3h22.17v57.69a3.29 3.29 0 106.57 0v-57.7h22.37c2.09 0 3.42-1.14 3.42-3s-1.33-3-3.42-3m36 67.86c19.79 0 32.83-13.7 32.83-34.55 0-20.18-13.61-34.55-32.83-34.55s-32.84 14.28-32.84 34.55c0 20.85 13 34.55 32.84 34.55m.09-5.9c-15.89 0-26.36-11.42-26.36-28.65 0-16.75 10.94-28.65 26.36-28.65s26.27 11.9 26.27 28.65c0 17.23-10.37 28.65-26.27 28.65m70 5.9c16.84 0 27.69-10.37 27.69-26.46V64.53a3.22 3.22 0 00-3.33-3.43 3.1 3.1 0 00-3.23 3.43v37.79c0 12.85-7.62 21.13-21.13 21.13s-21.13-8.38-21.13-21.23V64.53a3.29 3.29 0 10-6.57 0V103c0 16 10.85 26.46 27.7 26.46m90.7-6.57l-21.41-22.46h3.23c11.14 0 18.85-7.9 18.85-19.51 0-11.42-7.71-19.32-18.85-19.32h-31.28a3.3 3.3 0 00-3.61 3.4v60.25a3.29 3.29 0 106.57 0v-24.84h16.65l25.13 26.94a3.68 3.68 0 002.86 1.33 3.08 3.08 0 003.14-3 3.81 3.81 0 00-1.34-2.86M627 67.48h27.6c8 0 12.94 5.14 12.94 13.42 0 8.47-4.85 13.61-12.94 13.61H627zM389.78 112a7.9 7.9 0 00-8.26 7.88 8.07 8.07 0 008 8.24 8.22 8.22 0 008.16-8.15 8 8 0 00-7.9-7.97z"/><path fill="#7814ff" d="M420.89 115.54q-11.82-24.32-23.54-48.69c-1.57-3.25-4.05-5.27-7.69-5.27s-6.25 2.07-7.87 5.45q-11.6 24.1-23.28 48.17a15.78 15.78 0 00-1.05 2.69 8.13 8.13 0 0014.16 7.19 15.52 15.52 0 001.76-3q7.38-15.17 14.72-30.34c.41-.85.86-1.68 1.53-3 .55 1.07.83 1.58 1.08 2.1q6.07 12.56 12.16 25.12c1.31 2.7 2.55 5.45 4 8.07a8.12 8.12 0 0014.7-1.48 8.91 8.91 0 00-.68-7.01zM369.1 70.3a8.14 8.14 0 00-5.1-8.07 11.29 11.29 0 00-4-.67c-14.06-.05-43.64 0-43.64 0a8.14 8.14 0 00-7.16 7.6 8 8 0 004.29 7.75 7.81 7.81 0 003.5.77h11.31s-18.85 38.4-19.26 39.58a8 8 0 002.47 8.93 8.16 8.16 0 009 1 9.52 9.52 0 004.12-4.73q6-12.57 12.15-25.13c2.87-5.93 9.28-19.62 9.28-19.62s14.15.15 16.33 0c3.77-.3 6.37-3.64 6.71-7.41zm-78.53-8.48c-3 .75-4.78 2.7-6.07 5.39-5 10.41-10 20.79-15.07 31.18-.36.74-.81 1.44-1.38 2.43-.64-1.25-1.14-2.16-1.6-3.1L251.87 67.6a19.56 19.56 0 00-1.22-2.31 8.16 8.16 0 00-13.72 0 20.28 20.28 0 00-1.22 2.31q-7.29 15.06-14.58 30.11c-.44.91-1 1.79-1.66 3.08-.71-1.36-1.17-2.19-1.59-3l-14.46-29.88a23.29 23.29 0 00-1.36-2.57 8.16 8.16 0 00-14.15 8.07c8 16.72 16.07 33.38 24.17 50a7.81 7.81 0 007.49 4.64 8 8 0 007.41-4.76c.22-.44 16.21-33.33 16.86-34.57 1.7 3.47 12.58 26 16.57 34.15 1.79 3.68 4.72 5.5 8.31 5.18s5.76-2.39 7.26-5.51q11.53-24 23.15-47.95a16.62 16.62 0 001.24-3.25 8.17 8.17 0 00-9.8-9.52zM174 93c-.94-14.17-3.28-22.91-9.4-34.66a84.07 84.07 0 00-24.73-28.67 2.85 2.85 0 01-.38-.32c.41-2.57 1.32-6.84 3.2-9.66 2.84-4.27 7.59-9.33 7.9-11.7s-1.11-4.29-1.42-5.69c-.53-2.37-2.1-2.66-3.11-1.95a21.92 21.92 0 00-3.37 3.59c-1.16 1.4-2.21 2.55-2.81 3.19a9.18 9.18 0 000-1.84C139.6 2.93 138 3 137.46 3.75c-.28.37.16 2.58-1.28 4.82-1.22 1.91-1.16 3.86-1 6a18.27 18.27 0 01-1.4 8.42c-.27.66-.57 1.36-.89 2.09 0 0-6.66 14.81-7.72 21.41-.4 3.25.12 4.93-.36 6.49-1 3.15-7.52 16-10.91 22.35-2.5 4.67-4.87 9.55-4.28 15.06a9.92 9.92 0 01.05 1.49 3.15 3.15 0 01-3.23 3c-3.41-.11-4.68-4.29-3.83-7.79.53-2.21 2-4.13.72-5.81s-3.75-.92-6.86-.08c-3.36.92-6.45 1.71-9.38-.86s-5.32-5.16-14.38-2.58c-1.48.42-.45-5.74 3.7-7.15a7.06 7.06 0 00-2.17-.18 15.27 15.27 0 00-8.75 3.83 14.27 14.27 0 00-4.62 9 19.17 19.17 0 003 13.4c-3.12 1.54-4.33 3.42-6 5.9-.95 1.38-2.61 3.68-5.69 3.68 1 2 4 1 5.51 1.44a10.72 10.72 0 00-3.5 11.7A22.74 22.74 0 0163.3 112c1.11-.4 4-1.6 5.16-2 4-1.47 5.33-3.33 6.22-7.8a27 27 0 008.2.09c2.12-.29 3.06 1.46 5.62 2.71-1.12.59-6.8 2.88-10.08 4.7-5.59 3.09-11.87 8.5-14 14.87-.54 1.58-5.52 6.45-6.65 7.66a144.16 144.16 0 00-9.33 11.38l-.12-.08c-3.09-3.24-21.84-15.51-29.46-23.25-.08-.07-1.58-1.6-1.84-1.92a4.8 4.8 0 01-.52-2.94v-1.43c0-2-.82-4.69-2.09-5.53-.77-.52-1.27-.82-1.54-1l8.36-11.86c3.06-4.44 10.8-8.15 16.61-10 1.07-.34 9.41-2.27 14.47-5.79 9.93-6.9 18.51-19.66 27.14-26.2a51.25 51.25 0 0142.7-8.81c.58-4.1 3.89-11.19 4.47-12.43 1.18-2.53 3.29-6.57 4.3-8.47a78.76 78.76 0 00-31.13-9.68C68.46 11.42 39.91 25.57 25.41 47c-4.52 6.68-5.87 14.29-5.78 22.2.36 4.37.31 18-3.11 23.2-1.25 1.91-5.64 8.23-8.5 12.33a4.89 4.89 0 00-1.14-.29c-2.22-.31-3.35.37-4.69 2.64l-1.7 3.7a10.19 10.19 0 00-.43 1 4.12 4.12 0 00.78 3A10.09 10.09 0 005 118.65a2.26 2.26 0 001.6.25c1.23 1.93 2.26 2.1 3.4 3.1a28.9 28.9 0 014.56 5.29c4.63 5.93 9.93 13.93 18.78 22.89 3.36 3.4 9.47 8 11 9.65a4.58 4.58 0 00.47.43 3.71 3.71 0 002.77 1 6.39 6.39 0 003.19-1.1c16.08-10 25.58-25.81 25.72-26-.72-.18-2.68-1.34-3-1.37l.21-.09a8.76 8.76 0 012.67-.09h.14c5.77.33 13.83 3.06 16 4a8.16 8.16 0 013.2 2.67 86.6 86.6 0 014.67 7.68 6.63 6.63 0 01.46 5.27c-.64 1.95-8.45 17.79-10.77 24.53a18.56 18.56 0 01-1.31 3.24h.11a85.57 85.57 0 0021-2.08 76 76 0 0024.35-10c15.82-9.81 23.4-20.21 29.93-31.53 7.47-12.94 9.23-27.88 9.44-30.29A80.55 80.55 0 00174 93zM28.45 47.32C36.56 35.79 49 32.85 57.54 38.86s10 18.71 1.89 30.24-21.61 16-30.17 10a14.73 14.73 0 01-4.87-5.88c-3.33-7.1-2.02-17.22 4.06-25.9zm-5.75 29.3a16.11 16.11 0 0010.51 7.64 38.08 38.08 0 00-12.28 6.53 57.55 57.55 0 001.77-14.17zm134.76 44.71c-.88 3.24-1.6 5.17-1.6 5.17-3 8.77-7 19.61-16.91 29.52-6.27-9.44 2.11-28.52-5.94-42.31-5.65-9.69-14.41-15.32-29.54-12.09-6.73.7-7.51-.76-8.66-1.74-3.46-3.7-6.06-5.32-7.8-6 .76-.24 1.48-.49 2.16-.76a22.27 22.27 0 017.38-1.48 2.78 2.78 0 012.09.84c.18.23.38.46.58.69a5.91 5.91 0 001.44 1.33 8.75 8.75 0 005.95 1.86c4.33-.22 6.88-1 12.28.43a19.29 19.29 0 0110.43 7.21c.08-.31-3.86-8.62-2.58-16.94 1.29-5.77 2.69-11.52 4.34-17.19 1.23-4.23 1.6-8.57 2.29-12.88.11-.68.9-2.44 1.53-4.16.36-1 .57-1.87.83-2.82a51.92 51.92 0 016.58 4.34 44.45 44.45 0 018.32 8.49A48.83 48.83 0 01158 77.72a.76.76 0 010 .11c.06.21.12.42.19.63a63 63 0 012.2 12.05c.09.8.16 1.6.21 2.39a1.15 1.15 0 000 .17c.83 11.43-1.48 22.16-3.14 28.26z"/><path fill="#7814ff" d="M93.06 72.47a7.57 7.57 0 01-6.51.79 15.63 15.63 0 008.77 3 .86.86 0 00.83-.87 2.56 2.56 0 00-.12-.7c-.93-3.03-2.12-2.94-2.97-2.22z"/></svg>`		