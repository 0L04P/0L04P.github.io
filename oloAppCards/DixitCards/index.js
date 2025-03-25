const MAX_NUM_FOTO = 6;

 
(function () {
  setTimeout(function(){
	 
	  Gioca();
  }, 300)
})();

function Gioca(){
	let randomnumber = Math.ceil(Math.random()*MAX_NUM_FOTO);
	let nomefoto = pFormatta(randomnumber) + '.png';
	let sURL = 'https://0l04p.github.io/oloAppCards/DixitCards/';
	sURL += nomefoto;
	$('#imgGioca').attr('src', sURL);
    console.log(sURL)	
}

function pFormatta(s){	
	s = '000' + s;
	return s.substr(s.length -3,3);
}