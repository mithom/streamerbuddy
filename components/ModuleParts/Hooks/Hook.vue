<script>

export default {
  name: 'Hook',
  props:{
    hook:{
      type: String,
      required: true
    },
    module:{
      type: String,
      required: true
    },
    cb:{
      type: Function,
      required: true
    },
  },
  created () {
    this.$watch(function () {
      return this.$store.state.hooks.hooks[this.module][this.hook]
    }, function(newValue, oldValue){
      this.cb(newValue, oldValue)
    })
  },
  render (createElement) {
    return createElement()
  }
}
</script>

<style scoped>

</style>
