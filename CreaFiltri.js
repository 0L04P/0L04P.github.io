 function creaFiltri(num){
	let sHTML = '';
	debugger;
	for (let i = 1; i<=num; ++i){
	
		sHTML += `
		<div class='col-xs-12'>		
			<div class='col-xs-3'>
				<b>ID</b><br>
				<input type='text' id='txtId_${i}' onchange='formatta("txtId_${i}")'></input>
			</div>
			<div class='col-xs-3'>
				<b>DATAFIELD</b><br>
				<input type='text' id='txtDataField_${i}' onchange='formatta("txtDataField_${i}")'></input>
			</div>
			<div class='col-xs-3'>
				<b>TIPO</b><br>		
				<select id="cmbTipo_${i}" class="form-control" onchange="nascondi(${i})">
				  <option value="0">DropDownList</option>
				  <option value="1">RadComboBox</option>
				  <option value="2">TextBox</option>
				  <option value="3">TextBox Data</option>
				  <option value="4">TextBox con F2</option>
				  <option value="5">CheckBox</option>
				</select>				
			</div>
			<div class='col-xs-3 divCmb_${i}'>
				<b>DATAVALUEFIELD</b><br>
				<input type='text' id='txtDataValueField_${i}'  onchange='formatta("txtDataValueField_${i}")'></input>
			</div>
			<div class='col-xs-3 divCmb_${i}'>
				<b>DATATEXTFIELD</b><br>
				<input type='text' id='txtDataTextField_${i}'  onchange='formatta("txtDataTextField_${i}")'></input>
			</div>
			<div class='col-xs-3 hidden'>
				<br>				
				<div class="form-check">
				  <input class="form-check-input" type="checkbox" value="" id="chkCreaFiltro_${i}" checked>
				  <label class="form-check-label" for="chkCreaFiltro_${i}">
					Crea filtro
				  </label>
				</div>
			</div>
			
			<div class='col-xs-12' style='height:10px ;border-top:solid 1px #ccc'></div>
		</div>
	`
		
	}
	
	$('#divFiltri').append(sHTML)	
 

 }
 
 function nascondi(i){
	 debugger;
	 if($('#cmbTipo_' + i).val() != 0 && $('#cmbTipo_' + i).val() != 1){
			$('.divCmb_' + i).css('display', 'none');
			$('.divCmb_' + i + ' > input').val('');
	 }
	 else{
		 $('.divCmb_' + i).css('display', 'block')
	 }	 	 
 }
 
 function generaHTMLfiltri(){
	 
	 let filtri = `
	 <div class="row well">
		<div class="row">`
	let Property = '';
	let InizializzaFiltri = '';
	let SalvaFiltri = '';
	let CreaFiltro = '';
	 for(i=1; i<=$('#txtNumeroFiltri').val(); ++i){
		 let id= $('#txtId_'+i).val();
		 let datafield= $('#txtDataField_'+i).val();
		 let datatextfield= $('#txtDataTextField_'+i).val();
		 let datavaluefield= $('#txtDataValueField_'+i).val();
		 		 
		 switch($('#cmbTipo_' + i).val()){			
			 case "0":
				filtri += generaDropDownList(id, datafield, datatextfield, datavaluefield);
				InizializzaFiltri += 'cmb' + id + '.SelectedValue = m_Filtro' + id +'\n';
				SalvaFiltri += 'm_Filtro' + id + ' = cmb' + id + '.SelectedValue \n';
				CreaFiltro += `
				If cmb{id}.SelectedValue <> "" Then
					sReturn += ""
				End If`	
				break;
			case "1":
				filtri += generaRadcombobox(id, datafield, datatextfield, datavaluefield);
				InizializzaFiltri += 'cmb' + id + '.SelectedValue = m_Filtro'  + id +'\n';
				SalvaFiltri += 'm_Filtro' + id + ' = cmb' + id + '.SelectedValue \n';
				CreaFiltro += `
				If cmb{id}.SelectedValue <> "" Then
					sReturn += ""
				End If`	
				break;
			case "2":
				filtri += generaTXT(id, datafield, datatextfield, datavaluefield,'','');
				InizializzaFiltri += 'txt' + id + '.Text = m_Filtro' + id +'\n';
				SalvaFiltri += 'm_Filtro' + id + ' = txt' + id + '.Text \n';				
				CreaFiltro += `
				If txt{id}.Text <> "" Then
					sReturn += ""
				End If`					
				break;
			case "3":
				filtri += generaTXT(id, datafield, datatextfield, datavaluefield, 'true', 'false');
				InizializzaFiltri += 'txt' + id + '.Text = m_Filtro'  + id +'\n';
				SalvaFiltri += 'm_Filtro' + id + ' = txt' + id + '.Text \n';				
				CreaFiltro += `
				If txt{id}.Text <> "" Then
					sReturn += ""
				End If`						
				break;
			case "4":
				filtri += generaTXT(id, datafield, datatextfield, datavaluefield, 'false', 'true');
				InizializzaFiltri += 'txt' + id + '.Text = m_Filtro'  + id +'\n';
				SalvaFiltri += 'm_Filtro' + id + ' = txt' + id + '.Text \n';				
				CreaFiltro += `
				If txt{id}.Text <> "" Then
					sReturn += ""
				End If`					
				break;
			case "5":
				filtri += generaCHK(id, datafield, datatextfield, datavaluefield);
				InizializzaFiltri += 'chk' + id + '.Checked = m_Filtro'  + id +'\n';
				SalvaFiltri += 'm_Filtro' + id + ' = chk' + id + '.Checked \n';				
				CreaFiltro += `
				If chk{id}.Text <> "" Then
					sReturn += ""
				End If`					
				break;			 			 			 
		 }	
			//creo la property
			if ($('#cmbTipo_' + i).val() != '5'){
				Property += filtrobase.replaceAll('$Nome$', id) + '\n';
			}else{
				Property += filtrobase.replaceAll('$Nome$', id).replaceAll('String', 'Boolean') + '\n';
			}
			
	 }
	 filtri += `
		</div>
	 </div>`
	 debugger;
	 $('#txtHTMLFiltri').val(filtri);
	 $('#txtPropertyFiltri').val(Property);
	 $('#txtCreaFiltro').val(CreaFiltro);
	 $('#txtInizializzaFiltri').val(InizializzaFiltri);
	 $('#txtSalvaFiltri').val(SalvaFiltri);
	 var copyText = document.getElementById("txtHTMLFiltri");

	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */

	navigator.clipboard.writeText(copyText.value);
	 }
 
 function generaDropDownList(id, datafield, datatextfield, datavaluefield){
	
	 let DropDownList = `
			<div class="col-xs-12 col-sm-6 col-md-3">
				<small>${id}</small><br />
				<cbo:DropDownList ID="cmb${id}" runat="server" IsKey="false" Width="100%" TypeControl="ComboBox" TypeData="Text" CssClass="form-control" DataTextField="${datatextfield}" DataValueField="${datavaluefield}" DataField="${datafield}"></cbo:DropDownList>  
			</div>`
return DropDownList;
 }
 
 function generaRadcombobox(id, datafield, datatextfield, datavaluefield){
	 let radcombobox = `
			<div class="col-xs-12 col-sm-6 col-md-3">
				<small>${id}</small><br />
				<cbo:RadComboBox ID="cmb${id}" runat="server" Width="100%" LarghezzaColonne="0;500"   IsKey="false" TypeControl="ComboBox" TypeData="Text" DataTextField="${datatextfield}" DataValueField="${datavaluefield}" DataField="${datafield}"></cbo:RadComboBox>
			</div>
	 `
	 return radcombobox;
 }
 
 function generaTXT(id, datafield, datatextfield, datavaluefield, isData, isF2){debugger;
	 let txt = '';
	 if (isData == 'true'){		 
		  txt = `
			<div class="col-xs-12 col-sm-6 col-md-3">
				<small>${id}</small><br />   
				<div class="input-group add-on" style="width: 196px">
					<cbo:TextBox ID="txt${id}" runat="server" TypeControl="TextBox" TypeData="Data" DataField="${datafield}" IsKey="false" CssClass="form-control" width="100%"></cbo:TextBox>  
					<div class="input-group-btn">                            
						<asp:LinkButton ID="btn${id}" runat="server" CssClass="btn btn-default" OnClientClick="$('#ctl00_body_txt${id}').datepicker('show');return false;">
							<span class="glyphicon glyphicon-calendar"></span></asp:LinkButton>
					</div>
				</div>
			</div>`
		 
	 }
	 else if(isF2 == 'true'){
		  txt = `
			<div class="col col-xs-12 col-md-6 col-lg-4">
				<asp:UpdatePanel ID="p${id}" runat="server">
					<ContentTemplate>
						<small>${id}</small><br />                              
						<asp:Panel ID="pF2${id}" runat="server" CssClass="input-group add-on">
							<cbo:TextBox ID="txt${id}" runat="server" TypeControl="TextBox" TypeData="Text" DataField="${datafield}" IsKey="false" CssClass="form-control" XCPconPost="true" ></cbo:TextBox>             
							<div class="input-group-btn" style="width: 41px">                            
								<asp:LinkButton ID="btn${id}" runat="server" CssClass="btn btn-default" OnClientClick="$('#btnF2_txt${id}').click();return false;">
								<span class="glyphicon glyphicon-search"></span></asp:LinkButton>
							</div>   
						</asp:Panel> 
							<asp:Label ID="lbl${id}" runat="server"></asp:Label>   
						<br /><br />  
					</ContentTemplate>
				</asp:UpdatePanel>                             
			</div>`		 
	 }else{		 
		 txt = `
			<div class="col-xs-12 col-sm-6 col-md-3">
				<small>${id}</small><br />
				<cbo:TextBox ID="txt${id}" runat="server" TypeControl="TextBox" TypeData="Text" DataField="${datafield}" IsKey="false" CssClass="form-control" width="100%"></cbo:TextBox>  
			</div>`		 		 
	 }
	 return txt;
 }
 
 function generaCHK(id, datafield, datatextfield, datavaluefield){	 
 
	 let chk = `	 	
			<div class="col-xs-12 col-sm-6 col-md-3">		
				<cbo:CheckBox ID="chk${id}" runat="server" TypeControl="CheckBox" TypeData="Numeric" DataField="${datafield}" Text="${id}" CssClass="checkbox"/>
			</div>`	 
	return chk;	 
 }
 
 function formatta(id){
	 
	 $('#' + id).val($('#'+ id).val().substring(0,1).toUpperCase() + $('#' + id).val().substring(1))
	 
 }

function copiaproperty(){
	var copyText = document.getElementById("txtPropertyFiltri");

	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */

	navigator.clipboard.writeText(copyText.value);	
}
 
 var filtrobase = `
    Private Property m_Filtro$Nome$ As String
        Get
            Return CType(PageValue("m_Filtro$Nome$"), String)
        End Get
        Set(value As String)
            PageValue("m_Filtro$Nome$") = value
        End Set
    End Property
`	 