<template>
  <ul class="row">
    <ImageThumbnail v-for="file in fileList" v-bind:file="file" > </ImageThumbnail>
  </ul>
</template>

<script>
import ImageThumbnail from  './ImageThumbnail.vue';

export default {
  name: 'ImageList',
  components: {
    ImageThumbnail
  },
  props: {
    fileList: FileList,
  },
  
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
