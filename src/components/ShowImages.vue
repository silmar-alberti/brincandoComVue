<template>
  <div>
    <input type="file" ref="inputFile" @change="onFilesChange" multiple="multiple" />
    <ImageList v-if="files.length > 0" v-bind:fileList="files" ></ImageList>
  </div>
</template>

<script>

import ImageList from './ImageManager/ImageList.vue';

export default {
  name: 'ShowImages',
  data: function (){
    return {
      files: []
    };
  },
  components: {
    ImageList
  },
  methods: {
    onFilesChange: function(e){
      let files = e.target.files || e.dataTransfer.files;
      this.$data.files =  files;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
