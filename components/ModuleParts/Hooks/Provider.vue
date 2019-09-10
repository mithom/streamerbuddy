<script>
import {moduleName} from "~/app/component-util";

export default {
  name: 'Provider',
  model:{
    prop: 'value',
    event: 'change',
  },
  props:{
    hook:{
      type: String,
      required: true
    },
    generator:{
      type: Function,
      default: null,
    },
    value:{
      type: [String, Number, Object, Boolean, Array],
      default: null,
    },
  },
  data(){
    return {
      moduleName: moduleName(this),
      cancel: null
    }
  },
  watch:{
    value: function (val) {
      if(val !== null){
        this.$store.commit('hooks/updateHookData',{
          hook: this.hook,
          module: this.moduleName,
          newData: val,
        })
        this.$emit('change', null)
      }
    },
  },
  async created () {
    // noinspection ES6MissingAwait
    if(this.generator){
      let cancel, cancelled = new Promise(resolve => cancel = resolve);
      this.cancel = cancel

      await new Promise((resolve)=>{
        let stop = false
        cancelled.then(()=>{stop = true})
        this.$store.dispatch('hooks/registerHook', {
          hook: this.hook,
          module: this.moduleName
        }).then(async ()=>{
          for await (const data of this.generator()){
            if(stop) break
            this.$store.commit('hooks/updateHookData',{
              hook: this.hook,
              module: this.moduleName,
              newData: data,
            })
          }
        }).then(()=> resolve())
      })
    }
  },
  beforeDestroy(){
    if(this.cancel) this.cancel()
  },
  render (createElement) {
    return createElement()
  }
}
</script>

<style scoped>

</style>
