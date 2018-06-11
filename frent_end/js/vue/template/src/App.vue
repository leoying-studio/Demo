<template>
     <container>
          <div class="content">
               
          </div>
          <div class="content2">
              
          </div>
           <div class="content2">
              
          </div>
           <div class="content2">
              
          </div>
           <div class="content2">
              
          </div>
           <div class="content2">
              
          </div>
           <div class="content2">
              
          </div>
           <div class="content2">
              
          </div>
     </container>
</template>

<script>
import Container from './components/container';
export default {
    name: 'app',
    components: {
       container : Container
    },
    data() {
      return {
         value:""
      }
    },
    methods: {
      onScroll() {
        console.log('tttt');
      }
    },
    watch: {

    },
    mounted() {

    }
}
</script>

<style>
  .content {
    height: 500px;
    background: red;
  }
  .content2 {
    height: 500px;
    background: blue;
  }

</style>
