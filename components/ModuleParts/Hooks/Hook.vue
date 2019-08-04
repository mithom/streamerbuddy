<script>
import {componentName} from '~/app/component-util'

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
  data(){
    return {
      componentName: componentName(this)
    }
  },
  created () {
    this.$watch(function () {
      return this.$store.state.hooks.hooks[this.componentName][this.hook]
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
