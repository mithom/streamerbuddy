<template>
    <button
        class="rounded-lg bg-blue-300 px-2 py-1 mt-2 border-2 border-blue-600 hover:bg-blue-500"
        @click="onClick"
    >
        {{ text }}
    </button>
</template>

<script>
import {ipcRenderer} from 'electron'

export default {
  name: "InstallButton",
  props:{
    install:{
      type: Function,
      default: ()=>{}
    },
    uninstall:{
      type: Function,
      default: ()=>{}
    },
    installed:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      installing: false
    }
  },
  computed:{
    text: function(){
      if(this.installed){
        return this.installing ? 'Removing' : 'Remove'
      }else{
        return this.installing ? 'Installing' : 'Install'
      }
    },
  },
  watch:{
    installed: function(newVal, oldVal){
      if (newVal !== oldVal){
        this.installing = false
      }
    }
  },
  methods:{
    onClick(){
      if(!this.installing){
        this.installing = true
        if(this.installed){
          this.uninstall()
        }else{
          this.install()
        }
      }
    },
  }
}
</script>

<style scoped>
    button{
        transition: box-shadow 0.1s;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.75)
    }
    button:active{
        transform: translateY(2px);
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.75);
    }
</style>