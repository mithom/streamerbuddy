<script>
import {mapState} from 'vuex'

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
    immediate:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    ...mapState({
      data(state){return state.hooks.hooks[this.module]?.[this.hook]}
    })
  },
  mounted () {
    this.$watch('data', function(newValue, oldValue){
      if(newValue){
        this.cb(newValue, oldValue)
      }
    },{
      immediate: this.immediate
    })
  },
  render (createElement) {
    return createElement()
  }
}
</script>

<style scoped>

</style>
