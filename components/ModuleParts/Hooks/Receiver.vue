<script>
import {moduleName} from "~/app/component-util";

export default {
  name: 'Receiver',
  props:{
    sink:{
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
      moduleName: moduleName(this),
    }
  },
  async created () {
    await this.$store.dispatch('hooks/registerSink', {
      sink: this.sink,
      module: this.moduleName
    })
    this.$watch(function () {
      return this.$store.state.hooks.sinks[this.moduleName][this.sink]
    }, async function(newValue){
      if(newValue.length > 0){
        await Promise.all(newValue.map( async val => {
          await this.cb(val)
        }))
        this.$store.commit('hooks/clearSinkData',{
          sink: this.sink,
          module: this.moduleName
        })
      }
    })
  },
  render (createElement) {
    return createElement()
  }
}
</script>

<style scoped>

</style>
