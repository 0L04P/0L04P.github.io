const FLAG_LIST = {
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

const CAPITALI_LIST = {	
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

const HIRAGANA_LIST = {
  "3041": "a",    // ぁ
  "3042": "a",    // あ
  "3043": "i",    // ぃ
  "3044": "i",    // い
  "3045": "u",    // ぅ
  "3046": "u",    // う
  "3047": "e",    // ぇ
  "3048": "e",    // え
  "3049": "o",    // ぉ
  "304A": "o",    // お
  "304B": "ka",   // か
  "304C": "ga",   // が
  "304D": "ki",   // き
  "304E": "gi",   // ぎ
  "304F": "ku",   // く
  "3050": "gu",   // ぐ
  "3051": "ke",   // け
  "3052": "ge",   // げ
  "3053": "ko",   // こ
  "3054": "go",   // ご
  "3055": "sa",   // さ
  "3056": "za",   // ざ
  "3057": "shi",  // し
  "3058": "ji",   // じ
  "3059": "su",   // す
  "305A": "zu",   // ず
  "305B": "se",   // せ
  "305C": "ze",   // ぜ
  "305D": "so",   // そ
  "305E": "zo",   // ぞ
  "305F": "ta",   // た
  "3060": "da",   // だ
  "3061": "chi",  // ち
  "3062": "ji",   // ぢ
  "3063": "tsu",  // っ
  "3064": "tsu",  // つ
  "3065": "zu",   // づ
  "3066": "te",   // て
  "3067": "de",   // で
  "3068": "to",   // と
  "3069": "do",   // ど
  "306A": "na",   // な
  "306B": "ni",   // に
  "306C": "nu",   // ぬ
  "306D": "ne",   // ね
  "306E": "no",   // の
  "306F": "ha",   // は
  "3070": "ba",   // ば
  "3071": "pa",   // ぱ
  "3072": "hi",   // ひ
  "3073": "bi",   // び
  "3074": "pi",   // ぴ
  "3075": "fu",   // ふ
  "3076": "bu",   // ぶ
  "3077": "pu",   // ぷ
  "3078": "he",   // へ
  "3079": "be",   // べ
  "307A": "pe",   // ぺ
  "307B": "ho",   // ほ
  "307C": "bo",   // ぼ
  "307D": "po",   // ぽ
  "307E": "ma",   // ま
  "307F": "mi",   // み
  "3080": "mu",   // む
  "3081": "me",   // め
  "3082": "mo",   // も
  "3083": "ya",   // ゃ
  "3084": "ya",   // や
  "3085": "yu",   // ゅ
  "3086": "yu",   // ゆ
  "3087": "yo",   // ょ
  "3088": "yo",   // よ
  "3089": "ra",   // ら
  "308A": "ri",   // り
  "308B": "ru",   // る
  "308C": "re",   // れ
  "308D": "ro",   // ろ
  "308E": "wa",   // ゎ
  "308F": "wa",   // わ
  "3090": "wi",   // ゐ
  "3091": "we",   // ゑ
  "3092": "wo",   // を
  "3093": "n",    // ん
};

const KATAKANA_LIST = {
  "30A1": "a",    // ァ
  "30A2": "a",    // ア
  "30A3": "i",    // ィ
  "30A4": "i",    // イ
  "30A5": "u",    // ゥ
  "30A6": "u",    // ウ
  "30A7": "e",    // ェ
  "30A8": "e",    // エ
  "30A9": "o",    // ォ
  "30AA": "o",    // オ
  "30AB": "ka",   // カ
  "30AC": "ga",   // ガ
  "30AD": "ki",   // キ
  "30AE": "gi",   // ギ
  "30AF": "ku",   // ク
  "30B0": "gu",   // グ
  "30B1": "ke",   // ケ
  "30B2": "ge",   // ゲ
  "30B3": "ko",   // コ
  "30B4": "go",   // ゴ
  "30B5": "sa",   // サ
  "30B6": "za",   // ザ
  "30B7": "shi",  // シ
  "30B8": "ji",   // ジ
  "30B9": "su",   // ス
  "30BA": "zu",   // ズ
  "30BB": "se",   // セ
  "30BC": "ze",   // ゼ
  "30BD": "so",   // ソ
  "30BE": "zo",   // ゾ
  "30BF": "ta",   // タ
  "30C0": "da",   // ダ
  "30C1": "chi",  // チ
  "30C2": "ji",   // ヂ
  "30C3": "tsu",  // ッ
  "30C4": "tsu",  // ツ
  "30C5": "zu",   // ヅ
  "30C6": "te",   // テ
  "30C7": "de",   // デ
  "30C8": "to",   // ト
  "30C9": "do",   // ド
  "30CA": "na",   // ナ
  "30CB": "ni",   // ニ
  "30CC": "nu",   // ヌ
  "30CD": "ne",   // ネ
  "30CE": "no",   // ノ
  "30CF": "ha",   // ハ
  "30D0": "ba",   // バ
  "30D1": "pa",   // パ
  "30D2": "hi",   // ヒ
  "30D3": "bi",   // ビ
  "30D4": "pi",   // ピ
  "30D5": "fu",   // フ
  "30D6": "bu",   // ブ
  "30D7": "pu",   // プ
  "30D8": "he",   // ヘ
  "30D9": "be",   // ベ
  "30DA": "pe",   // ペ
  "30DB": "ho",   // ホ
  "30DC": "bo",   // ボ
  "30DD": "po",   // ポ
  "30DE": "ma",   // マ
  "30DF": "mi",   // ミ
  "30E0": "mu",   // ム
  "30E1": "me",   // メ
  "30E2": "mo",   // モ
  "30E3": "ya",   // ャ
  "30E4": "ya",   // ヤ
  "30E5": "yu",   // ュ
  "30E6": "yu",   // ユ
  "30E7": "yo",   // ョ
  "30E8": "yo",   // ヨ
  "30E9": "ra",   // ラ
  "30EA": "ri",   // リ
  "30EB": "ru",   // ル
  "30EC": "re",   // レ
  "30ED": "ro",   // ロ
  "30EE": "wa",   // ヮ
  "30EF": "wa",   // ワ
  "30F0": "wi",   // ヰ
  "30F1": "we",   // ヱ
  "30F2": "wo",   // ヲ
  "30F3": "n",    // ン
  "30F4": "vu",   // ヴ
  "30F5": "ka",   // ヵ
  "30F6": "ke"    // ヶ
};




