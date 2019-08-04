<template />

<script>
export default {
  name: 'Provider',
  props:{
    hook:{
      type: String,
      required: true
    },
    generator:{
      type: Function,
      required: true
    }
  },
  async created () {
    this.$store.commit('hooks/registerHook', this.hook)
    for await (const data of this.generator()){
      this.$store.commit('hooks/updateData',{
        hook: this.hook,
        newData: data,
      })
    }
  },
}
</script>

<style scoped>

</style>
