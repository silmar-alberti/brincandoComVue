<template >
  <keep-alive>
    <div class="card-body">
      <canvas id="thumbnail" ref="thumbnail"> </canvas>  
    </div>
  </keep-alive>
</template>

<script>
import Pica from 'pica';

export default {
  name: 'ImageThumbnail',
  props: {
    file: {}
  },
  mounted: function () {
    this.renderThumbnail();
  },
  watch: { 
    'file': function() {
      this.renderThumbnail();
    }
  },
  methods: {
  	renderThumbnail: function(){
      let canvas = this.$refs.thumbnail;
  		let self = this;
  		let img = new Image();
  		img.addEventListener("load",() => {
        const size = self.calcThumbnailSize(img);
  			canvas.width = size.width;
  			canvas.height = size.height;
  			self.resizeImage(img, canvas);
  		},false);

      let reader = new FileReader();
      reader.onload = (e) => {
          img.src = e.target.result;
          reader = null;
      }
      
      reader.readAsDataURL(this.file);

    },
    calcThumbnailSize: function(img){
    	const thumbnailSize = 400;
    	const proportion = img.height / img.width  ;
    	return {
    		width: thumbnailSize,
    		height: thumbnailSize*proportion
    	}
    	
    },
    openImageOnCanvas: function(image) {
    	var canvas = document.createElement('canvas');
    	canvas.getContext('2d').drawImage(image,0,0);
    	return canvas;
    },
    resizeImage: function(image, canvas){
  		this.doResize(this.createPica(), image, canvas).then(() => {
        image = null;
        pica = image;
      	console.log("tempo de execução:"+(Date.now() - startTime).toFixed(2));
      })
      .catch((e) => {
      		console.log("deu ruim");
          console.error(e);
          image = null;
          pica = image ;
      	});
    },

    createPica: () => {
      return Pica({
       features: [
          'cib',
           'wasm', 
           'js'
        ],
        idle: 0,
      });
    }, 
    doResize: (pica, image, canvas) => {
      
      
      const startTime = Date.now();
      return pica.resize(image, canvas, {
        quality: 2,
        transferable: true
      });
    },
    
  }
}
</script>

<style scoped>

</style>
