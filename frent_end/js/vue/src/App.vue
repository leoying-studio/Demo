<template>
  <div id="app">
     <own-input v-model="value"></own-input>
     <own-button type="primary"></own-button>
     <own-send-code></own-send-code>  
     <own-dialog></own-dialog>
  </div>
</template>

<script>
import Input from "@/components/input";
import Button from "@/components/button";
import SendCode from "@/components/send-code";
import Dialog from "@/components/dialog";
export default {
    name: 'app',
    components: {
      "own-input": Input,
      "own-button": Button,
      "own-send-code": SendCode,
      "own-dialog": Dialog
    },
    data() {
      return {
         value:""
      }
    },
    watch: {

    }
}
</script>

<style>

</style>
