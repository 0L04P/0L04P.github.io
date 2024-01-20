const express = require('express');
const rp = require('request-promise');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  // Replace the array with the URLs of your images
    let chapter = 0014;
	let imageUrls = [];
	let baseUrl = 'https://i0.wp.com/official.lowee.us/manga/Detective-Conan/' + chapter + '-';
	for(let k = 1; k<=25;++k){
		imageUrls.push(baseUrl + PageNumberToString(k,3));
	}

   
  const imageUrls = [
    'https://i0.wp.com/official.lowee.us/manga/Detective-Conan/' + chapter + '-' + PageNumberToString(pagina, 3) + '.png';	',
    'https://example.com/image2.jpg',
    // Add more image URLs as needed
  ];

  // Fetch image data
  const imageDataPromises = imageUrls.map(url => rp({ url, encoding: null }));

  try {
    const imageDataArray = await Promise.all(imageDataPromises);
    const base64Images = imageDataArray.map(data => `data:image/jpeg;base64,${data.toString('base64')}`);

    res.render('index', { images: base64Images });
  } catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


function PageNumberToString(page, lunghezza){
	let res = '000' + page;
	return res.substr(res.length - lunghezza,lunghezza);
}
function ChapterNumberToString(page){
	let res = '0000' + page;
	return res.substr(res.length - 4,4);
}
