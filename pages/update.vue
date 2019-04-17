<template>
  <div>
    <v-wait for ="downloading">
      <template slot="waiting">
        <h2>downloading</h2>
        <progress min="0" max="100" :value='this.$wait.percent("downloading")' />
      </template>
      <h1>Download Complete</h1>
    </v-wait>
  </div>
</template>

<script>
export default {
  created() {
    this.$wait.start("downloading")
    require('electron').ipcRenderer.on('progress',(event, message)=>{
      if (message <100){
        this.$wait.progress("downloading", message)
      }else{
        this.$wait.progress('downloading', 101)
      }
    })
  },
}



</script>

<style scoped>

</style>