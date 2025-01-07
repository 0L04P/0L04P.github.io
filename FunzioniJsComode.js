/*Funzioni js comode*/
function NZ(valore, valoreDefault = ''){	
	if(!valore || valore === 'undefined' || valore === 'null') return valoreDefault;
	return valore;
}
function pGetTimestamp() {
	return new Date().toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }).replace(',', '.')
}
function getPageName(url = '') {
	if(url == ''){
		url = window.location.href;
	}
    let index = url.lastIndexOf("/") + 1;
    let filenameWithExtension = url.substr(index);
    let filename = filenameWithExtension.split(".")[0];
    return filename + '.html';
}
function getUrlQueryString() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function isValidPassword(password) {
    var regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@$£&%?^#]).{8,}/gm;
    return regex.test(password);
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function pStampaCProprieta(op) {
	let s = '';
	let n = op.Count();
	for (let i = 1; i <= n; ++i) {
		s += op.nomeProprieta(i) + ': ' + op.Leggi(op.nomeProprieta(i));
		if (i < n) { s += '\n'}
	}
	console.log(s);
}
function pCProprieta_to_Object(op){
	let obj = {};
	let n = op.Count();
	for (let i = 1; i <= n; ++i) {
		obj(op.nomeProprieta(i)) = op.Leggi(op.nomeProprieta(i));		
	}
}
function pStampaTableCProprieta(op){
	console.table(pCProprieta_to_Object(op))
}





