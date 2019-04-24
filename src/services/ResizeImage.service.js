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
       'js',
       // 'ww'
    ],
    idle: 0,
  });

let imageId = 0;
let renderQueue = [];
let renderStatus = false;

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
  image = null;
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
        reader = null;
        e = null;
    }
    
    reader.readAsDataURL(file);
 
  });
};
async function renderThumbnail(canvas, file){
    const img = await loadImage(file);        

    const size = calcThumbnailSize(img);
    canvas.width = size.width;
    canvas.height = size.height;
    
    await resizeImage(img, canvas);        
};

async function runRender(){
    if (renderStatus || renderQueue.length == 0) {
      return;
    }
    renderStatus = true;
    let startTime = Date.now();
    while (renderQueue.length){
      let obj = renderQueue.shift();
      await renderThumbnail(obj.canvas, obj.file);

      obj = null;
    }

    console.log(`renderizou ${imageId} imagens em: ` + (Date.now() - startTime).toFixed(2));

    renderStatus = false;
}



export default {
    addToQueue(canvas, file){
        renderQueue.push({
          canvas: canvas,
          file: file,
          imageId: imageId++
        });

        // console.log('adicionou '+ imageId + ' na fila');  
        runRender();
    },
   
}
