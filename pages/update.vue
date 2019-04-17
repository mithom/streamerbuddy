<template>
  <div>
    <h1>Progress:</h1>
    <v-wait for ="downloading">
      <template slot="waiting">
        <h2>downloading</h2>
        <span>progress: {{this.$store.state.progress}}</span>
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
        this.$store.commit('updateProgress', message)
      }else{
        this.$store.commit('updateProgress', 101)
        this.$wait.end("downloading")
      }

    })
  },
}



</script>

<style scoped>

</style>