var esatte, sbagliate;
var modalita;
var array_n_parole;
var index_n_parole;
const NUM_10 = 10;

$(document).ready(function(){
	initVariabiliRis();			
	modalita = -1; //default infinito
	pModalita(modalita);
	pPopolaCarte();
	/*randomFlag();*/
	
	/*Handle dei click*/	
	$('#btnModalitaInf').on('click',function(){		 	
		pModalita(-1);
		 	
	});
	$('#btnModalita10').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
		 
	});	
	$('#btnCateg_1').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
		 
	});	
	$('#btnCateg_2').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
	 
	});	
	$('#btnCateg_3').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);
		 
	});	
	$('#btnCateg_4').on('click',function(){		 	
		pModalita(NUM_10);
		index_n_parole = 1; 
		pPopolaCarte_n(NUM_10);		
	});		
	 
	 $('#btnModalitaFlag').on('click',function(){		 	
		giocaBandiere();
		index_n_parole = 0; 
		//pPopolaCarte_n(NUM_10);	
		$('#btnSoluzione').css('display', '');	
		$('.lblParola').css('display', 'none')		
	});		
	 
});	

function pModalita(n){
	initVariabiliRis();
	array_n_parole = [];
	index_n_parole = 0;
	modalita = n;
	switch(modalita){
		case -1:
			$('#btnModalitaInf').addClass('ModalitaSelezionata')	
			$('#btnModalita10').removeClass('ModalitaSelezionata')	
			$('.lblParola').css('display', '')		
			$('.bandiera').css('display', 'none')			
			break;
		default:
			$('#btnModalitaInf').removeClass('ModalitaSelezionata')	
			$('#btnModalita10').addClass('ModalitaSelezionata')	
			$('.lblParola').css('display', '')
			$('.bandiera').css('display', 'none')
			break;
	}
	pPopolaCarte();
	pSetRis();
	$('#btnSoluzione').css('display', '');
}

function initVariabiliRis(){
	esatte = 0;
	sbagliate = 0;
}

function GetSoluzione(){
	/*
	sbagliate += 1;
	pSetRis();
	*/
	$('.card').css('transform','rotateY(180deg)') 
}

function NextCard(i){
	if($('.bandieraBack').is(':visible')){
		modalita = 1994;
	}
	
	if(modalita == -1){
		//non faccio nulla
	}else{
		//incremento il cursore sull'array finito di parole
		index_n_parole += 1;
	}
	
	if(i==0){
		//HO INDOVINATO
		esatte += 1;
		pSetRis();
		//pPopolaCarte()	
		pCambiacarta()		
	}else{
		//HO SBAGLIATO
		sbagliate += 1;
		pSetRis();		
		pCambiacarta()			
	}
	
}

function pCambiacarta(){	
	setTimeout(function(){
			pPopolaCarte()				
		}, 500) 
		$('.card').css('transform','') 
}

function pPopolaCarte(){
	if($('.bandieraBack').is(':visible')){
		
		giocaBandiere();
		
		
	}else{
		if(localStorage["olo_Traduzioni"] != undefined){
			if(modalita == -1){
				pPopolaCarte_inf()
			}else{
				pPopolaCarte_n()
			}			
		}
	}			
}

function pPopolaCarte_inf(){
	let a = [...JSON.parse(localStorage["olo_Traduzioni"])]
	let i = Math.floor(Math.random() * a.length);	 		
	$('#lblParola').text(a[i].parola)
	$('#lblParolaCopia').text(a[i].parola)
	$('#lblSoluzione').text(a[i].traduzioni);
	setSizeTraduzione();
}
function pPopolaCarte_n(){
	if(index_n_parole == 0){
		//devo creare tutto
		array_n_parole = pCreaSubarrayDiNParole(modalita);
		index_n_parole = 0;
		console.log('array_n_parole');
		console.log(array_n_parole);
		
	}else{
		if(index_n_parole <= array_n_parole.length ){
			let indice = index_n_parole%array_n_parole.length;
			console.log('indice:' + indice);
			$('#lblParola').text(array_n_parole[indice].parola)
			$('#lblParolaCopia').text(array_n_parole[indice].parola)
			$('#lblSoluzione').text(array_n_parole[indice].traduzioni);
			setSizeTraduzione();
		}else{
			//gioco finito
			//alert('FINITO!!')
			let indovinate, sbagliate, tot
			indovinate= parseInt($('#lblIndovinate').text());
			sbagliate= parseInt($('#lblSbagliate').text());
			tot= indovinate + sbagliate;
			$('#lblParola').text('FINITO\n\nIndovinate\n' + indovinate + '/' + tot);
			$('#btnSoluzione').css('display', 'none');
		}
	}	
}

function pSetRis(){
	let sHtmlEsito
	let t;
	let testo;	
	sHtmlEsito = `
		<span class='glyphicon glyphicon-ok fontEsito' style='color:#00ee00'></span>
		<span id='lblIndovinate' class='fontEsito' style='color:#00ee00'>${esatte}</span>&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<span class='glyphicon glyphicon-remove fontEsito' style='color:#e32c2c'></span>
		<span id='lblSbagliate' class='fontEsito' style='color:#e32c2c'>${sbagliate}</span>&nbsp;
	`;
	$('#divEsito').html(sHtmlEsito);	 
}

function pCreaSubarrayDiNParole(n){
	let arrCompleto = JSON.parse(localStorage["olo_Traduzioni"])
	if(arrCompleto == undefined){
		return []
	}
	
	//***********
	let CategSel = GetCategSelezionata();
	if(CategSel != '-1'){
		//let arrCompletoFiltratoPerCateg = arrCompleto.filter(o => o.categoria == CategSel)
		let arrCompletoFiltratoPerCateg = arrCompleto.filter(o => check_binary(o.categoria, CategSel))
		if(arrCompletoFiltratoPerCateg.length >= n){
			arrCompleto = arrCompletoFiltratoPerCateg;
			
		}else{
			alert('Non ci sono 10 traduzioni per la categoria selezionata!');
		}
		
	}else{
		//NON FILTRO PER CATEGORIA, USO TUTTE LE PAROLE!
	}
	//***********
	
	
	//15/12/2024 - escludo le parole già usate
	let arrEscludiGiaUsate = [];
	let arrEscludiGiaUsateNEW = [];	
	if(sessionStorage["arrEscludiGiaUsate"] == undefined){
		sessionStorage["arrEscludiGiaUsate"] = '[]';
	}
	let objEscudi = JSON.parse(sessionStorage["arrEscludiGiaUsate"])
	/*if( objEscudi != undefined && objEscudi.length > 0 && objEscudi.length <= 3*NUM_10){				
		arrEscludiGiaUsate = [1,2,3];
	}else{
		
	}*/
		
	let lungh = arrCompleto.length
	let arr = [];
	let i;
	if(n >= lungh){
		return arrCompleto
	}
	let MAXIMUM = 3*NUM_10;
	let iter = 0;
	for(let j = 0; j<n; ++j){
		
		i = Math.floor(Math.random() * lungh);	
		if(false && arrEscludiGiaUsate.length > 0){ 
			//----------------------------------------per ora NO nuovo siluppo da finire e testare!-----------------------------------------
			//   ESCLUSIONI
			/*
			if(arrEscludiGiaUsate.includes(arrCompleto[i]["counter"].toString())){
				console.log("VADO OLTRE " + arrCompleto[i]["counter"])
			}else{
				//Aggiungo
				if(arr.indexOf(arrCompleto[i]) == -1){			
					arr[j] = arrCompleto[i];				
				}else{
					j = j - 1;			
				}
			}
			*/
			
		}else{
			//NO ESCLUSIONI: per ora funziona solo questo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//Aggiungo
			if(arr.indexOf(arrCompleto[i]) == -1){			
				arr[j] = arrCompleto[i];				
			}else{
				j = j - 1;			
			}
			arrEscludiGiaUsateNEW.push(arrCompleto[i]["counter"])
		}			
		
		iter +=1;
		if(iter == MAXIMUM){j = n+1; console.log('*************')	}		
	}
	sessionStorage["arrEscludiGiaUsate"] = JSON.stringify(arrEscludiGiaUsate);
	return arr;
	
}

function setSizeTraduzione(){	
	if($('#lblSoluzione').html().length >=15){
		$('#lblSoluzione').addClass('fontsize34px');
	}else{
		$('#lblSoluzione').removeClass('fontsize34px');
	}
}

function GiocaCateg(q){
	let id = q.id;
	let b = $('#' + id).attr('class').includes('CategSelezionata');
	
	$('.btnGiocaCateg').removeClass('CategSelezionata');
	if(b == false){
		$('#' + id).addClass('CategSelezionata');
	}	
}


function GetCategSelezionata(){	
	if($('.CategSelezionata').length  == 0){
			return '-1';
	}
	let id = $('.CategSelezionata').attr('id');
	/*let Categ = id.replace('btnCateg_','');
	return Categ;*/
	switch(id){
		case "btnCateg_1": return "1";
		case "btnCateg_2": return "10";
		case "btnCateg_3": return "100";
		case "btnCateg_4": return "1000";
	}
	return '-1';
}
function check_binary(i, j){
	i = parseInt(i);
	j = parseInt(j);
	//"cast a byte"
	i = '0B' + i;
	j = '0B' + j;
	
	return i & j
}


////////////////
///////////////////////
/////////////////////////////////
////////////////////////////////////////////
let BASE_URL = 'https://flagcdn.com/h240/SIGLA_DA_SOST.png';
//let BASE_URL = 'https://flagcdn.com/256x192/SIGLA_DA_SOST.png'

function giocaBandiere(){
	if(index_n_parole == 0){
		//devo creare tutto
		$('.flag_to_guess').css('display', '');
		ARRAY_BANDIERE = creaArrayFlags();		
		$('#flag1').attr('src', ARRAY_BANDIERE[0].url);
		$('#flag2').attr('src', ARRAY_BANDIERE[0].url);
		$('#lblSoluzione').html(ARRAY_BANDIERE[0].soluzione + '\n<i>' + ARRAY_CAPITALI[0]+ '</i>');
		$('.lblParola').css('display', 'none')
		$('#flag1').css('display', '');
		$('#flag2').css('display', '');
	}else{
		if(index_n_parole <= ARRAY_BANDIERE.length ){
			let indice = index_n_parole%ARRAY_BANDIERE.length;
			console.log('indice:' + indice);
			$('#flag1').attr('src', ARRAY_BANDIERE[indice].url);
			$('#flag2').attr('src', ARRAY_BANDIERE[indice].url);
			$('#lblSoluzione').html(ARRAY_BANDIERE[indice].soluzione + '\n<i>' + ARRAY_CAPITALI[indice] +'</i>');
			$('.lblParola').css('display', 'none')
			setSizeTraduzione();
		}else{
			//gioco finito
			//alert('FINITO!!')
			let indovinate, sbagliate, tot
			indovinate= parseInt($('#lblIndovinate').text());
			sbagliate= parseInt($('#lblSbagliate').text());
			tot= indovinate + sbagliate;
			$('#lblParola').text('FINITO\n\nIndovinate\n' + indovinate + '/' + tot);
			$('.lblParola').css('display', '')
			$('#flag1').css('display', 'none');
			$('#flag2').css('display', 'none');
			$('#btnSoluzione').css('display', 'none');
		}
	}	
}
var ARRAY_BANDIERE;
var ARRAY_CAPITALI;
var kMAX = 306
function creaArrayFlags(){
	let arr = [];
	let arrCapitali = [];
	
	const ARR_FLAG_LIST = Object.keys(FLAG_LIST);
	for(let i = 1; i<=NUM_10; ++i){
		let randomNumber = parseInt(Math.random()*kMAX);		
		const randomKey = ARR_FLAG_LIST[randomNumber];
		const soluz = FLAG_LIST[randomKey];
	 	let obj = {}
		obj["url"] = BASE_URL.replace("SIGLA_DA_SOST", randomKey);	
		obj["soluzione"] = soluz;		 
		arr.push(obj);
				 
		arrCapitali.push(CAPITALI_LIST[randomKey])		
	}
	ARRAY_CAPITALI = arrCapitali;
	return arr;
}

function randomFlag(){
	const ARR_FLAG_LIST = Object.keys(FLAG_LIST);
	let randomNumber = parseInt(Math.random()*kMAX);		
	const randomKey = ARR_FLAG_LIST[randomNumber];
	let url = BASE_URL.replace("SIGLA_DA_SOST", randomKey);
	$('#flagBtModalitaFlag').attr('src', url);
}

var FLAG_LIST = {
    "ad": "Andorra",
    "ae": "United Arab Emirates",
    "af": "Afghanistan",
    "ag": "Antigua and Barbuda",
    "ai": "Anguilla",
    "al": "Albania",
    "am": "Armenia",
    "ao": "Angola",
    "aq": "Antarctica",
    "ar": "Argentina",
    "as": "American Samoa",
    "at": "Austria",
    "au": "Australia",
    "aw": "Aruba",
    "ax": "Åland Islands",
    "az": "Azerbaijan",
    "ba": "Bosnia and Herzegovina",
    "bb": "Barbados",
    "bd": "Bangladesh",
    "be": "Belgium",
    "bf": "Burkina Faso",
    "bg": "Bulgaria",
    "bh": "Bahrain",
    "bi": "Burundi",
    "bj": "Benin",
    "bl": "Saint Barthélemy",
    "bm": "Bermuda",
    "bn": "Brunei",
    "bo": "Bolivia",
    "bq": "Caribbean Netherlands",
    "br": "Brazil",
    "bs": "Bahamas",
    "bt": "Bhutan",
    "bv": "Bouvet Island",
    "bw": "Botswana",
    "by": "Belarus",
    "bz": "Belize",
    "ca": "Canada",
    "cc": "Cocos (Keeling) Islands",
    "cd": "DR Congo",
    "cf": "Central African Republic",
    "cg": "Republic of the Congo",
    "ch": "Switzerland",
    "ci": "Côte d'Ivoire (Ivory Coast)",
    "ck": "Cook Islands",
    "cl": "Chile",
    "cm": "Cameroon",
    "cn": "China",
    "co": "Colombia",
    "cr": "Costa Rica",
    "cu": "Cuba",
    "cv": "Cape Verde",
    "cw": "Curaçao",
    "cx": "Christmas Island",
    "cy": "Cyprus",
    "cz": "Czechia",
    "de": "Germany",
    "dj": "Djibouti",
    "dk": "Denmark",
    "dm": "Dominica",
    "do": "Dominican Republic",
    "dz": "Algeria",
    "ec": "Ecuador",
    "ee": "Estonia",
    "eg": "Egypt",
    "eh": "Western Sahara",
    "er": "Eritrea",
    "es": "Spain",
    "et": "Ethiopia",
    "eu": "European Union",
    "fi": "Finland",
    "fj": "Fiji",
    "fk": "Falkland Islands",
    "fm": "Micronesia",
    "fo": "Faroe Islands",
    "fr": "France",
    "ga": "Gabon",
    "gb": "United Kingdom",
    "gb-eng": "England",
    "gb-nir": "Northern Ireland",
    "gb-sct": "Scotland",
    "gb-wls": "Wales",
    "gd": "Grenada",
    "ge": "Georgia",
    "gf": "French Guiana",
    "gg": "Guernsey",
    "gh": "Ghana",
    "gi": "Gibraltar",
    "gl": "Greenland",
    "gm": "Gambia",
    "gn": "Guinea",
    "gp": "Guadeloupe",
    "gq": "Equatorial Guinea",
    "gr": "Greece",
    "gs": "South Georgia",
    "gt": "Guatemala",
    "gu": "Guam",
    "gw": "Guinea-Bissau",
    "gy": "Guyana",
    "hk": "Hong Kong",
    "hm": "Heard Island and McDonald Islands",
    "hn": "Honduras",
    "hr": "Croatia",
    "ht": "Haiti",
    "hu": "Hungary",
    "id": "Indonesia",
    "ie": "Ireland",
    "il": "Israel",
    "im": "Isle of Man",
    "in": "India",
    "io": "British Indian Ocean Territory",
    "iq": "Iraq",
    "ir": "Iran",
    "is": "Iceland",
    "it": "Italy",
    "je": "Jersey",
    "jm": "Jamaica",
    "jo": "Jordan",
    "jp": "Japan",
    "ke": "Kenya",
    "kg": "Kyrgyzstan",
    "kh": "Cambodia",
    "ki": "Kiribati",
    "km": "Comoros",
    "kn": "Saint Kitts and Nevis",
    "kp": "North Korea",
    "kr": "South Korea",
    "kw": "Kuwait",
    "ky": "Cayman Islands",
    "kz": "Kazakhstan",
    "la": "Laos",
    "lb": "Lebanon",
    "lc": "Saint Lucia",
    "li": "Liechtenstein",
    "lk": "Sri Lanka",
    "lr": "Liberia",
    "ls": "Lesotho",
    "lt": "Lithuania",
    "lu": "Luxembourg",
    "lv": "Latvia",
    "ly": "Libya",
    "ma": "Morocco",
    "mc": "Monaco",
    "md": "Moldova",
    "me": "Montenegro",
    "mf": "Saint Martin",
    "mg": "Madagascar",
    "mh": "Marshall Islands",
    "mk": "North Macedonia",
    "ml": "Mali",
    "mm": "Myanmar",
    "mn": "Mongolia",
    "mo": "Macau",
    "mp": "Northern Mariana Islands",
    "mq": "Martinique",
    "mr": "Mauritania",
    "ms": "Montserrat",
    "mt": "Malta",
    "mu": "Mauritius",
    "mv": "Maldives",
    "mw": "Malawi",
    "mx": "Mexico",
    "my": "Malaysia",
    "mz": "Mozambique",
    "na": "Namibia",
    "nc": "New Caledonia",
    "ne": "Niger",
    "nf": "Norfolk Island",
    "ng": "Nigeria",
    "ni": "Nicaragua",
    "nl": "Netherlands",
    "no": "Norway",
    "np": "Nepal",
    "nr": "Nauru",
    "nu": "Niue",
    "nz": "New Zealand",
    "om": "Oman",
    "pa": "Panama",
    "pe": "Peru",
    "pf": "French Polynesia",
    "pg": "Papua New Guinea",
    "ph": "Philippines",
    "pk": "Pakistan",
    "pl": "Poland",
    "pm": "Saint Pierre and Miquelon",
    "pn": "Pitcairn Islands",
    "pr": "Puerto Rico",
    "ps": "Palestine",
    "pt": "Portugal",
    "pw": "Palau",
    "py": "Paraguay",
    "qa": "Qatar",
    "re": "Réunion",
    "ro": "Romania",
    "rs": "Serbia",
    "ru": "Russia",
    "rw": "Rwanda",
    "sa": "Saudi Arabia",
    "sb": "Solomon Islands",
    "sc": "Seychelles",
    "sd": "Sudan",
    "se": "Sweden",
    "sg": "Singapore",
    "sh": "Saint Helena, Ascension and Tristan da Cunha",
    "si": "Slovenia",
    "sj": "Svalbard and Jan Mayen",
    "sk": "Slovakia",
    "sl": "Sierra Leone",
    "sm": "San Marino",
    "sn": "Senegal",
    "so": "Somalia",
    "sr": "Suriname",
    "ss": "South Sudan",
    "st": "São Tomé and Príncipe",
    "sv": "El Salvador",
    "sx": "Sint Maarten",
    "sy": "Syria",
    "sz": "Eswatini (Swaziland)",
    "tc": "Turks and Caicos Islands",
    "td": "Chad",
    "tf": "French Southern and Antarctic Lands",
    "tg": "Togo",
    "th": "Thailand",
    "tj": "Tajikistan",
    "tk": "Tokelau",
    "tl": "Timor-Leste",
    "tm": "Turkmenistan",
    "tn": "Tunisia",
    "to": "Tonga",
    "tr": "Turkey",
    "tt": "Trinidad and Tobago",
    "tv": "Tuvalu",
    "tw": "Taiwan",
    "tz": "Tanzania",
    "ua": "Ukraine",
    "ug": "Uganda",
    "um": "United States Minor Outlying Islands",    
    "us": "United States",
    "us-ak": "Alaska",
    "us-al": "Alabama",
    "us-ar": "Arkansas",
    "us-az": "Arizona",
    "us-ca": "California",
    "us-co": "Colorado",
    "us-ct": "Connecticut",
    "us-de": "Delaware",
    "us-fl": "Florida",
    "us-ga": "Georgia",
    "us-hi": "Hawaii",
    "us-ia": "Iowa",
    "us-id": "Idaho",
    "us-il": "Illinois",
    "us-in": "Indiana",
    "us-ks": "Kansas",
    "us-ky": "Kentucky",
    "us-la": "Louisiana",
    "us-ma": "Massachusetts",
    "us-md": "Maryland",
    "us-me": "Maine",
    "us-mi": "Michigan",
    "us-mn": "Minnesota",
    "us-mo": "Missouri",
    "us-ms": "Mississippi",
    "us-mt": "Montana",
    "us-nc": "North Carolina",
    "us-nd": "North Dakota",
    "us-ne": "Nebraska",
    "us-nh": "New Hampshire",
    "us-nj": "New Jersey",
    "us-nm": "New Mexico",
    "us-nv": "Nevada",
    "us-ny": "New York",
    "us-oh": "Ohio",
    "us-ok": "Oklahoma",
    "us-or": "Oregon",
    "us-pa": "Pennsylvania",
    "us-ri": "Rhode Island",
    "us-sc": "South Carolina",
    "us-sd": "South Dakota",
    "us-tn": "Tennessee",
    "us-tx": "Texas",
    "us-ut": "Utah",
    "us-va": "Virginia",
    "us-vt": "Vermont",
    "us-wa": "Washington",
    "us-wi": "Wisconsin",
    "us-wv": "West Virginia",
    "us-wy": "Wyoming",
    "uy": "Uruguay",
    "uz": "Uzbekistan",
    "va": "Vatican City (Holy See)",
    "vc": "Saint Vincent and the Grenadines",
    "ve": "Venezuela",
    "vg": "British Virgin Islands",
    "vi": "United States Virgin Islands",
    "vn": "Vietnam",
    "vu": "Vanuatu",
    "wf": "Wallis and Futuna",
    "ws": "Samoa",
    "xk": "Kosovo",
    "ye": "Yemen",
    "yt": "Mayotte",
    "za": "South Africa",
    "zm": "Zambia",
    "zw": "Zimbabwe"
}


var CAPITALI_LIST = {	
    "ad": "Andorra la Vella",
    "ae": "Abu Dhabi",
    "af": "Kabul",
    "ag": "Saint John's",
    "ai": "The Valley",
    "al": "Tirana",
    "am": "Yerevan",
    "ao": "Luanda",
    "aq": "None", // Antarctica has no capital
    "ar": "Buenos Aires",
    "as": "Pago Pago",
    "at": "Vienna",
    "au": "Canberra",
    "aw": "Oranjestad",
    "ax": "Mariehamn",
    "az": "Baku",
    "ba": "Sarajevo",
    "bb": "Bridgetown",
    "bd": "Dhaka",
    "be": "Brussels",
    "bf": "Ouagadougou",
    "bg": "Sofia",
    "bh": "Manama",
    "bi": "Gitega",
    "bj": "Porto-Novo",
    "bl": "Gustavia",
    "bm": "Hamilton",
    "bn": "Bandar Seri Begawan",
    "bo": "Sucre",
    "bq": "Kralendijk",
    "br": "Brasília",
    "bs": "Nassau",
    "bt": "Thimphu",
    "bv": "None", // Bouvet Island is uninhabited
    "bw": "Gaborone",
    "by": "Minsk",
    "bz": "Belmopan",
    "ca": "Ottawa",
    "cc": "West Island",
    "cd": "Kinshasa",
    "cf": "Bangui",
    "cg": "Brazzaville",
    "ch": "Bern",
    "ci": "Yamoussoukro",
    "ck": "Avarua",
    "cl": "Santiago",
    "cm": "Yaoundé",
    "cn": "Beijing",
    "co": "Bogotá",
    "cr": "San José",
    "cu": "Havana",
    "cv": "Praia",
    "cw": "Willemstad",
    "cx": "Flying Fish Cove",
    "cy": "Nicosia",
    "cz": "Prague",
    "de": "Berlin",
    "dj": "Djibouti",
    "dk": "Copenhagen",
    "dm": "Roseau",
    "do": "Santo Domingo",
    "dz": "Algiers",
    "ec": "Quito",
    "ee": "Tallinn",
    "eg": "Cairo",
    "eh": "El Aaiún",
    "er": "Asmara",
    "es": "Madrid",
    "et": "Addis Ababa",
    "eu": "Brussels",
    "fi": "Helsinki",
    "fj": "Suva",
    "fk": "Stanley",
    "fm": "Palikir",
    "fo": "Tórshavn",
    "fr": "Paris",
    "ga": "Libreville",
    "gb": "London",
    "gb-eng": "London",
    "gb-nir": "Belfast",
    "gb-sct": "Edinburgh",
    "gb-wls": "Cardiff",
    "gd": "Saint George's",
    "ge": "Tbilisi",
    "gf": "Cayenne",
    "gg": "Saint Peter Port",
    "gh": "Accra",
    "gi": "Gibraltar",
    "gl": "Nuuk",
    "gm": "Banjul",
    "gn": "Conakry",
    "gp": "Basse-Terre",
    "gq": "Malabo",
    "gr": "Athens",
    "gs": "King Edward Point",
    "gt": "Guatemala City",
    "gu": "Hagåtña",
    "gw": "Bissau",
    "gy": "Georgetown",
    "hk": "Hong Kong",
    "hm": "None",
    "hn": "Tegucigalpa",
    "hr": "Zagreb",
    "ht": "Port-au-Prince",
    "hu": "Budapest",
    "id": "Jakarta",
    "ie": "Dublin",
    "il": "Jerusalem",
    "im": "Douglas",
    "in": "New Delhi",
    "io": "Diego Garcia",
    "iq": "Baghdad",
    "ir": "Tehran",
    "is": "Reykjavik",
    "it": "Rome",
    "je": "Saint Helier",
    "jm": "Kingston",
    "jo": "Amman",
    "jp": "Tokyo",
    "ke": "Nairobi",
    "kg": "Bishkek",
    "kh": "Phnom Penh",
    "ki": "Tarawa",
    "km": "Moroni",
    "kn": "Basseterre",
    "kp": "Pyongyang",
    "kr": "Seoul",
    "kw": "Kuwait City",
    "ky": "George Town",
    "kz": "Astana",
    "la": "Vientiane",
    "lb": "Beirut",
    "lc": "Castries",
    "li": "Vaduz",
    "lk": "Sri Jayawardenepura Kotte",
    "lr": "Monrovia",
    "ls": "Maseru",
    "lt": "Vilnius",
    "lu": "Luxembourg",
    "lv": "Riga",
    "ly": "Tripoli",
    "ma": "Rabat",
    "mc": "Monaco",
    "md": "Chișinău",
    "me": "Podgorica",
    "mf": "Marigot",
    "mg": "Antananarivo",
    "mh": "Majuro",
    "mk": "Skopje",
    "ml": "Bamako",
    "mm": "Naypyidaw",
    "mn": "Ulaanbaatar",
    "mo": "Macau",
    "mp": "Saipan",
    "mq": "Fort-de-France",
    "mr": "Nouakchott",
    "ms": "Plymouth",
    "mt": "Valletta",
    "mu": "Port Louis",
    "mv": "Malé",
    "mw": "Lilongwe",
    "mx": "Mexico City",
    "my": "Kuala Lumpur",
    "mz": "Maputo",
    "na": "Windhoek",
    "nc": "Nouméa",
    "ne": "Niamey",
    "nf": "Kingston",
    "ng": "Abuja",
    "ni": "Managua",
    "nl": "Amsterdam",
    "no": "Oslo",
    "np": "Kathmandu",
    "nr": "Yaren",
    "nu": "Alofi",
    "nz": "Wellington",
    "om": "Muscat",
    "pa": "Panama City",
    "pe": "Lima",
    "pf": "Papeete",
    "pg": "Port Moresby",
    "ph": "Manila",
    "pk": "Islamabad",
    "pl": "Warsaw",
    "pm": "Saint-Pierre",
    "pn": "Adamstown",
    "pr": "San Juan",
    "ps": "Ramallah",
    "pt": "Lisbon",
    "pw": "Ngerulmud",
    "py": "Asunción",
    "qa": "Doha",
    "re": "Saint-Denis",
    "ro": "Bucharest",
    "rs": "Belgrade",
    "ru": "Moscow",
    "rw": "Kigali",
    "sa": "Riyadh",
    "sb": "Honiara",
    "sc": "Victoria",
    "sd": "Khartoum",
    "se": "Stockholm",
    "sg": "Singapore",
    "sh": "Jamestown",
    "si": "Ljubljana",
    "sj": "Longyearbyen",
    "sk": "Bratislava",
    "sl": "Freetown",
    "sm": "San Marino",
    "sn": "Dakar",
    "so": "Mogadishu",
    "sr": "Paramaribo",
    "ss": "Juba",
    "st": "São Tomé",
    "sv": "San Salvador",
    "sx": "Philipsburg",
    "sy": "Damascus",
    "sz": "Mbabane",
    "tc": "Cockburn Town",
    "td": "N'Djamena",
    "tf": "Port-aux-Français",
    "tg": "Lomé",
    "th": "Bangkok",
    "tj": "Dushanbe",
    "tk": "Nukunonu",
    "tl": "Dili",
    "tm": "Ashgabat",
    "tn": "Tunis",
    "to": "Nukuʻalofa",
    "tr": "Ankara",
    "tt": "Port of Spain",
    "tv": "Funafuti",
    "tw": "Taipei",
    "tz": "Dodoma",
    "ua": "Kyiv",
    "ug": "Kampala",
    "um": "None",    
    "us": "Washington, D.C.",
	"us-ak": "Juneau",
"us-al": "Montgomery",
"us-ar": "Little Rock",
"us-az": "Phoenix",
"us-ca": "Sacramento",
"us-co": "Denver",
"us-ct": "Hartford",
"us-de": "Dover",
"us-fl": "Tallahassee",
"us-ga": "Atlanta",
"us-hi": "Honolulu",
"us-ia": "Des Moines",
"us-id": "Boise",
"us-il": "Springfield",
"us-in": "Indianapolis",
"us-ks": "Topeka",
"us-ky": "Frankfort",
"us-la": "Baton Rouge",
"us-ma": "Boston",
"us-md": "Annapolis",
"us-me": "Augusta",
"us-mi": "Lansing",
"us-mn": "St. Paul",
"us-mo": "Jefferson City",
"us-ms": "Jackson",
"us-mt": "Helena",
"us-nc": "Raleigh",
"us-nd": "Bismarck",
"us-ne": "Lincoln",
"us-nh": "Concord",
"us-nj": "Trenton",
"us-nm": "Santa Fe",
"us-nv": "Carson City",
"us-ny": "Albany",
"us-oh": "Columbus",
"us-ok": "Oklahoma City",
"us-or": "Salem",
"us-pa": "Harrisburg",
"us-ri": "Providence",
"us-sc": "Columbia",
"us-sd": "Pierre",
"us-tn": "Nashville",
"us-tx": "Austin",
"us-ut": "Salt Lake City",
"us-va": "Richmond",
"us-vt": "Montpelier",
"us-wa": "Olympia",
"us-wi": "Madison",
"us-wv": "Charleston",
"us-wy": "Cheyenne",
    "uy": "Montevideo",
    "uz": "Tashkent",
    "va": "Vatican City",
    "vc": "Kingstown",
    "ve": "Caracas",
    "vg": "Road Town",
    "vi": "Charlotte Amalie",
    "vn": "Hanoi",
    "vu": "Port Vila",
    "wf": "Mata-Utu",
    "ws": "Apia",
    "xk": "Pristina",
    "ye": "Sana'a",
    "yt": "Mamoudzou",
    "za": "Pretoria",
    "zm": "Lusaka",
    "zw": "Harare"
};

