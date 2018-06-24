<template lang="html">
  <div>
    <editor-bar v-model="editor.info" :isClear="isClear"></editor-bar>
  </div>
</template>

<script>

import EditorBar from './WangEditor'
export default {
  data () {
    return {
      editor: {
        info: ''
      },
      isClear: false
    }
  },
  created(){
    console.log(this.editor.info,'jj')
  },
  components: {
    EditorBar
  }
}
</script>