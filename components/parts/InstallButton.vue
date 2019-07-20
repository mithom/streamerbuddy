<template>
    <button
        class="leading-snug bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 shadow-md uppercase font-semibold rounded-lg ml-4"
        @click="onClick"
    >
        <slot>
            {{ text }}
        </slot>
    </button>
</template>

<script>

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
