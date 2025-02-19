function UploadFoto(id) {
	switch(id){
		case 1:			
			pPromessaUploadFoto();
			
			break;
		case 2:
			PromessaUploadFoto_Base(true);
			break;
		case 3:
			PromessaUploadFoto_Base(false);
			break;
	}    	
}


function scriviSize(k){
	setTimeout(function(){
		let i = new Image()
		i.src = $('#img'+k).attr('src');
		$('#lbl' +k).html(`naturalWidth = ${i.naturalWidth} \t
					 naturalHeight = ${i.naturalHeight} \t
					 width = ${i.width} \t
					 height = ${i.height}\n\n
					 `)
					 /*naturalWidth = ${$('#img'+k).attr('naturalWidth')} \t
					 naturalHeight = ${$('#img'+k).attr('naturalHeight')} \t
					 width = ${$('#img'+k).attr('width')} \t
					 height = ${$('#img'+k).attr('height')}*/
					 
					 				
	}, 500)		
}

function pPromessaUploadFoto() {
    return new Promise((resolve, reject) => {       
              
        var foto = $("#txtFoto1").prop('files')[0];
        const blobURL = URL.createObjectURL(foto);
        const img = new Image();
        img.src = blobURL;          

        img.onload = function () {
            URL.revokeObjectURL(blobURL);

            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");

            const width = GetWidthResize(img.naturalWidth);
            const scaleFactor = width / img.naturalWidth;
            canvas.width = width;
            canvas.height = img.naturalHeight * scaleFactor;

            context.drawImage(img, 0, 0, width, canvas.height);

            // Read original file data
            var reader = new FileReader();
            reader.readAsDataURL(foto);
            reader.onloadend = function () {
                let FotoDaCaricare_Modificata;

                if (/jpg|jpeg/i.test(foto.name)) {
                    let exifObj = piexif.load(reader.result);

                    /*************************************************************/
                    // The resulting photo may appear rotated:
                    // Force orientation correction to fix this issue
                    exifObj['0th'][piexif.ImageIFD.Orientation] = 1;
                    /*************************************************************/

                    // Get EXIF binary as "string"
                    let exifStr = piexif.dump(exifObj);

                    // Get JPEG image from resized canvas
                    let FotoDaCaricare = canvas.toDataURL("image/jpeg", 1.0);

                    // Insert EXIF metadata into the new resized image
                    FotoDaCaricare_Modificata = piexif.insert(exifStr, FotoDaCaricare);
                } else {
                    FotoDaCaricare_Modificata = canvas.toDataURL("image/jpeg", 1.0);                   
                }

                //AGGIUNGO LA MNIATURA DELLA FOTO NELL'ELENCO CATEGORIE
                $('#img1').attr('src', FotoDaCaricare_Modificata);
                $('#txtFotoFile').val(null);
				scriviSize(1);
                resolve(true);
            };
        };
    });
}

function PromessaUploadFoto_Base(bResize){	
	var foto 
	if(bResize){
		foto = $("#txtFoto2").prop('files')[0]; 		
	}else{
		foto = $("#txtFoto3").prop('files')[0]; 
	}
		  			
    const blobURL = URL.createObjectURL(foto);
    const img = new Image();
    img.src = blobURL;	
    img.onload = function () {
        URL.revokeObjectURL(foto);

        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        let width ;
		if(bResize == true){
			width = GetWidthResize(img.width);
		} else{
			width = img.width;	
		}	
        const scaleFactor = width / img.width;
        canvas.width = width;
        canvas.height = img.height * scaleFactor;
        context.drawImage(img, 0, 0, width, img.height * scaleFactor);
        let FotoDaCaricare = canvas.toDataURL('image/jpeg');	
			canvas.toBlob(function(blob) {   
        }, 'image/jpeg', 1);
        //AGGIUNGO LA MNIATURA DELLA FOTO NELL'ELENCO CATEGORIE
        
		if(bResize){
			$('#img2').attr('src', FotoDaCaricare);
			scriviSize(2);	
		}else{
			$('#img3').attr('src', FotoDaCaricare);
			scriviSize(3); 
		}
        $('#txtFotoFile').val(null);
        
    }
}

const MAX_WIDTH = 1500;
function GetWidthResize(originalWidth) {
    if (originalWidth === undefined) return MAX_WIDTH;

    if (originalWidth < MAX_WIDTH) return originalWidth
    else return MAX_WIDTH
}


