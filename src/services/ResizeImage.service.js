import Pica from 'pica';

var startTime = Date.now();
var number = 0;

const pica = Pica({
   features: [
      'cib',
       'wasm', 
       'js'
    ],
    idle: 1000,
  });

function calcThumbnailSize(img){
  const thumbnailSize = 400;
  const proportion = img.height / img.width  ;
  return {
    width: thumbnailSize,
    height: thumbnailSize*proportion
  }
  
};
function openImageOnCanvas(image) {
  var canvas = document.createElement('canvas');
  canvas.getContext('2d').drawImage(image,0,0);
  return canvas;
};
async function resizeImage(image, canvas){
  await doResize(pica, image, canvas);
  // .then(() => {
  //   image = false;
  //   console.log("tempo de execução:"+(Date.now() - startTime).toFixed(2));
  // })
  // .catch((e) => {
  //     console.log("deu ruim");
  //     console.error(e);
  //     image = false;
  //   });
  image = false;
};

function doResize(pica, image, canvas) {
  startTime = Date.now();
  return pica.resize(image, canvas, {
    quality: 2,
    transferable: true
  });
};
 

export default {
    async renderThumbnail(canvas, file){
      const self = this;
      const imageNumber = ++number;

  		let img = new Image();
  		img.addEventListener("load",() => {
        const size = calcThumbnailSize(img);
  			canvas.width = size.width;
  			canvas.height = size.height;
        console.log('começou imagem: '+ imageNumber);
  			resizeImage(img, canvas);
        console.log('processou imagem: '+ imageNumber);
  		},false);

      console.log('definiu carregamento imagem:' + imageNumber);
      let reader = new FileReader();
      reader.onload = (e) => {
          img.src = e.target.result;
          reader = null;
      }
      
      await reader.readAsDataURL(file);
      console.log('finalizou processamento imagem:' + imageNumber);

    },
   
}
