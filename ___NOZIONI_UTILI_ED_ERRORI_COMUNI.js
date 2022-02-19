var ERRORI_COMUNI = `
ITEM <label class="argomento VB"></label> MANCA l'iCLASSI_SSQL nella Browse o nella Screen
ITEM <label class="argomento JS"></label>  NON USO IL SELETTORE JQUERY IN JAVACSRIPT MA CHIAMO COME SE FOSSI IN VB!
ITEM <label class="argomento JS"></label>  nel SELETTORE JQUERY manca il #
ITEM <label class="argomento"></label>  usato i simboli sbagliati per la stringa! (' in SQL, " in VB)
ITEM <label class="argomento"></label>  il CODICE del progetto corrente quando istanzio la screen/un oRboWin ('INV','KAI',...!)
ITEM <label class="argomento"></label>  la CONNESSIONE AL DATABASE corretta, se al db o al dbMaster
ITEM <label class="argomento"></label>  manca il TAG  SCRIPT aggiunto nell'head per il js personalizzato (o i tag NON sono nell' ordine corretto)!
ITEM <label class="argomento"></label>  su INVAT non funziona la browse ---> mettere nel case della Page.vb il nome del form!
ITEM <label class="argomento"></label>  la SCREEN non tira su i valori: non passo le chiavi nella query della browse!
ITEM <label class="argomento"></label>  la SCREEN non tira su i valori: non ho specificato il valore del tag BROWSE ed assume sia INS ===> i campi sono vuoti per l'inserimento!!
  ci va <br>opTag.Scrivi("Browse", "Mod")
ITEM <label class="argomento"></label>  la browse non cancella la riga: non passo le chiavi nella query della browse!
ITEM <label class="argomento"></label>  la browse non viene filtrata la primo click ma al secondo sì:
	<br>* nella Load manca il controllo sul btnConferma
	<br>* mancano i cbobuttons
ITEM <label class="argomento"></label>  SCREEN: non funziona un controllo e a seguire gli altri non funzionano!!
ITEM <label class="argomento"></label>  nella BROWSE filtra 2 volte perchè manca il seguente controllo nel Load
	<br>'il button conferma, anche se non visibile va abilitato per i filtri
    <br> Dim ctl As CBO.Web.UI.WebControls.Button = ControlFinder.PageFindControl(Me, "btnConferma")
    <br> If Not ctl Is Nothing Then ctl.Enabled = True
ITEM <label class="argomento"></label>  nel FILTRO che creo non ho messo lo spazio tra due controlli consecutivi!
ITEM <label class="argomento"></label>  nel JAVASCRIPT richiamo il NOME del form, ma in modo sbagliato (è case sensitive!)
ITEM <label class="argomento"></label>  nella SCREEN non inserisco le chiavi (eventualmente nascoste)!
ITEM <label class="argomento"></label>  nella browse/screen una modifica grafica avviene troppo presto/tardi e non è renderizzata!
ITEM <label class="argomento"></label> nella browse c'è un errore in fase di Conferma: ho modificato il testo di un campo avente datafield e quindi non riesce piu a salvarlo:
	<br>creare un textbox ausiliario txtDesc... senza DataField e qui mettere la stringa nuova. Nascondere il campo originario con il DataField.
ITEM <label class="argomento"></label>  nell'RBOWIN ho spostato dei pezzi e ci sono delle virgole di troppo prime del join/where
ITEM <label class="argomento"></label>  nell'RBOWIN non ho messo 'Formdialog' nel percorso!
ITEM <label class="argomento"></label>  manca il controllo sulla NON  NULLITA' di qualcosa in una query
ITEM <label class="argomento"></label>  nel REPORT aggiungo campi con =Field.[...] ma non li aggiungo nella query del click!
  <br>oppure li tiro su (in una browse) dai dati in tabella, ma mancano nei nomi eventuali simboli # o * 
  <br>oppure valorizzo io il campo con le parentesi quadre esterne che non vanno messe! le mettono le librerie!
  <br>Oppure non ho aggiunto la dipendenza del progetto principale (da cui lancio la creazione del report) dalla
  nuova libreria RPT!
ITEM <label class="argomento"></label>  nel report non faccio il DirectCast dei campi / sbaglio l'elemento padre !  
ITEM <label class="argomento"></label>  nel report errore alla riga
 <br>mObjStampa.Report.CboConnection = CBO.Web.UI.Page.Connessione<br>
 a cosa è dovuto?  <br>L'errore è nella CaricaStampa! (copia e incolla senza cambio del nome progetto? nome campi concatenati?)
ITEM <label class="argomento"></label>  manca $Filtro$ nell'rbowin!
ITEM <label class="argomento"></label>  ho aperto in due schede VisualStudio lo stesso progetto (sganciato e in linea?)! CHIUDERLI ENTRAMBI E APRIRNE UNO SOLO 
ITEM <label class="argomento"></label>  nell'RBOWIN ho commentato con i trattini (come su SQL) o con i //// (come in js): SI COMMENTA SOLO CON  /*  */
ITEM <label class="argomento"></label>  la query funziona su SQL perchè è scritta giusta, ma su VB non ho usato DBMaster e non funziona più!!
 <br>OPPURE la query su sql funziona perche mi metto sul db giusto, ma su vb uso un altro db!!! 
ITEM <label class="argomento"></label>   se non funziona un nuovo progetto perchè da errore LC.exe ==> svuotare il file licenses
ITEM <label class="argomento"></label> quando uso una cbrowsetoscreen devo ricordarmi che i campi presenti devono avere isKey="true" per essere editabili! 
ITEM <label class="argomento"></label> Presa una data per impostare la formattazione castandola a stringa devo fare attenzione al fatto che MM indica i MESI, invece mm indica i minuti!!!
 (.toString("yyyy-mm-dd") concatenerà l'anno, i minuti e i giorni!!)
ITEM <label class="argomento"></label> non aggiungo l'inherits nel form creato!! 
ITEM <label class="argomento"></label> un qualche bottone messo sopra la griglia viene incluso nella testata della griglia: i bottoni vanno messi in un class="row" e si risolve il problema 
ITEM <label class="argomento"></label> in javascript le stringhe si concatenano con il + e basta. Il comando & va bene solo in VB.
ITEM <label class="argomento"></label>  su db reale del cliente non riesco a loggare perchè non ho cambiato il Value nel webconfig! 
ITEM <label class="argomento"></label> la screen non salva le modifiche nonostante il click sul pulsante conferma perchè non ho aggiunto i cbobuttons su cui tale click andrà ad agire!
		&lt;cbo:PlaceHolder ID="cboButtons" runat="server"&gt;&lt;cbo:PlaceHolder&gt;		
ITEM <label class="argomento"></label> durante i test di una app perdo tempo a lanciare la app, chiuderla , lanciare la gestione: posso lanciare la app e andare sul progetto gestione, tasto dx Debug->avvia nuova istanza		 
ITEM <label class="argomento"></label> SQL: nel case-when non termino l'istruzione con un END 
ITEM <label class="argomento"></label> aggiungo dei valori a database ed aggiorno la griglia (vb o js) presente nello stesso form: al click sulla riga della griglia esegue più volte il comando relativo.
   <br>NON veniva distrutta la griglia precedentemente all'aggiornamento della browse! (successo con CarBox, autViaggiAllegati.js)   
ITEM <label class="argomento"></label> la dropdownlist/radcombobox non tira su nulla perchè la ho associata al campo sbagliato (la browse anzichè la screen!!!!)      
ITEM <label class="argomento"></label> NELLA BROWSE NON USARE iskey="true" !!!!! 
ITEM <label class="argomento"></label> non va qualcosa di bootstrap (menu, bottoni,...) ---> VERIFICARE I RIFERIMENTI A bootstrap.CSS e bootstrap.JS 
ITEM <label class="argomento"></label> gli spazi e maiuscole/minuscole nelle rbowin!!! 
ITEM <label class="argomento"></label> Quando si fa l'IClassi_Update ATTENZIONE ai nomi delle colonne!! DEVONO ESSERE QUELLI PRESNETI A DATABASE!! 
ITEM <label class="argomento"></label> la connessione è chiusa: POTREBBE ESSERE NON SPUNTATA LA VOCE SALVA PASSWORD NEL MYPROJECT QUANDO IMPOSTO LE CONNECTION STRING
   (cfr. persist security)   
ITEM <label class="argomento"></label> la screen non tira su i valori perchè non va bene l'IClassi_sSql poichè uso DatabaseMaster.dbo.nometabela: 
     mi devo spostare su Master usando la ConnessioneMaster nell'Init della Screen !!!!	 
ITEM <label class="argomento"></label> Nella screen i punti critici che possono dare errore sono 
		<br>1) Iclassi_ssql sbagliato (mancano apici)
		<br>2) connessione sbagliata (serve Master vista l'Iclassi_ssql...)
		<br>3) il codice "INV" o "KAI" del progetto corrente!
		<br>4) Uno ShowLoading non definito sulla pagina che non fa neanche entrare nell'FCODE		
ITEM <label class="argomento"></label> se non va un codice javascript che utilizza un webmethod verificare sia importato il riferimento a Functions.js dove è definito il metodo EsguiPageMethod!!	
ITEM <label class="argomento"></label> nella GestioneTabelle non funziona il Delete perchè non si era impostato il vincolo di primary key su sql in fase di creazione della tabella!!!!	
ITEM <label class="argomento"></label> usando un javascript:__doPostBack(.....) non funziona perchè ho cambiato gli underscore con i $, va benissimo lasciare i dollari,
	  (anche se sto usando il controllo in codice html generato a runtime da vb!)	  	  
ITEM <label class="argomento"></label> errore chiamata web method: il nome della firma deve essere lo stesso neò javascript e nella definizione vb!	  
ITEM <label class="argomento"></label> Nella browse non tiro su la chiave (eventualmente con AS [*..] ) e non capisco perchè la screeen sembri funzionare in parte ----> nella screen funzionano solo i campi che sono passati tramite il Tag (ossia quelli presenti nella riga cliccata) 
ITEM <label class="argomento"></label> Nella screen/browse il click su un pulsante che clicka un cboButton (Modifica, esci, conferma) non funziona: c'è scritto che prima deve farre lo showloading ma non è definito nel form e va in errore prima di cliccarlo!!! 
ITEM <label class="argomento"></label> Nell'iclassiUpdate errore 'near W': non c'è nessuna condizione where ----> devo passare le chiavi reali e corrette nell'iclassiSsql!!!!!!!!! sennò non crea il where! 
ITEM <label class="argomento"></label> Errore nella gestione tabelle di salvataggio/modifica/eliminazione: NON ESISTE IL CAMPO CHIAVE! 
ITEM <label class="argomento"></label> HTML a runtime non funziona: NON VANNO USATO CONTROLLI TIPO CBO:... o ASP:..., ma i controlli html classici
ITEM <label class="argomento"></label> Nel FORMDIALOG manca il tag <form> (e da errore Me = nothing...) 
ITEM <label class="argomento"></label> nella browse non nasconde bene le colonne: vanno messe 2 righe x nascondere testata e colonna!
		<br>m_GrigliaWeb.Columns.FindByDataField("QtaFurgone").HeaderStyle.CssClass = "hidden"
        <br>m_GrigliaWeb.Columns.FindByDataField("QtaFurgone").ItemStyle.CssClass = "hidden"		
ITEM <label class="argomento"></label> il RecordSet della Browse è nothing, ma visualizzo la griglia:
		<br>a seguito del postback si è svuotato e quindi la griglia che vedevo funzionava correttamente, ora manca un qualche 
		<br>RiempiGriglia() da qualche parte in cui viene riempito il RecordSet!		
ITEM <label class="argomento"></label> Nei cMsg non usare nel testo tra " " l'apostrofo: viene visto come fine stringa da js e da errrore js sebbene scritto nel vb!!!!
  <br>[l'errore è Uncaught SyntaxError: missing ) after argument list ]  
ITEM <label class="argomento"></label> REPORT: in fase di creazione del progettoRPT aggiungere tutti i riferimenti necessari!
  <br>Sicuro quelli che ho aggiunto io su Carbox:
	<br>CBO, CBOStampe, CBOUtil, System.Web, Telerik.Reporting
	+ il riferimento a tale progetto nel progetto che crea i report		
ITEM <label class="argomento"></label> NON POSSO USARE UN Telerik.Web.UI.RadScriptManager.RegisterStartupScript(upIntCh, upIntCh.GetType, "1", sScript, True)
	nell'FCODE....	
ITEM <label class="argomento"></label> Nella cwinDef non riesco a selezionare una colonna con m_GrigliaWeb.Columns.FindByDataField()
  <br> ---> la colonna si chiama *Nome o #Nome! 
ITEM <label class="argomento"></label> la pagina crea controlli di tipo ctl01 anzichè ctl00: potrebbe essere che in fase di caricamento delle Autorizzazioni vi sia qualche errore!
   <br>(la property masterPage non va modificata dopo aver creato le Autorizzazioni)
		
ITEM <label class="argomento"></label> nella Browse da errore nell'Evaluete -----> è sbagliata la sigla del progetto!!!
ITEM <label class="argomento"></label> nell'InizializzaFiltri non compila giusto un combobox:
		<br>- errore nella query del combobox/nell'uso di datavaluefileld o datatextfield
		<br>- nel prerender:
			<br>'poichè al primo giro quando passa nell'inizializzafiltri non ha ancora tirato su i dati del combobox:
			<br>If Not IsPostBack Then cmbWsTuit.SelectedValue = m_WsTuit		
ITEM <label class="argomento"></label>  a seguito di uno SWITCH CASE nel js succede qualcosa di anomalo:
       <br> in un case manca un break; e viene eseguita anche l'opzione default 
ITEM <label class="argomento"></label> cScreen JAVASCRIPT: se ho due controlli con lo stesso cbodatafield viene preso in fase di lettura/scrittura "l'ultimo", vanno inserito da codice eventuali cbodatafield...
 <br>(cfr. CSI_MBE appPropostaLiquidazione.js, metodo CaricaDati())		
ITEM <label class="argomento"></label> ERRORE javascript del cbowebresource: MANCA QUALOCA NEL GLOBAL ASAX!!!
ITEM <label class="argomento"></label> Errore Internal server Error:
	<br>- ho scritto male (case sensitive) i parametri nel js rispetto al vb
	<br>- nel parametro json sono presenti a capo (o caratteri che non vanno bene, non saprei quali ad ora)
		<br>es.  op.Scrivi('', oScreen.CreaStringone().replaceAll("\n", "\\n"));    //per evitare problemi nel json sostituisco gli a capo 
ITEM <label class="argomento"></label> in una cbrowsetoscreen non crea una colonna nella griglia ---> quando la ho creata ho messo uno spazio nel primo valore(es. m_oGridFasi.Column.Add("Stato ", "Stato")	ANZICHè m_oGridFasi.Column.Add("Stato", "Stato")		)		
ITEM <label class="argomento"></label> errore login s database non demo: non ho cambiato il value di  HR usato dal cliente!	
ITEM <label class="argomento"></label> schermata gialla in un form con griglia di griglia: è dovuto all'itemexpand (cfr Ardes SchedaLottoProduzione)
ITEM <label class="argomento"></label> nonostante nell'F5 apra un form dialog va comuqnue alla screen senza (pagina che non esiste): ho lasciato nell'init della browse tale valore! sovrascrive il mio redirect dell'FCODE
ITEM <label class="argomento"></label> il report è blank: c'è qualcosa di Visible = false??? Qulcosa dell'Header straborda sul detail???		
ITEM <label class="argomento"></label> nel report non tira su niente se non un quadrato con l'errore riguardante il ContentText ---> l'errore ruguarda la query , non ho passato il tag "SOURCE" nell'opParam o è scritto male tipo "SQL"...		
ITEM <label class="argomento"></label> Il MsgBox non viene renderizzato ---> c'è un apostrofo che fa saltare il tutto!
ITEM <label class="argomento"></label> errore sull'evaluete: è sbagliata la sigla della browse
ITEM <label class="argomento"></label> CLiccando sul btnIndietro la screen è vuota: passare nel click il tag in cui specifico le chiavi (e il tag browse)
ITEM <label class="argomento"></label> Login: non funziona
	<br>- il codice applicazione (=valore nel web.config) è lo stesso associato all'utente che uso?
	<br>- maiuscole/minuscole
	<br>- copiando è rimasto scritto in qualche funzione/query il nome del vecchio 

ITEM <label class="argomento"></label> in una app Frontend non funziona il webservice 
		<br>- nel WS non è presente il Global.asax (errore nel send)
		<br>- passo parametri sbagliati (troppi/pochi o errore maiuscolo/miniscolo)
		<br>-nell'app js il riferimento all'UrlService è sbagliato: il WS gira su un'altra porta)
ITEM <label class="argomento"></label> non tira su le glyphicon (ma bootstrap funziona) ---> manca la cartella Fonts con dentro i glyphicon
ITEM <label class="argomento"></label> se la browse non trova i System.Windows.Forms agg nel MYPROJECT	
	<br>C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5.1\System.Windows.Forms.dll
ITEM <label class="argomento"></label> "Impossibile trovare il membro pubblico 'Path' nel tipo 'gesdefault_aspx'" --->  il form non presenta l'inherit al Page corretto!!
ITEM <label class="argomento"></label> Nelle librerie non posso usare CBO.Web.UI.Page.*!!! (soprattutto se devo registrare un evento!=)
ITEM <label class="argomento"></label> Nell'update da l'errore "Connessione chiusa" ---> nel Myroject manca la spunta SALVA PASSWORD
ITEM <label class="argomento"></label> Per fare un "update a mano" tramite IClassi_Update, nel caso debba passare un decimale scriverlo nell'IClassi_Proprieta come "3,14" 
   <br>anzichè nel formato "3.14" (che è la formattazione che si usa su SQL...)
ITEM <label class="argomento"></label> Errori con i riferimenti: i Framework non sono uguali nei vari progetti		
ITEM <label class="argomento JS"></label> Il Bactick è ALT+96
ITEM <label class="argomento"></label> Al conferma del Form Dialog passa dall'F10 ma non entra nell'AferUpdate ---> uso un Overrides Function IClassi_Update che non fa andare a buon fine l'update!
ITEM <label class="argomento"></label> Non compila l'AggID/Da errore sull'AggId ---> il tipo non èp Timestamp!!
ITEM <label class="argomento"></label> la cBrowseToscreen non si aggiorna dopo che aggiorno i valori a database: fare
		PopolaDtProduzioni()
		grdProduzioni.DataSource = m_dtProduzioni
		grdProduzioni.Rebind()
ITEM <label class="argomento"></label> Non riesco a cambiare la grafica della griglia nonostante le modifiche nella cWinDef siano applicate ---> modificare ad hoc il css che le va a sovrascrivere!
		Es. .RadGrid_Bootstrap .rgAltRow>td {
				background-color:  transparent;
			}
ITEM <label class="argomento"></label> Il report da problemi durante la registrazione evento nelle cStampa: 
		sulla kai_TabReportWEB il nome è CASE-SENSITIVE!		
ITEM <label class="argomento"></label> Per spezzare/mantenere sulla stessa pagina un report o subreport usare KeepTogether = False/true		
	(per il subreport va fatto dal report con tasto dx click proprietà)
ITEM <label class="argomento"></label> Per aprire il DbManager in modo che sia abilitato il pulsante RboWin devo lanciarlo con \DEV
		- Sul mio pc posso aggiungerlo nel path direttamente
		- Sul server devo invece (per non lasciare in chiaro tale possibilità di modifica delle rbowin) fare WIN+R e lanciare il path con \DEV
ITEM <label class="argomento"></label> Al click sul btn dopo l'evento js passa l'evento VB, non si stoppa con un return false
			usare event.preventDefault();
ITEM <label class="argomento"></label> Per usare fancybox:
		
&lt;link href="Css/jquery.fancybox.min.css" rel="stylesheet" /&gt;
		&lt;script src="Scripts/jquery.fancybox.min.js"&gt;&lt;/script&gt;

		&lt;script&gt;
			$(document).ready(function () {
				$.fancybox.defaults.clickOutside = "close";
				$.fancybox.defaults.clickSlide = "close";
				$.fancybox.defaults.loop = true;
			});
		&lt;/script&gt;
		
		ed aggiungere i file js e css	
ITEM <label class="argomento"></label> Nascondere colonna nella cwinDef
		m_GrigliaWeb.Columns.FindByDataField("DataChiusura").HeaderStyle.CssClass = "nascosto"
        m_GrigliaWeb.Columns.FindByDataField("DataChiusura").ItemStyle.CssClass = "nascosto"
        m_GrigliaWeb.Columns.FindByDataField("DataChiusura").Display = False		
ITEM <label class="argomento"></label> L'ordinamento della colonna con una data non funziona: ordina come se fosse una stringa non una data!
	OSS: Nelle query non usare mai i CONVERT/CAST per formattare la data perchè il risultato è un Varchar e quindi se volessi riordinare la colonna 
	lka browse utilizzerebbe un ordinamento lessicografico anzichè quello temporale!
ITEM <label class="argomento"></label> Nel browser chrome della VM non visualizzo correttamente eventuali popup: disabilitare l'accelerazioen hardware!		
ITEM <label class="argomento"></label> Per le righe che si esplodono servono:
	<br>1) campo @ nella query
	<br>2) codice html ad hoc:<br>
	&lt;ClientSettings&gt;
		&lt;ClientEvents OnRowClick="RowClick" /&gt;
	&lt;ClientSettings&gt;
	&lt;MasterTableView EnableHierarchyExpandAll="true" HierarchyLoadMode="Client"&gt;        
		&lt;NestedViewTemplate&gt;
			&lt;div class="row" style="background-color: #ebf8ff;margin: 0"&gt;
				&lt;div class="col-xs-12 col-md-6 col-lg-3"&gt;
					&lt;small&gt;&lt;em&gt;Impianto&lt;/em&gt;&lt;/small&gt;&lt;br /&gt;
					&lt;asp:LinkButton ID="btn" runat="server"
						OnClientClick='&lt;%#Eval("@codice", "javascript:Filtro({0});return false;")%&gt;'
						Text='&lt;%#Eval("@Impianto")%&gt;'&gt;
						&lt;/asp:LinkButton&gt;                                                                                   
				&lt;/div&gt;                                    
			&lt;/div&gt;                
		&lt;/NestedViewTemplate&gt;
	&lt;/MasterTableView&gt;
&lt;/cbo:GridView&gt;		
ITEM <label class="argomento"></label> Per gestire gli spazi e gli a capo posso usare le proprietà
	white-space: pre;	
	white-space: pre-line;
	white-space: pre-wrap;
	cfr. <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/white-space' class='Link' style=''>developer.mozilla</a>
	
Altresì poso fare
	Replace(vbCrLf, "<br>")
ITEM <label class="argomento"></label> USARE UNO USER CONTROL

	1) Private ucInvioMailOrg As ucInvioMailOrg

	2) Nell'Init
		ucInvioMailOrg = LoadControl("~/UserControl/ucInvioMailOrg.ascx")

	3) pInvioMailOrg.Controls.Add(ucInvioMailOrg)	
ITEM <label class="argomento"></label> Nuovo tooltip Telerik:

sMotivoRidotto = item("Motivo").Text

'nuova gestione tooltip'
item("Motivo").Controls.Clear()
Dim label As New Label
With label
	.ID = "lblMotivo_" & item("*Id").Text
	.Text = sMotivoRidotto
	.Attributes("Multiline") = True
End With
Dim sInfoAgg As String = cDBUtility.DLookUp(MasterHR.Web.UI.Page.Connessione, "NoteAgg", "Telefonate_Ingresso", "Id =" & item("id").Text).Replace(vbCrLf, "<br>")

Dim Tooltip As New Telerik.Web.UI.RadToolTip
With Tooltip
	.RenderMode = Telerik.Web.UI.RenderMode.Lightweight
	.RelativeTo = Telerik.Web.UI.ToolTipRelativeDisplay.Element
	.Position = Telerik.Web.UI.ToolTipPosition.TopCenter
	.TargetControlID = "lblMotivo_" & item("*Id").Text
	If sInfoAgg <> "" Then
		.Text = sMotivo & "<br><br>" & "<b>Info Agg.</b><br>" & sInfoAgg
	Else
		.Text = sMotivo
	End If
	.AutoCloseDelay = 300000
End With

item("Motivo").Controls.Add(label)
item("Motivo").Controls.Add(Tooltip)
'fine tooltip

ITEM <label class="argomento"></label> Subreport Telerik:
In un report per aggiungere un sottoreport:

0) CREO il nuovo sottoreport (è come creare un report classico, scelgo Telerik (blank) e lascio solo il detail, tolgo header e footer)

1) una volta creato devo specificare quali sono le chiavi che dovranno essergli passate:
click sul vuoto: tasto dx Report Parameter ed aggiungo il parametro
click sul vuoto: tasto dx Filter e definisco il filtro che coinvolge il parametro 

2) aggiungo il subreport nel report 
tasto dx sul subreport: Report Source 

(per ulteriori dettaglio appunti sul quadreno)
ITEM <label class="argomento"></label> Per aggiungere lo showloading, devo aggiungere nella MasterPage

<telerik:RadAjaxLoadingPanel runat="server" ID="raLoadingPanel">
	</telerik:RadAjaxLoadingPanel> 

</script>
	function ShowLoading() {
		$find("ctl00_raLoadingPanel").show("aspnetForm");
	}
	function HideLoading() {
		$find("ctl00_raLoadingPanel").show("aspnetForm");
	}
</script>
ITEM <label class="argomento"></label> Scaricare uno .zip
Prima creo/copio in una cartella tutti i file da zippare, con path del tipo "...\TMP\..." poi:

	Dim zipPath As String = HttpContext.Current.Request.PhysicalApplicationPath & "Tmp\DownloadZIP_" & sDataOra & ".zip"
	ZipFile.CreateFromDirectory(sPathTmp, zipPath)
	Response.ContentType = "application/zip"
	Response.AddHeader("content-disposition", "attachment; filename=DownloadZIP_" + sDataOra + ".zip")
	Response.WriteFile(zipPath)
	Response.End()
ITEM <label class="argomento"></label> Scaricare allegato
<a id="btnWin" href="Supremo/SupremoLercari.exe" target="_blank"></a>
ITEM <label class="argomento"></label> Restore database grandi
SELEZIONARE il PATH per il ripristino in T:\DbSql\
scrivendo sia per il file .MDF si per il .LDF i percorsi, esempio:

T:\DbSql\ARDES.MDF
T:\DbSql\ARDES_1.LDF
ITEM <label class="argomento"></label> RegisterStartupScript:
        Dim sScript As String = "alert(1234)"
        ClientScript.RegisterStartupScript(Me.GetType, "", sScript, True)
ITEM <label class="argomento"></label> Se voglio che una property sia accessibile in ogni pagina del progetto, la aggiungo direttamente nella Page.vb dello specifico progetto (NON IN QUELLA CBO, essa ne è il padre!)
Tuttavia ogniqualvolta passo dal menu pulisco i pagevalue (e le property della pagina sono passate come PageValue della pagina) e quindi essa perderebbe il suo contenuto.
Per mantenere costante il valore lo salvo come oggetto di sessione, ad esempio

	Public Shared Property m_TipoAna As String
		Get
			Return CType(cFunzioni.Nz(System.Web.HttpContext.Current.Session("TipoAna"), ""), String)
		End Get
		Set(ByVal value As String)
			System.Web.HttpContext.Current.Session("TipoAna") = value
		End Set
	End Property

Per inizializzare il valore una sola volta, posso inizializzare la property nell'evento INIT della Page, in modo da 
			1.essere sicuro che la property viene inizializzata
			2. inizializzarla una sola volta (la classe la istanzio solo una volta essendo il padre di tutte le classi delle pagine)
ITEM <label class="argomento"></label> System.IO.Path.GetFileName(path)
ITEM <label class="argomento"></label> Per modificare un generico report personalizzato ed impostarlo da visualizzare su HR devo modificare il corrispondente valore nell RBO_STAMPE.

SE PERO' MODIFICO UN RAPPORTINO (la stampa di un intervento) devo modificare il valore nella kai_TabReportWeb!!
( per vedere il rapportino devo fare MLift,scelgo impianto, nuva chiamta, conf ed evadi, compilo i campi e conferma)
IMPORTANTE CHE IN RIGAREPORT1 CI SIA 15 perchè così usa telerik!
ITEM <label class="argomento"></label> Si trovano facendo
	  SELECT FileModelloMAil, * from [DEMO_MasterLift].[dbo].[AI_TabInterventi]
		\\serversviluppo\Resource-SourceSafe\AppWeb\MasterHR\MailClienti\Millepiani\Millepiani_InterventoChiamata_$.txt
oppure sono nel path presente nel tag scritto nel parametro MIM
		\\serverinternet\apps\MasterLift\Documenti2\ModelliMail

La cModelliMail espone un enumeratore: a partire da tale valore numerico creo il tag da mettere nel parametro
  <MODELLOn>path\File_$.txt</MODELLOn>
  e il nome del file è _$ perchè andrò di volta in volta ad apreire quello che voglio, infatti:

Esistono tre modelli per la mail: 
		quello per l'oggetto (_O)
		quello per il body   (_B)
		quello per la firma  (_F)

\\serversviluppo\Resource-SourceSafe\AppWeb\MasterHR\MailClienti\Millepiani\Millepiani_InterventoChiamata_$.txt
ITEM <label class="argomento"></label> Per ottenere la MasterPage di una pagina (per passarla come pagevalue, serve ere le autorizzazioni!) posso sempre fare

pv("m_MasterPage") = "~/MasterPageImpianti.Master"
ITEM <label class="argomento"></label> Master legge nella tabella TTW che è presente in ogni database (viene aggiunta in fase di installazione)
sono presenti le righe che rimandano ai vari database utilizzabili: esse sono quelle mostrate all'apertura di Master
nel menu a tendina 
ITEM <label class="argomento"></label> 1) per ritagliare una immagine: scelgo lo strumento di ritaglio e poi INVIO per cancellare la parte esterna al taglio

2) per scalare l'immagine: dal menu in alto IMMAGINE -> SCALA IMMAGINE (OSS: se aumento i pixel della risoluzione diventa meno rumorosa!)

3) per esportare l'immagine in formato png/jpg: CTRL+SHIFT+E
ITEM <label class="argomento"></label> Per ripulire il più possibile i dati inseriti dal cliente in modo da evitare problemi causati da caratteri non riconosviuti 
dal codice:

1) //Invalid characters copied from internet get converted to 0xFFFD on parsing, so any invalid character codes would get 
	replaced with:  replaceAll(/\uFFFD/g, '')
	(https://stackoverflow.com/questions/12754256/removing-invalid-characters-in-javascript)
	Inoltre i caratteri di escape \ danno errore!
	
  ES: lato js posso fare
    $('#txt').change(function () {
        $('#txt').val($('#txt').val().replaceAll('\\', '-').replaceAll(/\uFFFD/g, ''));
    });
	
	
ITEM <label class="argomento"></label> FILTRI CON MULTISELEZIONE
1) lato .ASPX
	&lt;telerik:RadComboBox ID="cmb" runat="server" Width="100%" LarghezzaColonne="90;250" TypeControl="ComboBox" TypeData="Text" DataValueField="" DataTextField="" AccettaTesto="false"
                    CheckBoxes="true"  AllowCustomText="false" CheckedItemsTexts="DisplayAllInInput" &gt;                                
    &lt;/telerik:RadComboBox&gt;
	
2) lato RBOWIN	
	creo la query

3) lato VB	
 i) creo la property 
 ii) Nell'INIT, dopo aver istanziato la Browse
	
		Dim oDbWin As CInfoDBWin = CInfoDBWin.GetInfoDBWin(enuAppPlatform.Web, Connessione, "cer", CInfoDBWin.enuModalitaDBWin.F2, "~/cerPianificazioneVisite_B.aspx", "cmbTipoImpianto", 1)
		Dim dt As DataTable = cDBUtility.GetDataTable(oDbWin.SQLString, Connessione)
		cmbTipoImpianto.DataSource = dt
		cmbTipoImpianto.DataValueField = "Codice"
		cmbTipoImpianto.DataTextField = "Tipologia"
		cmbTipoImpianto.DataBind()
 
 iii) Nell'INIZIALIZZAFILTRI
 		'filtro per tipo impianto
        For Each tipo As String In m_FiltroTipoImpianto.Split(",")
            cmbTipoImpianto.FindItemByValue(tipo).Checked = True
        Next
 
 iv)Nel SALVAFILTRI
  'filtro per tipo impianto
        m_FiltroTipoImpianto = ""
        For Each item As RadComboBoxItem In cmbTipoImpianto.CheckedItems
            m_FiltroTipoImpianto += item.Value & ","
        Next
        If Right(m_FiltroTipoImpianto, 1) = "," Then m_FiltroTipoImpianto = m_FiltroTipoImpianto.Substring(0, m_FiltroTipoImpianto.Length - 1)

 v)Nel CREAFILTRO
		  'tipo impianti
        If cmbTipoImpianto.CheckedItems.Count > 0 Then
            sReturn += " AND AI_TabTipologie.Codice IN ("
            For Each item As RadComboBoxItem In cmbTipoImpianto.CheckedItems
                sReturn += "'" & item.Value & "', "
            Next
            sReturn = sReturn.Substring(0, sReturn.Length - 2)
            sReturn += ")"
        End If 
		
 
 
 vi) Nel PULISCI FILTRI
	 For Each item As RadComboBoxItem In cmbTipoImpianto.Items
            item.Checked = False
        Next
ITEM <label class="argomento"></label> DECLARE @Anno as varchar(10)
DECLARE @Progressivo as varchar(10)

SET @Anno = '2021'
SET @Progressivo = 'LTM'

DECLARE @NDef as integer
SET @NDef = (SELECT N_Def FROM $dbMaster$.dbo.mas_TabPro WHERE Codice = @Progressivo AND Anno = @Anno AND Lingua = 'ITA')

DECLARE @NIni as varchar(10)
SET @NIni = (SELECT LEFT(CAST(@Ndef as varchar(10)), 2)) + '00000'

CREATE TABLE #Lotti
(
    Lotto varchar(20)
)

WHILE (@NIni <=@NDef)
BEGIN
    INSERT INTO #Lotti (Lotto) VALUES ('MP' + @NIni)
	SET @NIni = @NIni + 1
END

ITEM <label class="argomento"></label> Dropdownlist con itemlist a sorgente

&lt;cbo:DropDownList ID="cmbInviati" runat="server" CssClass="form-control"&gt;
	&lt;asp:ListItem Value="NO"&gt;No&lt;/asp:ListItem&gt;
	&lt;asp:ListItem Value="SI"&gt;Sì&lt;/asp:ListItem&gt;
	&lt;asp:ListItem Value="TUTTI"&gt;Tutti &lt;/asp:ListItem&gt;
&lt;/cbo:DropDownList&gt;
ITEM <label class="argomento"></label> Disabilitare click cella

1) Nella cWinDef
   
   Private Sub ElencoOrdini_B__grdGriglia__1(ByRef CboObject As Object) 
		...   
        m_GrigliaWeb.Columns.FindByDataField("NOMECOLONNA").ItemStyle.CssClass = "DisableClick"
		
2) Nel js
	$(document).ready(function () {
		$('.DisableClick').click(false);
	});
ITEM <label class="argomento"></label> Detect if Chrome:
As of Chrome 89 (March 2021) Chrome now supports User Agent Hints. So now this should be done using:
	navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.some(b => b.brand === 'Google Chrome')
This returns true for Chrome 89 and above, false for the latest Opera and Edge, and undefined for browsers that don't support userAgentData.
	
Codice da usare nel javascript del form login(o dopo se c'è gestione lingua e devo avere l'utente per intercettare la lingua corretta!)

    try{
        //if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime))
        if(!(navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.some(b => b.brand === 'Google Chrome')) && localStorage['MBE_VerificaBrowser'] != 'Verificato')
        { localStorage['MBE_VerificaBrowser'] = 'Verificato';
            //alert('Attenzione: il software è sviluppato per funzionare correttamente sul browser Google Chrome. Usando un diverso browser alcune funzionalità potrebbero non funzionare correttamente') 
            // Attention: current application is fully supported by Google Chrome Browser. By using different browser some functionalities may not be working correctly
            alert(callWebService('ComuneWs.svc', 'GetMessaggio', '{ "CodApp" : "' + codApp + '", "CodLingua" : "", "CodMessaggio" : "VerificaBrowser" }'));
        }
    }
    catch(error)
    {   localStorage['MBE_VerificaBrowser'] = 'Verificato'
        //alert('Attenzione: il software è sviluppato per funzionare correttamente sul browser Google Chrome!')
        alert(callWebService('ComuneWs.svc', 'GetMessaggio', '{ "CodApp" : "' + codApp + '", "CodLingua" : "", "CodMessaggio" : "VerificaBrowser" }'));
    }

----------------------------------------------------------------------------------------------------------------------------------------------------------------
OLD (funziona, ma potrebbe dare falsi positivi)
!!window.chrome &&(!! window.chrome.webstore || !!window.chrome.runtime)
----------------------------------------------------------------------------------------------------------------------------------------------------------------
ITEM <label class="argomento"></label> Detect if android.....TODO!! cfr 
ITEM <label class="argomento"></label> Per debuggare un servizio:
1)installo il servizio 
2) lancio vb
3) DEBUG -> Connetti a processo
4) se non vedessi il mio servizio --> spunta MOSTRA I PROCESSI DI TUTTI GLI UTENTI
ITEM <label class="argomento SQL"></label>  DECLARE @Today DATETIME;  
SET @Today = '2021-08-09';  
  
SET LANGUAGE Italian;  
SELECT DATENAME(month, @Today) AS 'Month Name';  
  
SET LANGUAGE us_english;  
SELECT DATENAME(month, @Today) AS 'Month Name' ; 		
ITEM <label class="argomento"></label> Nella cStart di certi programmi (tipo CarBox)
si verifica se il numero di versione salvato a DB è minore di quello nel webConfig attuale:

nel caso lo fosse, sono lanciati i metodi per aggiornare le rbowin e i parametri.

- Prima degli aggiornamenti apro l'RBOWIN e faccio "Genera Classe VB": 
copio nel codice la classe utilizzata nel metodo specifio.

- Per i Parametri invece devo creare a mano il codice relativo ai DB
 (tipicamenti in essi metto del codice di deafult in modo che se non compilati correttamente i parametri sul 
  server del cliente il programma funzioni correttamente.)
  
(tipicamente si occupa Matteo di tenere aggiornata la cStart)  
ITEM <label class="argomento"></label> passwordField.addEventListener( 'keydown', function( event ) {
  var caps = event.getModifierState && event.getModifierState( 'CapsLock' );
  console.log( caps ); // true when you press the keyboard CapsLock key
});
ITEM <label class="argomento VB"></label> Per testare un progetto (es. HR) su un database diverso da quello standard devo effettuare 3 modifiche:

1) Modificare le stringhe di connessione

2) prendere nel database Master dalla tabella "mas_WebTabApp" il "Codice" corretto (es. su ARDES MasterHR ha codice "HR", ma sul Demo è "03", altrove è "003".....)

3) Lanciare la query
		SELECT   t.name AS 'TABELLA' FROM sys.tables  t  WHERE t.name LIKE '%rbo%'  
   se trovo una rbowin personalizzata devo mettere nel web.config il valore nella riga
		<add key="NomeApplicazionePersonalizzata" value="***" />

4)PER LOGGARE con un nuovo utente presente nel database 
(credenziali non criptate scritte nella anapersone  nei campi [UtenteWeb] e [PasswordWeb], 
 credenziali criptate scritte nella mas_WebUtenti nei campi [WebUserID] e [WebPassword])
ITEM <label class="argomento"></label> Creazione app con frontend (.NET) e backend (JS)

1) Visual studio assegna automaticamente una porta sul localhost ai progetti: 
   i)visualizzare quale viene assegnata al WEB SERVICE (lanciandolo oppure dal MyProject\Web\URL Progetto)
   ii) Nel file app.js modificare di conseguenza l'urlWebService 
2) Nel file app.js modificare il prefisso con il nuovo prefisso del database e il codApp (dovrebbe essere sempre APP, ma
comuqnue verificare referenzi il campo Codice nella mas_WebTabApp)   



CREAZIONE DEL WS
1) Devono essere create le pagine
	- web.Config
	- Global.asax
	- Comune.vb (in cui ho i metodi VB specifici)
	- file .svc con il servizio (Aggiungi -> Servizio WCF compatibile con AJAX)	
2) prendo dal MyProject la porta del localhost e la scrivo nell'app.js
3) creo la CnnString 



CREAZIONE DI UN PROGETTO (FRONTEND/BACKEND)
1)Aggiungere le cartelle Fonts, Images, Scripts, ClassVB
e riempirle di conseguenza!
	
IMPORTANTE NEL we.Config del BACKEND
<authentication mode="Forms">
      <forms name=".AUTCLKGES" loginUrl="gesLogin.aspx" timeout="480"/>
    </authentication>	
ITEM <label class="argomento"></label> per aggiornare master devo
- se va aggiornata la struttura del database lanciato prima il server e poi il client
- se (come nel caso di noiin sviluppo) il db è gia aggiornato, lanci osolo il client


gli aggiornamenti si trovano su serverad/CdMaster!
ITEM <label class="argomento"></label> CssClass="form-control" 

CssClassDisable="cboTextBoxDisable"
ITEM <label class="argomento VB"></label> Gestire checkbox nei report:
!!!NELL ItemDataBinding!!!
1) imposto il TRUEVALUE a 1 (di default è "true")
2) se non ancora impostato scrivo il test del checkbox NON in un txt a lato, ma nell'attributo Text del checkbox!
3) se dipende dal field.[...] scrivo la condizione  (value) lato progettazione
senno laro codice
	chkSi = DirectCast(Telerik.Reporting.Processing.ElementTreeHelper.GetChildByName(pInterv, "chkAutospurgoSi"), Telerik.Reporting.Processing.CheckBox)
	chkNo = DirectCast(Telerik.Reporting.Processing.ElementTreeHelper.GetChildByName(pInterv, "chkAutospurgoNo"), Telerik.Reporting.Processing.CheckBox)

	If r("EsitoSi") = "1" Then
	chkSi.Value = "1"
	chkNo.Value = "0"
	Else
	chkSi.Value = "0"
	chkNo.Value = "1"
	End If
	
-------
Per forzare il check di un checkbox:
dal form di Progettazione nel Value imposto  = True 
ITEM <label class="argomento"></label> COnnessione MAster nel reportDim CnnStringMaster As String = CBO.Web.UI.Page.Connessione.ConnectionString.Replace("_MasterLift", "")
ITEM <label class="argomento"></label> Report info utili:
Note Report:
1) i valori tirati su tramite =Fields.[nomecampo] sono i valori indicati nel select della query che si esegue al clik del pulsante Stampa!

1.5) 
se creoDim section As Telerik.Reporting.Processing.DetailSection = TryCast(sender, Telerik.Reporting.Processing.DetailSection)

posso fare sectionDataObject degli oggetti richiamati lì dentro con =Fields.[NomeCampoADatabase]


2)per nascondere un campo:
			se è nella section/nomePannello
            txt = DirectCast(Telerik.Reporting.Processing.ElementTreeHelper.GetChildByName(section/nomePannello, "ID"), Telerik.Reporting.Processing.TextBox)
            txt.Visible = False
			
            nomePannello.Visible = False
3)una volta effettuato il DirectCast a TextBox posso usare per l'elemento txt i classici attributi (.text, .height,...)

4)per impostarne l'altezza a n pixel

            nomePannello.Height = New Telerik.Reporting.Drawing.Unit("n px")
			
5) per passa re ad un report il datatable presente (senza dover specificare quindi la source nell'opParam) ( e per poter 
portarsi dietro eventuali ordinazioni della tabella) fare

cStampaHR.ApriStampa("Scadenzario", "Elenco_O", opParam, m_oBrowse.RecordsetFiltrato)

NON VA COMPILATO opParam.Scrivi("SOURCE,....) o tale comando viene ignorato!!!!
(assicurarsi che nella firm del emtodo vi sia la possibilità di passare tale datatable e che esista RecordsetFiltrato!)		

REPORT: in fase di creazione del progettoRPT aggiungere tutti i riferimenti necessari!
  Sicuro quelli che ho aggiunto io su Carbox:
	CBO, CBOStampe, CBOUtil, System.Web, Telerik.Reporting
	+ il riferimento a tale progetto nel progetto che crea i report	
ITEM <label class="argomento"></label> Report info utili 2:
IMPORTANTISSIMO
Per i report personalizzati creo un Namaespace ad hoc:
	non ha quindi senso avere un report personalizzato nel Namespace N che si chiama rNomeDelReport_N, 
	basta rNomeDelReport come per quello originale

TEST
per fare i test sui rapportini devo andare nell'elenco evasioni e selezionare una evasione esistente e con i valori di 
serieintervento, codtipoimpianto, codint
dell'evasione che corrispondono a quelli del report che voglio, come indicato nella kai_TabReportweb
ricreo il report e lo visualizzo

E SOPRATTUTTO 
se lavoro su db reale del cliente adattare il parametro DDI con un path esistente 

ITEM <label class="argomento"></label> SubReport:
1) se all'improvviso e senza motivo apparente sparisce il sottoreport dal pdf:
click, nella pagina di Progettazione, 
sul subreport ---> tasto dx reportsource e vedo se è associata una source o meno!



//CREARE SUBREPORT//
1) creo report normale
	a. Click sul vuoto Report Parameters aggiungo la chiave/parametro che userà la query del subreport (*)
	b. Filter: qui aggiungo il filtro per il parametro  (sennò tira su tutte le righe del db!)
	c. Click sul vuoto nella pagina del subreport: 
		- expression = fields.NomeCampo (**)
		- Operator (lascio "=" )
		- Value = Parametrs.NomeCampoValue (*)
2) Nel form del report aggiungo al subreport la datasource:
  a. (prima compilo il progetto RPT, senno potrebbe non suggerirmi il subreport appena creato!
     tasto dx sul subreport ---> Report Source ---> aggiungo il sottoreport creato (i.e. la CLASSE del subreport)
    (Load report from Object e lo seleziono)
 b. Edit Parameters ---> quì passo le chiavi  
5) Nel report: aggiungo la ReportSource del subreport
	ParameterName  = nomeCampo (**)
	ParameterValue = Fields.Nome Colonna Database
ITEM <label class="argomento"></label> Nei report fare attenzione a non usare le info relative all'utente nel detttaglio della stampa,
con nome dell'utente va non chi ha stampato il report al momento (= utente loggato)
ma l'assegnatario dell'intervento o al più chio presente nella manodopera!!! 

ITEM <label class="argomento"></label> 1) Nella kai_Organigramma creo (se serve) un nuovo livello e prendo il valore IdOrg corrispondente

2) Nella kai_OrganigrammaLegami aggiungo per ogni persona appartenente al livello creato una riga nuova dove specifico:
		- Cod_Persona che specifica un personaggio dell'AnaPersone
		- l'IdOrg ottenuto in (1)

3) Nella kai_TabStruOrg cerco la descrizione per il livello creato:
		- con CodStruOrg da 1 a 50 sono fissate da noi
		- con CodStruOrg > 50 possono essere create dal cliente		
    Selezionata dunque una riga aggiorno IdOrg con il valore definito in (1)
	
Il metodo per ottenere la lista delle mail:

Dim lista As New List(Of cProprieta) = MasterLiftDLL.cUtility.GetListaMailStruSoc(Connessione, CodStruOrg) 
restituisce una lista di cProprieta della forma
<COD_PERSONA>32</COD_PERSONA><EMAIL>paolo.agretti@leonardoinformatica.com</EMAIL>



-------------------------------- Esempio ------------------------------------------------------------------
con CodStruOrg=20 ho il Reparto Qualità (ed è immutabile) perciò nel codice delle NonConformità faccio 
	lista = MasterLiftDLL.cUtility.GetListaMailStruSoc(Connessione, 20)
ed estraggo la lista con me mail del reparto qualità.

Ciò che cambia è l'idstruorg che identifica, nella riga della kai_TabStruOrg, il gruppo di persone definito tramite organigramma
ITEM <label class="argomento"></label> Nei report i campi selezionati dalla query nell'rbowin sono richiamati nel report con fields.nomecampo o alias

mentre nel vb puro (non progettazione) si chiamano con section..nomecampo o alias

ITEM <label class="argomento"></label> service.leonardoinformatica.com
Leonardoftp
Leonzio!01
porta 21 (standard)
ITEM <label class="argomento SQL"></label> Query utili:

----- Cercare  NOME TABELLA con nome desiderato
SELECT TABLE_NAME  
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG='Demo_MasterLift'
AND TABLE_NAME like '%contr%'



----- Cercare in tutto il database una COLONNA (e relativa tabella di appartenenza) con nome di colonna desiderato

SELECT      c.name  AS 'Colonna'
            ,t.name AS 'TABELLA'
FROM        sys.columns c
JOIN        sys.tables  t   ON c.object_id = t.object_id
WHERE       c.name LIKE '%%'   ----qui va il pezzo di nome della colonna cercata
ORDER BY    Colonna,TABELLA;
ITEM <label class="argomento SQL"></label> RowNumber:
SELECT 
ROW_NUMBER() OVER(ORDER BY xxxxx ASC) AS RowNumber,
......
FROM
....
WHERE
...
ORDER BY xxxxx
__________________________________________________________________________________
è fondamentale la clausola OVER(ORDER BY xxxxx ASC)

ITEM <label class="argomento JS"></label> // uso il selettore Javascript anzichè quello Html poichè contempla la gestione del parametro di priorità !important
document.getElementsByClassName("LDV")[i].style.setProperty('background-color', '#e35f5d', 'important');
ITEM <label class="argomento JS"></label> Jquery focus:
// Get the focused element:
var $focused = $(':focus');

// No jQuery:
var focused = document.activeElement;

// Does the element have focus:
var hasFocus = $('foo').is(':focus');

// No jQuery:
elem === elem.ownerDocument.activeElement
ITEM <label class="argomento JS"></label>
Per customizzare la selezione del testo posso usare la PseudoClass select

::selection {
  background: #ffff00;   
  color:#345678;
  /*text-shadow: #ffff00 1px 1px 10px, #ffff00 -1px -1px 10px;*/
}
ITEM <label class="argomento JS"></label> CSS per la gestione della scrollbar orizzontale tramite PseudoClass:        
        
        /* width */
        /*gestita come attributo del div*/
        div::-webkit-scrollbar {
            width: 2px;
            /*scrollbar orizzonatle: va usata height,scrollbar verticale va usata width!*/
        }

        /* Track */
        div::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey; 
          border-radius: 10px;
        }
 
        /* Handle */
        div::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #5bc0de;
          outline: 1px solid #5bc0de;
        }      

        div::-webkit-scrollbar:vertical {
          display: none;
        } 
ITEM <label class="argomento JS"></label> Disabilitare componente tramite jquery
.attr('disabled', true).attr('onclick', 'return false;');		

Per invece riattivare il bottone
.attr('disabled', false).removeAttr('onclick');  
ITEM <label class="argomento VB"></label> Non riconosce un elemento: non è scritta correttemente la classe (manca il codice davanti al nome, ...)
ITEM <label class="argomento VB"></label> Nella gsetione tabelle, nell'iclassi_sSQL ci va una query del tipo 
SELECT * FROM TABELLA WHERE CHIAVE = $CHIAVE$,
se non metto il "select *" ma "select campo1, campo2, ..." con i nomi delle colonne da errore in fase di update!
ITEM <label class="argomento VB"></label>  Nella Gestione TAbelle, quando creo la MAsterPageTabelle fare attenziona alla riga 
lButton.Attributes("href") = "javascript:__doPostBack('ctl00$ctl00$ZZZZZZ$btnMenu_" & Mnu.NomeTabella & "','')" nella MasterPageTabelle.Master.vb

Fare attenzione a mettere in ZZZZZZ il valore presente nella MasterPage nell'ID alla riga
 <asp:ContentPlaceHolder ID="corpo" runat="server">
Di default c'è content, noi mettiamo corpo o body, tale valore va messo anche al posto di ZZZZZZ e va richiamatao correttamente nella MasterPage nidificata che ho creato
da comunque errore se presente il valore di default e io lo ho cambiato....)
ITEM <label class="argomento JS VB"></label> Per scaricare un file ho 2 modi:
lato html 
 - href = "nomefile"
lato vb
 - Dim sScript As String = "window.location.href = """ & sPathFile & ""
            'ScriptPagina += sScript
			   oppure
 - Response.Redirect(sPathFile)
ITEM <label class="argomento VB"></label> cwinDef nascondere colonna
		m_GrigliaWeb.Columns.FindByDataField("Numero").HeaderStyle.CssClass = "nascosto"
        m_GrigliaWeb.Columns.FindByDataField("Numero").ItemStyle.CssClass = "nascosto"
        m_GrigliaWeb.Columns.FindByDataField("Numero").Display = False
ITEM <label class="argomento JS"></label> Disabilitare scroll orizzontale della pagina
	html, body {
		max-width: 100%;
		overflow-x: hidden;
	}
	
ITEM <label class="argomento JS"></label> 
Se un acartella è nascosta facendoIncludi nel progetto non è più nascosta
ITEM <label class="argomento"></label> Se all'apertura di un Form Dialog da error javascript sul GetRadWindow, aggiornare il metodo della functions.js con  il seguente:

    var oWindow = null;
    if (window.radWindow) oWindow = window.radWindow;
        //else if (window.frameElement.radWindow) oWindow = window.frameElement.radWindow;
    else if (window.frameElement) { if (window.frameElement.radWindow) oWindow = window.frameElement.radWindow; }
    return oWindow;
ITEM <label class="argomento JS"></label> Se nel report compare il messaggio di errore CommandText è perchè non è passato ancora una datasource valida

ITEM <label class="argomento"></label> Query utili per ArdesProduzione:

SELECT * FROM ard_Produzioni_D WHERE NumeroLotto LIKE '%%'
------------sostituire i @ con l'id desiderato--------------------------
DELETE FROM ard_Produzioni_Tempi
WHERE (IdProduzione = @)

UPDATE  ard_Produzioni_D
SET codcausaleincorso = '',
DataIniProd = NULL, OraIniProd = NULL, 
DataFineProd = NULL, OrafineProd = NULL, 
Eseguito = 0
WHERE        (IdProduzione = @)

DELETE FROM ard_ProduzioneMacchine WHERE IdProduzione = @
ITEM <label class="argomento VB"></label> ERRORI comuni nella gestione tabelle:
metto campo chiave un campo NON chiave
NON metto alcun campo chiave
Nell'IClassi_sSql un campo stringa non è scritto con gli apici! o è scritto sbagliato!
ITEM <label class="argomento VB"></label> Nella BrowseToScreen non tira su una colonna ---> è case sensitive rispetto ai nomi delle colonen che passo: i nomi nel datatable devono coincidere con quelli che uso nel metodo Init della grigla
a capo da canca
alh
lcdhl
ITEM <label class="argomento VB"></label> Nella BrowseToScreen posso chiamare i valori delle righe nascoste con asterisco (*) tramite r("nome") anzichè r("*nome")
ITEM <label class="argomento JS"></label>  Per sfocare lo sfondo devo usare
backdrop-filter: blur(5px);
Fare attenzione al fatto che sfoca lo sfondo quindi impostare per l'oggetto 'sopra' z-index:99, altrimenti sarebbero sullo stesso livello e non si avrebbe il blurring
ITEM <label class="argomento JS"></label> Sostiyuire testo tramite Regex:
p.replace(regex, 'testo')
ITEM <label class="argomento telefono"></label> NUMERI DI TELEFONO RAPIDI:
Migliorini (Lercari):	0105446690 / 3385802066
De Caro (CF genova): 3427789387
Morlacchi (CF milano): 3357788179
Ferretti Luca (CBOX genova): 0104074238
INVAT : 010823358
ARDES : 0109643197

ANDREA SCALABRINI : 3297786400
ITEM <label class="argomento VB"></label> 
UpdatePanel:
Per scatenare i post back ad ogni click di un pulsante all'interno dell'UpdatePanel devo usare i Triggers e l'attributo UpdateMode="Conditional"

&lt;asp:UpdatePanel ID="pNOME" runat="server" UpdateMode="Conditional"&gt;
	&lt;ContentTemplate&gt;
		
	&lt;/ContentTemplate&gt;
	&lt;Triggers&gt;
		&lt;asp:PostBackTrigger ControlID="btnF2_txtCodana" /&gt;	
		&lt;!--QUI VANNO GLI ID CONTROL ( = quelli presenti in html) dei pulsanti che voglio scatenino il postback,
		per gli F2 i pulsanti btnF2_txt sono creati dalle CBO--&gt;
	&lt;/Triggers&gt;  
&lt;/asp:UpdatePanel&gt;  
ITEM <label class="argomento VB"></label> Non funziona l'AddFuturePageValue ---> il nome passato non contiene il .aspx
oppure
Nella browse è già scritta la screen di destinazione e le CBO sovrascrivono il pagevalue che passo
ITEM <label class="argomento VB"></label> 
Da errore il servizio dopo il caricamento di una applicazione in https:
nel web config per ogni pagina del progetto servizio va scritto nel tag services (li scrive di defualt per l'http in fase di scrittura codice, sono quelli commentati...)

&lt;services&gt;
      &lt;service name="CityLookWS.Autenticazione"&gt;
        &lt;!--&lt;endpoint address="" behaviorConfiguration="CityLookWS.AutenticazioneAspNetAjaxBehavior"
          binding="webHttpBinding" contract="CityLookWS.Autenticazione" /&gt;--&gt;
		          &lt;endpoint address=""
                  binding="webHttpBinding"
                  bindingConfiguration="secureHttpBinding"
                  contract="CityLookWS.Autenticazione"
				          behaviorConfiguration="CityLookWS.AutenticazioneAspNetAjaxBehavior"/&gt;

        &lt;endpoint address="mex"
                  binding="mexHttpsBinding"
                  contract="IMetadataExchange" /&gt;
      &lt;/service&gt;
ITEM <label class="argomento VB JS"></label> 
Gestione maiuscole/minuscole:
Lato CSS:
	text-transform: lowercase;	text-transform: uppercase;
Lato JS:
		.toUpperCase(); .toLowerCase();
Lato VB.NET
			ToLower, toUpper
Le Regex con flag i sono case insensitive

Un replace javascript insensitive è
	let auxRegex = new RegExp(TestoRicerca, "ig")
	let new_str = aux_str.replaceAll(auxRegex, newText);	
ITEM <label class="argomento JS"></label> Self-Invoking Functions
Function expressions can be made "self-invoking".
 - Function expressions will execute automatically if the expression is followed by ().
 - You have to add parentheses around the function to indicate that it is a function expression:	
 (function () {
 
})();
ITEM <label class="argomento VB"></label> Multiselezione
1) OSS (al 05/07/2021):
	IN PRESENZA DI BROWSE CON MULTISELEZIONE LE COLONNE CON ALIAS DEL TIPO [*...] DANNO ERRORE
	MESSO  A POSTO NELLA LIBRERIA POCHI GIORNI FA (6 luglio 21)
	
	SE USO COLONNE SENZA ASTERISCO FUNZIONA SICURAMENTE TUTTO, ALTRIMENTI DA QUALCHE PARTE DA ERRORE...
	
2) NELLA cWinDef, nel metodo    ..._grdGriglia__1(ByRef CboObject As Object)    INSERISCO 
	i) per abilitare la multiselezione
	
	Private Sub Strumentazioni_B__grdGriglia__1(ByRef CboObject As Object)
		'abilito multiselezione
		m_Parametri.Scrivi("MULTISELEZIONE", "1")
		m_Parametri.Scrivi("MULTISELEZIONE_COLONNE_CHIAVE", "QrCodeStrumentazione")	
		
		!POSSO SEPARARE PIù COLONNE CON LA VIRGOLA!
		m_Parametri.Scrivi("MULTISELEZIONE_COLONNE_CHIAVE", "Anno, Numero, Riga")
		
	ii) per nascondere eventuali colonne per cui avevo errore (punto (1))
		
		Private Sub Strumentazioni_B__grdGriglia__1__Righe(ByRef item As Telerik.Web.UI.GridDataItem, ByRef CboObject As Object)
			'nascondo "a mano" le colonne  [IdLinea] e [CodReparto]
			m_GrigliaWeb.Columns.FindByDataField("IdLinea").HeaderStyle.CssClass = "nascosto"
			m_GrigliaWeb.Columns.FindByDataField("IdLinea").ItemStyle.CssClass = "nascosto"
			
	iii) per gestire le righe selezionate DEVO ESSERE NELL'FCODE
		 QUI POSSO USARE IL CONTROLLO  m_oBrowse.GetRigheSelezionate
		 
		 ES: 
		 
		 If m_oBrowse.GetRigheSelezionate.Rows.Count = 0 Then
                    Dim oMsg As New cMsg(Me, "Selezionare almeno una sinistro per cui scaricare la reportistica")
                    oMsg.Show()
                    Exit Sub
                Else
				...
				End If
		 End If
	iv) PUNTO CRUCIALE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    i metodi cbo che gestiscono salvataggio delle righe spuntate sono generati a seguito dei un F10
		Quindi il mio metodo che richiama le colonne selezionate deve in qualche modo essere gestito nell'FCODE F10
		
Per ogni dubbio cfr ARDES Ubicazioni_B.aspx		
ITEM <label class="argomento VB"></label> F2
Negli F2 ho due eventi distinti:
- F2code generato dopo aver selezionato la riga (passando alla lente di ingrandiemento)
- XCP: nel caso fosse abilitata la possibilità di scrivere nell'F2 è generato all'invio
ITEM <label class="argomento VB"></label> L'evento F2 o F2CODE non viene scatenato poichè sono in una screen e c'è scritto Handles m_oBrowse.F2CODE
ITEM <label class="argomento VB"></label> F2 con MULTISELEZIONE:
1) nella cWinDef creo il solito metodo 
	Private Sub pagina__txtNome__1(ByRef CboObject As Object)
        'abilito multiselezione
        m_Parametri.Scrivi("MULTISELEZIONE", "1")
        m_Parametri.Scrivi("MULTISELEZIONE_COLONNE_CHIAVE", "Codice")
    End Sub 
ed in cima al codice, sotto lo strWinKey va messo 
	'pulisco il campo multiselezione
	m_Parametri.Scrivi("MULTISELEZIONE", "0")
in modo che se avessi l'F2 nella stessa pagina di una griglia non forzi il codice per la multiselezione anche sulla griglia (e dia errore se non esiste la colonna!)
ITEM <label class="argomento VB"></label> Esportare su Excel da datatable:

Dim oDbWin As CInfoDBWin = CInfoDBWin.GetInfoDBWin(enuAppPlatform.Web, Connessione, "cer", CInfoDBWin.enuModalitaDBWin.F2, "~/cerAmministratoreStampeContabili_S.aspx", "Esporta", 1)

        sSQL = ""
        sSQL = oDbWin.SQLString
        sSQL = sSQL.Replace("$FiltroAmm$", sCodiciAmm)
        sSQL = sSQL.Replace("$DbMaster$", DbMaster)
        sSQL = sSQL.Replace("$DataRiferimento$", cDBUtility.GetDate(Connessione, cDBUtility.FormatoData.SoloData))

        dt.Clear()
        dt = cDBUtility.GetDataTable(sSQL, Connessione)

        If Not dt Is Nothing AndAlso dt.Rows.Count > 0 Then
            Dim sPathFile As String = Request.PhysicalApplicationPath & "Tmp\" & Utente.UserID & "\"
            If Not System.IO.Directory.Exists(sPathFile) Then System.IO.Directory.CreateDirectory(sPathFile)
            sPathFile += "EstrattoConto.xlsx"

            If cStampe.EsportaSuExcel(sPathFile, dt) Then
                Response.Redirect("Tmp/" & Utente.UserID & "/EstrattoConto.xlsx")
            Else
                Dim oMsg As New cMsg(Me, "Impossibile esportare i dati su Excel")
                MasterCertDLL.cEventi.Registra(Connessione, MasterCert.Web.UI.Page.Utente.UserID, Me.Path, "Anomalia: impossibile esportare i dati su Excel")
                oMsg.Show()
            End If
        End If
ITEM <label class="argomento VB"></label>	
Creare da path	
If Not System.IO.Directory.Exists(sPath) Then System.IO.Directory.CreateDirectory(sPath)

se esiste eliminare da path
If System.IO.File.Exists(sPath) Then
	System.IO.File.Delete(sPath)
End IF
ITEM <label class="argomento VB"></label> 	Viewstate
A seguito di un postback il combobox ha perso il valore selezionato
=>
View state maintains the state of all asp controls property on the page whenever the page post backs to the web server.
By default, view sate is enabled for every asp control. You can see View state in source view of a page and it is saved in hidden form field on the page. View state is good to maintain but it has also disadvantage that it stuffing too much data into view state and it slow down the process of rendering page.

You can maintain or disable individual control, page or an application.By default EnableViewState="True" for control, page or application.

Disable individual control using Control.EnableViewState property with false.

Use page directive to disable view state on page.
<%@ Page Language="VB" EnableViewState="false" %>
If you set EnableViewState property value false in page directive, then you cannot enable view state property in control level 
ITEM <label class="argomento VB"></label> 
CDate(cDBUtility.GetDate(Connessione, cDBUtility.FormatoData.SoloData)).AddDays()
ITEM <label class="argomento VB"></label> 
Il pagevalue non viene tirato su: è case sensitive!
ITEM <label class="argomento VB"></label> 
Creare al volo nuovo impianto ed evadere chiamata su di esso:
(Nel parametro $NC è riportato il numero di default dell'impianto Nuovo )
1) Menu tecnico
2) ricerca impianto
3) nuovo impianto (qui è tirato su il dettaglio dell'impianto con codice fisso 9999)
4) nuova chiamata
5) conferma --> errore: va avviata
6) menu tecnico --> evasione rapida
ITEM <label class="argomento VB"></label> 
Nel parametro $NC è riportato il numero di default dell'impianto Nuovo 
Nel caso stessi per compilare un rappotino di un intervento associato ad un impianto sconosciuto devo usare il blocco segente per gestire eventuali informazioni  base dell'impianto:

	If MasterLiftDLL.cParametri.rilparN("$NC", CBO.Web.UI.Page.Connessione) <> section.DataObject("Impianto") Then
		'caso impianto codificato a database
		Dim sSQL As String = "  SELECT ISNULL(Quartiere,'') AS [Quartiere], ISNULL(Indirizzo,'') + ' ' + ISNULL(Localita,'') + ' (' + ISNULL(Provincia,'') + ') ' + ISNULL(Cap,'') AS [Indirizzo] FROM AI_Impianti WHERE Codice = " & section.DataObject("Impianto")
		Dim op As cProprieta = cDBUtility.LeggiRecord(CBO.Web.UI.Page.Connessione, sSQL)
		txt = DirectCast(Telerik.Reporting.Processing.ElementTreeHelper.GetChildByName(pCliente, "txtIndirizzo"), Telerik.Reporting.Processing.TextBox)
		txt.Value = op.Leggi("Indirizzo")
		txt = DirectCast(Telerik.Reporting.Processing.ElementTreeHelper.GetChildByName(pCliente, "txtUbicazione"), Telerik.Reporting.Processing.TextBox)
		txt.Value = op.Leggi("Quartiere")
	Else
		'caso impianto nuovo
		Dim Cliente As String
		Cliente = section.DataObject("Cli_RagSoc") & "   -   "
		Cliente += section.DataObject("Cli_Indirizzo") & " - "
		Cliente += section.DataObject("Cli_Cap") & " "
		Cliente += section.DataObject("Cli_Localita") & " "
		If section.DataObject("Cli_Provincia") <> "" Then
			Cliente += "(" & section.DataObject("Cli_Provincia") & ")"
		End If

		txt = DirectCast(Telerik.Reporting.Processing.ElementTreeHelper.GetChildByName(pCliente, "txtIndirizzo"), Telerik.Reporting.Processing.TextBox)
		txt.Value = Cliente
	End If
ITEM <label class="argomento"></label> 
TODO da correggere!
1) gestione degli ime_i nella load

crea giusto solo 
btn = ControlFinder.PageFindControl(Me, "btnEsci")
        If Not btn Is Nothing Then btn.Attributes.Add("style", "display: none")
2) la classe contiene un _S che non ci va 

ec/bes
1) usare font-family: monospace;
ec
2) ricerca testuale case insensitive! ora "A" <> "a" FATTO!

bes
3) gestione dei $ime_i$ nella load

crea giusto solo 
btn = ControlFinder.PageFindControl(Me, "btnEsci")
        If Not btn Is Nothing Then btn.Attributes.Add("style", "display: none")
4) la classe contiene un _S che non ci va 
ITEM <label class="argomento JS"></label> 
function Copia(id){
	var copyText = document.getElementById(id);

	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */

	navigator.clipboard.writeText(copyText.value);
}

ondblclick="Copia()"
ITEM <label class="argomento VB"></label> Se in un oggetto cMsg scrivo nello show il path di un form, 
viene mostrato l'alert e viene eseguito un redirect alla pagina indicata!
ITEM <label class="argomento JS"></label> Property di tipo cProprieta:

Private Property m_sqlGraficiCorrenti As cProprieta
        Get
            Return CType(PageValue("m_sqlGraficiCorrenti"), cProprieta)
        End Get
        Set(value As cProprieta)
            PageValue("m_sqlGraficiCorrenti") = value
        End Set
    End Property

e la popola:
	
	 If m_sqlGraficiCorrenti Is Nothing Then
		m_sqlGraficiCorrenti = New cProprieta
	End If
	m_sqlGraficiCorrenti.Scrivi(sIdGrafico, strSql)
ITEM <label class="argomento VB"></label> Errore nel catch dell'IClassi_Update "Connessione chiusa": aprire il MyProject e verificare che sia presente in tutte le connection string la spunta "Salva Password"!
ITEM <label class="argomento VB"></label> Come popolare le tabelle cha per aggiungere nuovo grafico:
1)	Agg riga nella cha_TabGraficiSezioni
2)	Agg. Righe del dettaglio nella cha_TabGraficiElencoTest (sta per Testata!)
3)	Nella TabGraficiElencoDett vanno le query + un codice identificativo del grafico (verificare che non sia già presente né qui né in altre tabelle cha_)
OSS: usare nella query (se ho date)
Declare @DaData datetime
Declare @AData datetime

Set @DaData='$DaData$'
Set @AData='$AData$'

IF @DaData=''
   SET @DaData=(SELECT Convert(datetime, Str(Year(Getdate()),4)+'-01-01'))
IF @AData=''
   SET @AData=(SELECT Convert(datetime, Str(Year(Getdate()),4)+'-12-31'))
E sotto
WHERE NC.DataApertura BETWEEN @DaData And @AData

OSS: i datatable devono essere del tipo prima colonna: testo, seconda:numeri!
OSS: le query sono eseguite sul db Master, se uso oggetti MLift usare $DbMasterLift$!

4)	Nella SELECT * FROM cha_TabGraficiFiltri vanno scritti i filtri che userò
5)	Nella cha_ValoriFiltri saranno salvati i valori dei filtri
6)	Tip: nella DisegnaGrafico non posso richiamare per serieGrafico le proprietà dell’oggetto (se ColumnSeries, se LineSeries, ..) poiché è stato definito originariamente senza tipo e a runtime glielo assegno, quindi l’intellisense non mi aiuta: posso però metteremi temporanemanete nel Select Case m_ChartType e qui facendo dopo l’inizializzazione dell’oggetto .NomeAttributo vedo le proprietà esposte! 
ITEM <label class="argomento SQL"></label>
Abilitare statistiche tempo esecuzione query su SQL Server:
SET STATISTICS TIME ON; 
Nella tasca Messaggi vedo il tempo effettivo
ITEM <label class="argomento"></label>
Per la creazione delle icone per le App Android/IOS e per la creazione del banner da usare sul PlayStore:
https://icon.kitchen/
ITEM <label class="argomento VB"></label>
Chiudere un form dialog
1) btnAnnulla.OnClientClick = "var wnd = GetRadWindow(); wnd.close();return false;"
2)  Private Sub m_oScreen_AfterUPDATE(ByRef p_Dati As cProprieta) Handles m_oScreen.AfterUPDATE
        ClientScript.RegisterStartupScript(Me.GetType, "close", "var wnd = GetRadWindow(); wnd.close();", True)
    End Sub
ITEM <label class="argomento VB"></label>
In un Form Dialog importanti i tag
	 &lt;cbo:ScriptManager ID="scriptManager" runat="server"&gt;&lt;/cbo:ScriptManager&gt;

            &lt;telerik:RadAjaxLoadingPanel runat="server" ID="raLoadingPanel"&gt;
            &lt;/telerik:RadAjaxLoadingPanel&gt;

ITEM <label class="argomento VB XAM"></label> Su Xamarin non va il debug ---> sono in modalità Release anzichè Debug!
ITEM <label class="argomento VB XAM"></label> Visual studio non vede il dispositivo collegato: eseguire Visual Studio come amministratore!
ITEM <label class="argomento VB XAM"></label> C# - dichiarazione variabili:
var name = "C# Corner"; // Implicitly typed.  
string name = "C# Corner"; // Explicitly typed. => type variableName = value;
ITEM <label class="argomento VB XAM"></label> C# - Property
	string sPathDownload = "";
	public string mPathDownload { get =&gt; sPathDownload; set =&gt; sPathDownload = value; }

Nell'interfaccia scrivo invece
	string mPathDownload { get; set; }
ITEM <label class="argomento VB XAM"></label> Per le icone da usare su Xamarin per le app Android e IOS USARE IL SITO IconKitchen
ITEM <label class="argomento VB"></label> 	
Se il codice della browse o screen non passa nell'FCODE potrei:
	-aver istanziato la screen/browse nell'if not isPostback anzichè fuori
	-aver scritto uno ShowLoading al click el pulsante e generar errore js perchè non è definito (e.g. sono in un FormDialog)
ITEM <label class="argomento VB"></label> 	
Nei report NON va passato il tag Filtro sennò si genera un errore "#text"
ITEM <label class="argomento VB"></label> 
Per forzare manualmente il sorting di un report devo mettere, nell'ITEM DATABINDING

Dim sorting1 As New Telerik.Reporting.Sorting()
sorting1.Expression = "=Fields.ProductID"
sorting1.Direction = Telerik.Reporting.SortDirection.Asc

report1.Sortings.Add(sorting1)

Altresì facendo tasto destro 'sul nulla' e scegliendo sorting
ITEM <label class="argomento JS"></label> 
Se un bottone che ho nascosto e poi visualizzato è troppo grande/piccolo potrebbe essere colpa dell'attributo 'display'
se uso block puo essere più grande, meglio forse 'inline-block'...
ITEM <label class="argomento VB JS"></label> 	
Impostare le cifre decimali:
Lato aspx
	TypeData="numeric" Decimali="2"
Lato html/js	
	type="numeric" step="0.01"
ITEM <label class="argomento VB"></label> 	
<b style="font-size:16px;">Gestione Tabelle</b>

0) nella Page del progetto aggiungere la properyty
	Public Shared Property GestioneTabelle() As cGestioneTabelle
	....

1) Nel progetto aggiungere la classe MasterPageTabelle (MasterPage nidificata che ha come MasterPage quella classica)

2) Aggiungere le tabelle con il codice corretto (cfr. Query Insert già pronta)
	xxx_ElencoTabelle
	xxx_ElencoTabelle_C
	xxx_ElencoTabelle_D
	xxx_ElencoTabelle_F
	
3) Creare i form:
	frmGestioneTabelle_B.aspx (ha come masterPage quella nuova)
	frmGestioneTabelle_S.aspx (ha come masterPage quella classica)


4) Attenziona alla riga 
lButton.Attributes("href") = "javascript:__doPostBack('ctl00$ctl00$ZZZZZZ$btnMenu_" & Mnu.NomeTabella & "','')" nella MasterPageTabelle.Master.vb

Fare attenzione a mettere in ZZZZZZ il valore presente nella MasterPage nell'ID alla riga
 <asp:ContentPlaceHolder ID="corpo" runat="server">
Di default c'è content, noi mettiamo corpo o body, tale valore va messo anche al posto di ZZZZZZ e va richiamatao correttamente nella MasterPage nidificata che ho creato
da comunque errore se presente il valore di default e io lo ho cambiato....)


5) Tramite la CboUtility --> Gestione tabelle inserisco i dati
IMPORTANTE: nell'iclassi_sSQL ci va una query del tipo SELECT * FROM TABELLA WHERE CHIAVE = $CHIAVE$,
se non metto il select * ma select con i nomi delle colonne da errore in fase di update!
ITEM <label class="argomento"></label> 
Non riesco ad aprire un txt da qualche parte sul server, file does not exist
---> ho notepad aperto in modalità amministratore! Aprire col blocco note
ITEM <label class="argomento VB"></label> 	
Se desse errori il salvataggio a database di alcuni campi numerici il problema potrebbe essere dovuto al fatto che i textbox abbiano TypeData="Text" ----> ci va TypeData="Numeric"
ITEM <label class="argomento JS"></label> 
Dopo che la pagina è stata caricata
document.addEventListener("DOMContentLoaded", function () {
    //dopo che la pagina è stata caricata eseguo un gestiscicampi per visualizzare i bottoni correttamente
    GestisciCampi();
});
ITEM <label class="argomento SQL"></label>Per verificare se ci sono delle transazioni aperte:
SELECT * FROM sys.sysprocesses WHERE open_tran = 1
ITEM <label class="argomento VB"></label> Duplicare un report:
1) Creo il report vuoto
2) Apro nella cartella del progetto la sottocartella Rpt: qui uno per volta apro nell'editpr di testo i file (report originale e report nuovo vuoto) con estensione
	.resx
	.Designer.vb
	.vb
Faccio un copia ed incolla dal report originale al mio con l'accortezza di cambiare eventuali Namespace e nomi delle classi	
`










