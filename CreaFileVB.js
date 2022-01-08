$(document).ready(function(){

	    $('#txtProgetto').focus();	    
 	    
	    if (sessionStorage.getItem('TipoForm') == 'BROWSE'){
	    	    $('#chkBROWSE').prop("checked", true);	    
	    	    $('#lblTipoForm').text('BROWSE')
	    }
	    else if (sessionStorage.getItem('TipoForm') == 'SCREEN'){
	    	    $('#chkSCREEN').prop("checked", true);	    
	    	    $('#lblTipoForm').text('SCREEN')
	    }
	    else{ 
	    	    $('#chkBROWSE').prop("checked", true);	    	    
	    	    sessionStorage.setItem('TipoForm', 'BROWSE');
	    	    $('#lblTipoForm').text('BROWSE')	    	    
	    }
	    	    
	    GestioneCheckBox(); 	    
 }());
 
 //Pre-Compilo se Screen o Browse
 function GestioneCheckBox(){ 
	    if(sessionStorage.getItem('TipoForm') == 'SCREEN'){	    	    	    	    
	    	    $('#chkPREINIT').attr('checked',true)	    	    
	    	    $('#chkINIT').attr('checked',true)
	    	    $('#chkINIT_COMPLETE').attr('checked',true)
	    	    $('#chkLOAD').attr('checked',true)
	    	    $('#chkPRE_RENDER').attr('checked',true)
	    	    	    	    
	    	    $('#chkF2').attr('checked',false)
	    	    $('#chkFCODE').attr('checked',true)

	    	    $('#chkWEBMETHOD').attr('checked',false)
				$('#chkTASCHE').attr('checked',false)				
	    	    
	    	    $('.divScreen').css('display','block')
	    	    $('.divBrowse').css('display','none')
	    }
	    else{	    	    
	    	    $('#chkPREINIT').attr('checked',true)	    	    
	    	    $('#chkINIT').attr('checked',true)
	    	    $('#chkINIT_COMPLETE').attr('checked',true)
	    	    $('#chkLOAD').attr('checked',true)
	    	    $('#chkPRE_RENDER').attr('checked',true)	    	    
	    	    
	    	    $('#chkF2').attr('checked',false)
	    	    $('#chkFCODE').attr('checked',true)	    	    
	    	    
	    	    $('#chkWEBMETHOD').attr('checked',false)
				$('#chkTASCHE').attr('checked',false)				

	    	    $('#chkScreenClassica').attr('checked',true) 
	    	    $('#chkScreenFD').attr('checked',false)	    
	    	    $('#chkHamburger').attr('checked',false)	    	    	    
	    	    
	    	    
	    	    $('.divScreen').css('display','none')
	    	    $('.divBrowse').css('display','block')
	    }
 }
 
function copia() {

	    var copyText = document.getElementById("txtTesto");

	    copyText.select();
	    copyText.setSelectionRange(0, 99999); /* For mobile devices */

	    navigator.clipboard.writeText(copyText.value);
	    //effetto grafico
	    $('.lblWarning').removeClass('lblFadingOutWarning');
	    setTimeout(function () { 
	    	    $('.lblWarning').css('display','block').addClass('lblFadingOutWarning');
	    }, 200);   
}

function copia_2(id) {  
		var copyText = document.getElementById(id);
	    copyText.select();
	    copyText.setSelectionRange(0, 99999); /* For mobile devices */

	    navigator.clipboard.writeText(copyText.value);  
}

function generaFile(){
	    //pulisco le variabili 
	    let BrowseTesto, ScreenTesto
	    if($('input[name="BROWSEoSCREEN"]:checked').attr('id') == "chkBROWSE"){
	    	     BrowseTesto= CONSTBrowseTesto
	    	     ScreenTesto = ''
	    	    }
	    else{
	    	     BrowseTesto = ''
	    	     ScreenTesto = CONSTScreenTesto	    	    
	    }
	    
	    
	    if(!verificaDati()) 
	    	    {return false;}
	    else{
	    	    //pulisco il testo!
	    	    $('#txtTesto').val('');
				
				let arrValoriImport = ['Imports CBO','Imports CboUtil.BO','Imports CboUtil.Data','Imports CBO.Web.UI', 'Imports Telerik.Web.UI'];
				//let arrBoolImport = [0,0,0,0,0]; in attesa di gestioneè commentato e li scrivo tutti
				let arrBoolImport = [1,1,1,1,1];
	    	    
	    	    if($('#chkFCODE').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$FCODE$',testoFCODE);	    	    	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$FCODE_S$',testoFCODE_S);	    	    	    
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$FCODE$','');	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$FCODE_S$','');	    
	    	    } 
	    	    
	    	    if($('#chkPREINIT').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$PREINIT$',testoPREINIT);	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PREINIT$',testoPREINIT);	    	    	    	    
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$PREINIT$','');	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PREINIT$','');	    
	    	    } 
	    	    	    
	    	    if($('#chkINIT').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$INIT$',testoINIT);	    	    	    
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$INIT$','');	    	    	    	    
	    	    } 
	    	    
	    	    if($('#chkINIT').prop('checked') == true){
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$INIT_S$',testoINIT_S);	    	    	    
	    	    }
	    	    else{
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$INIT_S$','');
	    	    } 
	    	    
	    	    if($('#chkINIT_COMPLETE').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$INITCOMPLETE$',testoINITCOMPLETE);
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$INITCOMPLETE$',testoINITCOMPLETE);	
						//verifico qui se spuntati i btn IME
						let ime = '';
						if($('#chkIME_I').prop('checked') == true){
							BrowseTesto = BrowseTesto.replaceAll('$IME_I$',testoIME_I);
							ime += 'I';
						}else{
							BrowseTesto = BrowseTesto.replaceAll('$IME_I$','');
						}
						if($('#chkIME_M').prop('checked') == true){
							BrowseTesto = BrowseTesto.replaceAll('$IME_M$',testoIME_M);
							ime += 'M';
						}else{
							BrowseTesto = BrowseTesto.replaceAll('$IME_M$','');
						}
						if($('#chkIME_E').prop('checked') == true){
							BrowseTesto = BrowseTesto.replaceAll('$IME_E$',testoIME_E);
							ime += 'E';
						}else{
							BrowseTesto = BrowseTesto.replaceAll('$IME_E$','');
						}
						BrowseTesto = BrowseTesto.replaceAll('$IME$',ime);						
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$INITCOMPLETE$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$INITCOMPLETE$','');	    
	    	    } 
	    	    	    
	    	    if($('#chkLOAD').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$LOADEVENT$',testoLOADEVENT);	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$LOADEVENT$',testoLOADEVENT);	    	    	    	    	    
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$LOADEVENT$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$LOADEVENT$','');	    	    
	    	    } 
	    	    
	    	    if($('#chkPRE_RENDER').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$PRERENDER$',testoPRERENDER);	    	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PRERENDER$',testoPRERENDER);	    	    	    	    	    	    
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$PRERENDER$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PRERENDER$','');	    	    
	    	    }
	    	    
	    	    if($('#chkWEBMETHOD').prop('checked') == true){
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$WEBMETHOD$',WM);	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$WEBMETHOD$',WM);	    	    	    	    
	    	    }
	    	    else{
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$WEBMETHOD$','');	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$WEBMETHOD$','');	    
	    	    }
	    	    
	    	    
	    	    if($('#chkF2').prop('checked') == true){
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_1$',Gr1);
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_2$',Gr2);
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_3$',Gr3);
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_4$',Gr4);	    

	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_1$',Gr1);
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_2$',Gr2);
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_3$',Gr3);
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_4$',Gr4);	    	    	    	    
	    	    }
	    	    else{
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_1$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_2$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_3$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$F2GRAFICA_4$','');	    
	    	    	    
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_1$','');
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_2$','');
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_3$','');
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$F2GRAFICA_4$','');	    	    
	    	    }
	    	    
	    	    if($('input[name="BROWSEoSCREEN"]:checked').attr('id') == "chkBROWSE"){	    
	    	    	    	    if($('#chkFILTRI').prop('checked') == true){
	    	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$SUBPRIVATE$',testoSUBPRIVATE);	    	    	    
	    	    	    	    }
	    	    	    	    else{
	    	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$SUBPRIVATE$','');
	    	    	    	    } 	    
	    	    	    	    
	    	    	    	    if($('#chkBTNELIMINA').prop('checked') == true){
	    	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$BUTTONELIMINA$',Elim);	    	    	    
	    	    	    	    }
	    	    	    	    else{
	    	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$BTNELIMINA$','');	    
	    	    	    	    }
	    	    
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$PROGETTO$',$('#txtProgetto').val());
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$CLASSE$',$('#txtClasse').val());
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$PAGINA$',$('#txtPagina').val());
	    	    	    BrowseTesto = BrowseTesto.replaceAll('$SIGLA$',$('#txtSigla').val());
	    	    	    BrowseTesto = BrowseTesto.replaceAll('#SIGLAFORM$','_B');
	    	    	    if($('#chkScreenClassica').prop('checked') == true){
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$CLASSE_SCREEN$',$('#txtProgetto').val() + '_S');	    	    	    
	    	    	    }	    
	    	    	    
	    	    	    if($('#chkFiltroAll').prop('checked') == true){
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$FILTROALL$',testoFiltroAll);	    	    	    	    	    
	    	    	    }
	    	    	    else{
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$FILTROALL$','');	    
	    	    	    }
	    	    	    //gestione hamburger	    	    	    	    
	    	    	    if($('#chkHamburger').prop('checked') == true){
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$Ham_1$',Ham_1);	    
	    	    	    	    let Ham_2 = '';
	    	    	    	    //let Ham_Render = Ham_3;
	    	    	    	    let aux_1 = '', aux_2 = '', aux_3 = '', aux_FCODE = '';
	    	    	    	    for(let i = 0; i< $('.btnHamburger').length; ++i){
	    	    	    	    	    // m_oBrowse.AddImgButtonGrigliaWeb("btnF11Stampa", "Stampa", System.Windows.Forms.Keys.F11)
	    	    	    	    	    Ham_2 += 'm_oBrowse.AddImgButtonGrigliaWeb("btn' + $('.btnHamburger')[i].innerHTML  +'", "' +$('.btnHamburger')[i].innerHTML.substring(4) +'", System.Windows.Forms.Keys.' + $('.btnHamburger')[i].innerHTML.substring(0,6) + ') \n'	    	    	    	    	    
	    	    	    	    	    	    	    	    	    	    	    	    	    	    	    
	    	    	    	    	    //oTemplate.AddButton("btnStampa", "btn btn-default", "<span class=""glyphicon glyphicon-print""></span>", , , "Stampa segnalazione")
	    	    	    	    	    aux_1 += 'oTemplate.AddButton("btn' + $('.btnHamburger')[i].innerHTML.substring(4) + '", "btn btn-default", "<span class=""glyphicon glyphicon-print""></span>", , , "' + $('.btnHamburger')[i].innerHTML.substring(4) + '")\n'
	    	    	    	    	    
	    	    	    	    	    //sScript += "$('#" & item.FindControl("btnStampa").ClientID & "').click(function() { ShowLoading();$('#" & item.FindControl("btnF11Stampa").ClientID & "').click();return false; });"
	    	    	    	    	    aux_2 += 'sScript += "$(\'#" & item.FindControl("' + $('.btnHamburger')[i].innerHTML.substring(4) +'").ClientID & "\').click(function() { ShowLoading();$(\'#" & item.FindControl("' + $('.btnHamburger')[i].innerHTML  + '").ClientID & "\').click();return false; });" \n'
	    	    	    	    	    
	    	    	    	    	    /*grdGriglia.Columns(grdGriglia.Columns.Count - 2).HeaderStyle.CssClass = "nascosto"
	    	    	    	    	    grdGriglia.Columns(grdGriglia.Columns.Count - 2).ItemStyle.CssClass = "nascosto"
	    	    	    	    	    grdGriglia.Columns(grdGriglia.Columns.Count - 2).Display = False*/
	    	    	    	    	    let k = i+2;
	    	    	    	    	    aux_3 += 'grdGriglia.Columns(grdGriglia.Columns.Count - ' + k + ').HeaderStyle.CssClass = "nascosto"\n';
	    	    	    	    	    aux_3 += 'grdGriglia.Columns(grdGriglia.Columns.Count - ' + k + ').ItemStyle.CssClass = "nascosto"\n';
	    	    	    	    	    aux_3 += 'grdGriglia.Columns(grdGriglia.Columns.Count - ' + k + ').Display = False\n';
	    	    	    	    	    
	    	    	    	    	    //FCODE
	    	    	    	    	    let j = i+1;
	    	    	    	    	    aux_FCODE += 'Case System.Windows.Forms.Keys.F1' + j + '\n\n'
	    	    	    	    }
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$Ham_Bottoni$',Ham_2);	    
	    	    	    	    Ham_3 = Ham_3.replace("$Ham_Riga_1$", aux_1)	    	    	    	    	    
	    	    	    	    Ham_3 = Ham_3.replace("$Ham_Riga_2$", aux_2)	    	    	    	    
	    	    	    	    Ham_3 = Ham_3.replace("$Ham_Riga_3$", aux_3)	    
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$Ham_3$',Ham_3);	    
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$HAM_FCODE$',aux_FCODE);	    	    	    	    	    
	    	    	    }
	    	    	    else{
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$Ham_1$','');	    
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$Ham_3$','');	    
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$Ham_Bottoni$','');	    	    
	    	    	    	    BrowseTesto = BrowseTesto.replaceAll('$HAM_FCODE$','');	    	    	    	    	    
	    	    	    }							    	    	   
	    	    }	    	    	    
	    	    else if($('input[name="BROWSEoSCREEN"]:checked').attr('id') == "chkSCREEN" && $('#chkVisUnderscore').prop('checked', true)){
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PROGETTO$',$('#txtProgetto').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$CLASSE$',$('#txtClasse').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PAGINA$',$('#txtPagina').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$SIGLA$',$('#txtSigla').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('#SIGLAFORM$','_S');	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$BUTTONELIMINA$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$CLASSE_SCREEN$','c'+$('#txtClasse').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$AFTERRUPDATE$',testoAFTERUPDATE);	    	    	    
	    	    	    //$('#txtTesto').val(ScreenTesto)	  

						//gestione TASCHE SCREEN
						debugger;						
	    	    	    if($('#chkTASCHE').prop('checked') == true){
	    	    	    	    ScreenTesto = ScreenTesto.replaceAll('$TASCHE_1$',TASCHE_1);
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_2$',TASCHE_2);
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_4$',TASCHE_4);								
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_6$',TASCHE_6);
								
								let aux1 = '';
								let aux2 = '';
								let aux2bis = '';
								for(let i = 1; i<= $('#txtNumTasche').val(); ++i){									
									let id = 'txtNomeTasca' + i;
									aux1 += `Case "tab'` + document.getElementById(id).value + `'"\n`
									aux1 += `strScript = "$('#myTab li:eq($(i)) a').tab('show');"\n`
									aux1 += `strScript += "$('#link-collapse-tab'` + document.getElementById(id).value + `').click();"'\n`

									aux2 += `Case "tab'` + document.getElementById(id).value + `'"\n`
									for (let j = 1; j<= $('#txtNumTasche').val(); ++j){
										if(i!=j){
											aux2 += `strScript += "$('#btnTab` + document.getElementById(id).value + `').css('display', 'none');`;
											aux2bis	 += `strScript += "$('#link-collapse-tab'` + document.getElementById(id).value + `').parent().parent().parent().css('display', 'none');"`;
										}										
									}
									aux2 += aux2bis;																	
								}	
								aux1 += `'Case Else`
								aux1 += `'di default apre la prima tasca `
								aux1 += `strScript = "$('#myTab li:eq(0) a').tab('show');"`
								aux1 += `strScript += "$('#link-collapse-tab'` + document.getElementById("txtNomeTasca1").value + `').click();"'\n`
			  
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_3$',aux1);
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_5$',aux2);
								
								//gestione html
								$('#txtTestoScriptTasche').val(TASCHESCRIPT);
								let testoHtml = '<ul class="nav nav-tabs responsive" id="myTab">';
								let htmlaux1 = '';
								let htmlaux2 = '';
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
								for(let i = 1; i<= $('#txtNumTasche').val(); ++i){	
									let nome = document.getElementById("txtNomeTasca"+i).value;
									htmlaux1 = `<li><a id="btnTab` + nome +`" href="#tab` + nome +`" onclick="ClickTab('tab` + nome + `');">`  + nome +` </a></li>`;
									
									if(i==1){
										htmlaux2 += `<div class="tab-content responsive">
														<div class="tab-pane active" id="tab${nome}" style="margin-left:5px; margin-right:5px;">
																		
														</div>
													 </div>`;
									}else{
										htmlaux2 += `<div class="tab-pane" id="tab${nome}" style="margin-left:5px; margin-right:5px;">
													
													 </div>`;																				
									}
								}
								htmlaux1 += '\n</ul>';
								
								$('#txtTestoHtmlTasche').val(htmlaux1 +'\n'+ htmlaux2);
								$('.tasche').removeClass('hidden');
	    	    	    }
	    	    	    else{
	    	    	    	    ScreenTesto = ScreenTesto.replaceAll('$TASCHE_1$','');	    
	    	    	    	    ScreenTesto = ScreenTesto.replaceAll('$TASCHE_6$','');	 
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_2$','');
								ScreenTesto = ScreenTesto.replaceAll('$TASCHE_4$','');									    	    	    	  	    	    	    	   
	    	    	    }
  	    	    	    
	    	    }
	    	    else if($('input[name="BROWSEoSCREEN"]:checked').attr('id') == "chkSCREEN" && $('#chkVisUnderscore').prop('checked', false)){
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PROGETTO$',$('#txtProgetto').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$CLASSE$',$('#txtClasse').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$PAGINA$',$('#txtPagina').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$SIGLA$',$('#txtSigla').val());
	    	    	    ScreenTesto = ScreenTesto.replaceAll('#SIGLAFORM$','');	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$BUTTONELIMINA$','');
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$CLASSE_SCREEN$','c'+$('#txtClasse').val());	    
	    	    	    ScreenTesto = ScreenTesto.replaceAll('$AFTERRUPDATE$',testoAFTERUPDATE);	    	    	    
	    	    	    //$('#txtTesto').val(ScreenTesto)
	    	    }
	    	    //else{$('#txtTesto').val(BrowseTesto)}
	    if(ScreenTesto != ''){
			let imports = '';
			for (let i = 0; i<=4; ++i){
				if(arrBoolImport[i] == 1){
					imports += arrValoriImport[i] + '\n';
				}				
			}
			ScreenTesto = ScreenTesto.replaceAll('$IMPORTS$',imports);
			$('#txtTesto').val(ScreenTesto)
	    }else{
			let imports = '';
			for (let i = 0; i<=4; ++i){
				if(arrBoolImport[i] == 1){
					imports += arrValoriImport[i] + '\n';
				}				
			}
			BrowseTesto = BrowseTesto.replaceAll('$IMPORTS$',imports);
			$('#txtTesto').val(BrowseTesto)
	    }
	    	    	    
	    	    copia();				
	    }
}

function verificaDati(){
	    if($('#txtProgetto').val() == '' || $('#txtClasse').val() == '' || $('#txtSigla').val() == ''){
	    	    alert('Compilare tutti i campi!')
	    	    return false;
	    }
	    else{
	    return true;
	    }
}

function Cambia(v){
	    sessionStorage.setItem('TipoForm', v); 
	    $('#lblTipoForm').text(v).removeClass().addClass('lbl' + v); 
	    $('#btnGenera').removeClass().addClass('btn' + v).addClass('btn')
	    GestioneCheckBox();
	    
	    $('.divFuoco').css('display','block');
 
	    $('#lblTipoFormBtn').text(v);
		$('#txtProgetto').focus();
}

function ImpostaHamburger(){

	    $('#divHam').css('display', '')	    	    
	    
	    $('#divHam').empty();
	    let n = $('#txtNumHam').val();
	    let sHTML = '';
	    if(n!='' && n!= undefined && n!=null){	    	    
			for(let i = 1; i<=n; ++i){
					
					let id = 'txtNome' + i
					let idLbl = 'lblNome' + i
					let x = 10+i
					
					sHTML+='<div class="col-xs-12">'
					sHTML+='<b style="vertical-align: -8px;">btnF' + x +  '</b><input id="' + id + '" style="text-transform: capitalize" onchange="$(\'#' + idLbl + '\').text(\'btnF' + x +  '\' + $(\'#' + id +'\').val() )">'	    	    	    	    	    	    	    	    	    	    	    	    	    	    
					sHTML+='<b id="' + idLbl + '" class="btnHamburger hidden"></b>'
					sHTML+='</div>'	    	    	    
			}					
			$('#divHam').append(sHTML)	    	    
	    }	    
}

function ImpostaTasche(){
	    $('#divTas').css('display', '')	    	    	    
	    $('#divTas').empty();
	    let n = $('#txtNumTasche').val();
	    let sHTML = '';
	    if(n!='' && n!= undefined && n!=null){	    	    
			for(let i = 1; i<=n; ++i){
					
				let id = 'txtNomeTasca' + i
				let idLbl = 'lblNomeTasca' + i
				
				sHTML+='<div class="col-xs-12">'
				sHTML+='<b style="vertical-align: -8px;">' + i +  '</b>&nbsp;<input id="' + id + '" style="text-transform: capitalize" >'	    	    	    	    	    	    	    	    	    	    	    	    	    	    
				sHTML+='<b id="' + idLbl + '" class="btnHamburger hidden"></b>'
				sHTML+='</div>'	    	    	    
			}
					
			$('#divTas').append(sHTML)	    	    
	    }			   
}

function VisualizzaDivHamburger(){
	     
	    if($('#divHamburger').css('display') != 'none'){
	    	    $('#divHamburger').css('display', 'none')	    	    
	    }else{
	    	    $('#divHamburger').css('display', '')	    	    
	    }	    
}

function VisualizzaDivTasche(){
	     
	    if($('#divTasche').css('display') != 'none'){
	    	    $('#divTasche').css('display', 'none')	    	    
	    }else{
	    	    $('#divTasche').css('display', '')	    	    
	    }	 
		//check su WebMethod
		$('#chkWEBMETHOD').attr('checked', true)		
}

var WM = '#Region "WebServices"\n'
    WM += '<System.Web.Services.WebMethod()> _ \n'
    WM += 'Public Shared Function WEB_METHOD(ByVal codice As String) As String\n'
	WM += 'Return ""\n'
    WM += 'End Function\n'
	WM += '\n'
	WM += '$TASCHE_6$'
	WM += '\n'
	WM += '#End Region'
	    
var Gr1 = 'Private Property m_F2Grafica As cF2Grafica'
    Gr1 +='Get\n'
    Gr1 +='Return CType(PageValue("m_F2Grafica"), cF2Grafica)\n'
    Gr1 +='End Get\n'
	    Gr1 +='Set(value As cF2Grafica)\n'
    Gr1 +='PageValue("m_F2Grafica") = value\n'
	    Gr1 +='End Set\n'
    Gr1 +='End Property'
	    
var Gr2 ='m_F2Grafica = New cF2Grafica'	    
	    
var Gr3 ='m_oBrowse.F2GraficaWeb = m_F2Grafica'	    

var Gr4 ='Private Sub m_oScreen_F2CODE(ByRef control As Object, ByVal rigaSelezionata As CboUtil.BO.cProprieta) Handles m_oScreen.F2CODE\n'
	    Gr4 += 'If control.name = "txt" Then\n'
	    Gr4 += 'End If\n'
    Gr4 += 'End Sub'
	    
var Elim = 'm_oBrowse.ImgButtonEliminaWeb = "~/Images/btnElimina.png" '

const CONSTBrowseTesto= `$IMPORTS$

Public Class $PAGINA$
    Inherits $PROGETTO$.Web.UI.Page

#Region "Property"

    Private Property m_$CLASSE$ As c$CLASSE$
        Get
            Return CType(PageValue("m_$CLASSE$"), c$CLASSE$)
        End Get
        Set(value As c$CLASSE$)
            PageValue("m_$CLASSE$") = value
        End Set
    End Property

    Private Property m_WinDef As cWinDef
        Get
            Return CType(PageValue("m_WinDef"), cWinDef)
        End Get
        Set(value As cWinDef)
            PageValue("m_WinDef") = value
        End Set
    End Property 

	    $F2GRAFICA_1$			
	    
#End Region
$Ham_1$

#Region "Eventi Page"
	    $PREINIT$
    
	    $INIT$
    
	    $INITCOMPLETE$

	    $LOADEVENT$

	    $PRERENDER$
    
#End Region

#Region "Browse"
    $FCODE$

	    $F2GRAFICA_4$
#End Region

#Region "Sub Private"
$Ham_3$
$SUBPRIVATE$
#End Region 

$WEBMETHOD$
End Class
`;

let testoFCODE = `Private Sub m_oBrowse_FCODE(ByRef KeyPress As Integer, ByRef Shift As Integer) Handles m_oBrowse.FCODE
        Select Case KeyPress
	    	    	    Case System.Windows.Forms.Keys.F4
                'verifica autorizzazione inserisci
                If Not Autorizzazioni.Inserisci Then
                    Dim oMsg As New cMsg(Me, "Non si dispone delle autorizzazioni necessarie per proseguire")
                    oMsg.Show()
                    KeyPress = 0
                    Exit Sub
                End If
            Case System.Windows.Forms.Keys.F5
                'verifica autorizzazione modifica
                If Not Autorizzazioni.Modifica Then
                    Dim oMsg As New cMsg(Me, "Non si dispone delle autorizzazioni necessarie per proseguire")
                    oMsg.Show()
                    KeyPress = 0
                    Exit Sub
                End If

            Case System.Windows.Forms.Keys.F7
                'verifica autorizzazione cancella
                If Not Autorizzazioni.Cancella Then
                    Dim oMsg As New cMsg(Me, "Non si dispone delle autorizzazioni necessarie per proseguire")
                    oMsg.Show()
                    KeyPress = 0
                    Exit Sub
                End If	    	    	    
            Case System.Windows.Forms.Keys.F10
                RiempiGriglia()
	    	    	    	    $HAM_FCODE$
        End Select
    End Sub	    `;
	    
let testoPREINIT = `Private Sub $PAGINA$#SIGLAFORM$_PreInit(sender As Object, e As EventArgs) Handles Me.PreInit
        If Not IsPostBack Then
            If Autorizzazioni IsNot Nothing AndAlso Autorizzazioni.ErroreApriForm Then
                Dim oMsg As New cMsg(Me, "Non si dispone delle autorizzazioni necessarie per proseguire")
                oMsg.Show()
                Autorizzazioni = Nothing
            End If

            Autorizzazioni = New cAutorizzazioni(CType(Master, Object).FormEvento(Path))
            Autorizzazioni.CaricaAutorizzazioni()
        End If
    End Sub	    	    `;
	    
let testoINITCOMPLETE = ` Private Sub $PAGINA$#SIGLAFORM$_InitComplete(sender As Object, e As EventArgs) Handles Me.InitComplete
        Dim btn As CBO.Web.UI.WebControls.Button

        btn = ControlFinder.PageFindControl(Me, "btnEsci")
        If Not btn Is Nothing Then btn.Attributes.Add("style", "display: none")

        $IME_I$
		$IME_M$
		$IME_E$

    End Sub`
	
let testoIME_I = `btn = ControlFinder.PageFindControl(Me, "btnInserisci")
        If Not btn Is Nothing Then
            btn.Attributes.Add("style", "display: none")            
        End If`	
let testoIME_M = `btn = ControlFinder.PageFindControl(Me, "btnModifica")
        If Not btn Is Nothing Then
            btn.Attributes.Add("style", "display: none")            
        End If`	
let testoIME_E = `btn = ControlFinder.PageFindControl(Me, "btnElimina")
        If Not btn Is Nothing Then
            btn.Attributes.Add("style", "display: none")            
        End If`			

let testoINIT = `Private Sub $PAGINA$#SIGLAFORM$_Init(sender As Object, e As EventArgs) Handles Me.Init
        If Not IsPostBack Then
            'verifica autorizzazione apertura
            If Not Autorizzazioni.ApriForm Then
                Autorizzazioni.ErroreApriForm = True
                Response.Redirect(Request.ServerVariables("HTTP_REFERER"))
            End If

            m_$CLASSE$ = New c$CLASSE$
            m_$CLASSE$.IClassi_sSql = "SELECT * FROM ..."

            m_WinDef = New cWinDef(IWinDef.enuAppPlatform.Web)
	    	    	    $F2GRAFICA_2$	     
            RiempiGriglia()
        End If

        m_oBrowse = New CBO.CBrowse(CBO.enuAppPlatform.Web)
        m_oBrowse.WinDef = m_WinDef
        $F2GRAFICA_3$ 
        $BUTTONELIMINA$        
	    	    $FILTROALL$
	    	    $Ham_Bottoni$
        m_oBrowse.Init(m_$CLASSE$, Connessione, Me, "$SIGLA$", "$CLASSE_SCREEN$", "$IME$")

    End Sub`

let testoLOADEVENT = `    Private Sub $PAGINA$#SIGLAFORM$_Load(sender As Object, e As EventArgs) Handles Me.Load
        'il button conferma, anche se non visibile va abilitato per i filtri
        Dim ctl As CBO.Web.UI.WebControls.Button = ControlFinder.PageFindControl(Me, "btnConferma")
        If Not ctl Is Nothing Then ctl.Enabled = True
    End Sub`

let testoPRERENDER = `Private Sub $PAGINA$#SIGLAFORM$_PreRender(sender As Object, e As EventArgs) Handles Me.PreRender
       

    End Sub`

let testoSUBPRIVATE = `Private Sub RiempiGriglia()
        Dim strFiltro As String = ""

        If Not IsPostBack Then InizializzaFiltri()
        SalvaFiltri()

        Dim opTag As New cProprieta
        opTag.Scrivi("", Tag)
        opTag.Scrivi("DbMaster", ConnessioneMaster.Connection.Database)
        opTag.Scrivi("Filtro", CreaFiltro) 
        Tag = opTag.Leggi
    End Sub

    Private Function CreaFiltro() As String
        Dim sReturn As String = ""

        sReturn += " 1=1"
	    	    
	    	    'TODO

        Return sReturn
    End Function

    Private Sub InizializzaFiltri()
       'es.	    cbTipo.SelectedValue = m_FiltroTipo
        
    End Sub

    Private Sub SalvaFiltri()
        'es.	    m_FiltroTipo = cbTipo.SelectedValue
       
    End Sub`
	    
//////parte screen
const CONSTScreenTesto= `$IMPORTS$

Public Class $PAGINA$
    Inherits $PROGETTO$.Web.UI.Page

#Region "Property"

    Private Property m_$CLASSE$ As c$CLASSE$
        Get
            Return CType(PageValue("m_$CLASSE$"), c$CLASSE$)
        End Get
        Set(value As c$CLASSE$)
            PageValue("m_$CLASSE$") = value
        End Set
    End Property

$F2GRAFICA_1$

$TASCHE_1$
	    
#End Region

#Region "Eventi Page"
	    $PREINIT$
    
	    $INIT_S$
    
	    $INITCOMPLETE$

	    $LOADEVENT$ 

	    $PRERENDER$ 	    
#End Region

#Region "Eventi Screen"
	    $FCODE_S$
	    
	    $AFTERRUPDATE$
		
		$TASCHE_2$
		
		$TASCHE_4$
#End Region	    

$WEBMETHOD$

End Class
`;


let testoINIT_S =`Private Sub $PAGINA$_S_Init(sender As Object, e As EventArgs) Handles Me.Init
        If Not IsPostBack Then
            'verifica autorizzazione apertura
            If Not Autorizzazioni.ApriForm Then
                Autorizzazioni.ErroreApriForm = True
                Response.Redirect(Request.ServerVariables("HTTP_REFERER"))
            End If

            m_$CLASSE$ = New c$CLASSE$
            m_$CLASSE$.IClassi_sSql = "SELECT * FROM ..."           'TODO

            $F2GRAFICA_2$           
        End If

        m_oScreen = New CBO.CScreen(CBO.enuAppPlatform.Web)        
	    	    $F2GRAFICA_3$ 
        m_oScreen.Init(Connessione, m_$CLASSE$, Me, "$SIGLA$", "$IME$")     
    End Sub `


let testoFCODE_S =`Private Sub m_oScreen_FCODE(ByRef keyPress As Integer, ByRef shift As Integer) Handles m_oScreen.FCODE
        Select Case keyPress
            Case System.Windows.Forms.Keys.F10
                
        End Select
    End Sub`

let testoAFTERUPDATE =`Private Sub m_oScreen_AfterUPDATE(ByRef p_Dati As cProprieta) Handles m_oScreen.AfterUPDATE        


    End Sub`
	    
let testoFiltroAll = `CBO.Web.Bootstrap.cGridFilterAll.AbilitaFiltroAll(grdGriglia, Telerik.Web.UI.GridCommandItemDisplay.Top, CBO.Web.Bootstrap.cGridFilterAll.enuEspandiFiltro.Espandi)`

let Ham_1 = ` Dim oTemplate As CBO.Web.Bootstrap.cGridMenuButton`

let Ham_Bottoni = ``

let Ham_3 = `
    Private Sub grdGriglia_PreRender(sender As Object, e As EventArgs) Handles grdGriglia.PreRender
        oTemplate = New CBO.Web.Bootstrap.cGridMenuButton
        oTemplate.ButtonPerRiga = 3
        oTemplate.HorizontalOpen = CBO.Web.Bootstrap.cGridMenuButton.enuHorizontalOpen.Right
	    	    $Ham_Riga_1$

        Dim templateColumn As New GridTemplateColumn()
        templateColumn.UniqueName = "btnMenuGrid"
        templateColumn.ItemTemplate = oTemplate
        templateColumn.ItemStyle.HorizontalAlign = HorizontalAlign.Center
        templateColumn.AllowFiltering = False
        templateColumn.HeaderText = ""
        grdGriglia.Columns.Add(templateColumn)
        grdGriglia.DataBind()

        Dim sScript As String = ""
        For Each item As GridDataItem In grdGriglia.Items
	    	    	    $Ham_Riga_2$        
        Next
        ScriptPagina += sScript

	    	    $Ham_Riga_3$
    End Sub		
	    `
	    
let TASCHE_1 = `    Private Shared Property m_TabSelezionato As String
        Get
            Return cFunzioni.Nz(PageValue("m_TabSelezionato"), "")
        End Get
        Set(value As String)
            PageValue("m_TabSelezionato") = value
        End Set
    End Property`

let TASCHE_2 = ` 
Private Sub GestioneTab()
        Dim strScript As String = ""
        Select Case hidTabSelezionato.Text
			$TASCHE_3$            
        End Select

        If strScript <> "" Then
            pScriptTab.Controls.Add(New LiteralControl("<script type=""text/javascript"">"))
            pScriptTab.Controls.Add(New LiteralControl("$(function () {"))
            pScriptTab.Controls.Add(New LiteralControl(strScript))
            pScriptTab.Controls.Add(New LiteralControl("});"))
            pScriptTab.Controls.Add(New LiteralControl("</script>"))
        End If
    End Sub
`	

let TASCHE_4 = ` 
Private Sub GestioneScriptTab()
        Dim strScript As String = ""
               
                Select Case hidTabSelezionato.Text
				$TASCHE_5$                                  
                End Select

        If strScript <> "" Then
            pScriptTab.Controls.Add(New LiteralControl("<script type=""text/javascript"">"))
            pScriptTab.Controls.Add(New LiteralControl("$(function () {"))
            pScriptTab.Controls.Add(New LiteralControl(strScript))
            pScriptTab.Controls.Add(New LiteralControl("});"))
            pScriptTab.Controls.Add(New LiteralControl("</script>"))
        End If
    End Sub
`
let TASCHE_6 = ` 
    <System.Web.Services.WebMethod()> _
    Public Shared Function SetTab(ByVal tab As String) As String
        m_TabSelezionato = tab
        Return ""
    End Function
`		

let TASCHESCRIPT = `
    <script src="Scripts/responsive-tabs.js"></script>    
    <script type="text/javascript">
        $('ul.nav.nav-tabs  a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');                      
        });

        function ClickTab(tab) {                         
            eseguiPageMethod('ImpiantoAnagrafica_S.aspx', 'SetTab', '{ "tab" : "' + tab + '" }');                       
        }

        (function ($) {
            fakewaffle.responsiveTabs(['xs', 'sm']);
        })(jQuery);
    </script> 
    <cbo:PlaceHolder ID="pScriptTab" runat="server"></cbo:PlaceHolder>
`
	    	    	    	  
		
/*				
		||||||| ||      ||||||| ||||||| ||||||| |||||||
		||   || ||      ||   || ||   || ||   || ||   ||
		||   || ||      ||   || ||||||| ||||||| |||||||
		||   || ||      ||   || ||   || ||      ||
		||||||| ||||||| ||||||| ||   || ||      ||		
*/
		
		