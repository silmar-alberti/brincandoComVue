<template >
  <keep-alive>
    <div class="card-body">
      <canvas id="thumbnail" ref="thumbnail"> </canvas>  
    </div>
  </keep-alive>
</template>

<script>

import ResizeImage from '@services/ResizeImage.service.js';
export default {
  name: 'ImageThumbnail',
  props: {
    file: {}
  },
  mounted: function () {
    this.renderThumbnail();
  },
  // watch: { 
  //   'file': function() {
  //     this.renderThumbnail();
  //   }
  // },
  methods: {
    renderThumbnail: function(){
      let canvas = this.$refs.thumbnail;
      console.log('solicitado geração da miniatura');
      ResizeImage.renderThumbnail(canvas, this.file);
    },
  }
}
</script>

<style scoped>

</style>