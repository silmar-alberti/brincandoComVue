import Pica from 'pica';
const picaResizeSettings = {
    quality: 2,
    transferable: true,
    unsharpRadius: 0
  };

const pica = Pica({
   features: [
      'cib',
       'wasm', 
       'js'
    ],
    idle: 0,
  });

function calcThumbnailSize(img){
  const thumbnailSize = 400;
  const proportion = img.height / img.width  ;
  return {
    width: thumbnailSize,
    height: thumbnailSize*proportion
  }
  
};

async function resizeImage(image, canvas){
  await doResize(image, canvas);
  image = false;
};

function doResize(image, canvas) {
  return pica.resize(image, canvas, picaResizeSettings);
};
 
function loadImage(file) {
  return new Promise(resolve => {
    let img = new Image();
    let reader = new FileReader();

    img.addEventListener("load",() => {
      resolve(img);
    },false);
    
    reader.onload = (e) => {
        img.src = e.target.result;
        reader = false;
        e = false;
    }
    
    reader.readAsDataURL(file);
 
  });
};


export default {
     async renderThumbnail(canvas, file){
        const img = await loadImage(file);        

        const size = calcThumbnailSize(img);
        canvas.width = size.width;
        canvas.height = size.height;
        
        await resizeImage(img, canvas);        
    },
   
}
