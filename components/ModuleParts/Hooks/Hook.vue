<template />

<script>
export default {
  name: 'Hook',
  props:{
    hook:{
      type: String,
      required: true
    },
    cb:{
      type: Function,
      required: true
    }
  },
  computed:{
    hookValue: function(){
      return this.$store.state.hooks.hooks[this.hook]
    }
  },
  created () {
    this.$watch(this.hookValue, function(newValue, oldValue){
      this.cb(newValue, oldValue)
    })
  },
  beforeDestroy () {

  }
}
</script>

<style scoped>

</style>
