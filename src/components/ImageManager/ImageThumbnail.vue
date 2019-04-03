<template>
  <div class="card-body">
    <canvas id="thumbnail" ref="thumbnail"> </canvas>  
  </div>
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
      }
      
      reader.readAsDataURL(this.file);

    },
    calcThumbnailSize: function(img){
    	const thumbnailSize = 1000;
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
		const pica = Pica({ features: [
				'cib',
         'wasm', 
         'js'
			] });
		
		var startTime = Date.now();
    	pica.resize(image, canvas, {
		  quality: 1,
		  transferable: true
		}).then(() => {
			let executionTime = (Date.now() - startTime).toFixed(2);
    		console.log("tempo de execução:"+executionTime);
    	})
    	.catch(() => {
    		console.log("deu ruim");
    		canvas.drawImage(image,0,0);
    	});

    }
    
  }
}
</script>

<style scoped>

</style>
