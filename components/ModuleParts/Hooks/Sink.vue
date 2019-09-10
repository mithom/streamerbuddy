<script>
export default {
  name: 'Sink',
  model:{
    prop: 'value',
    event: 'change',
  },
  props:{
    sink:{
      type: String,
      required: true
    },
    module:{
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
      cancel: null,
    }
  },
  watch:{
    value: function (val) {
      if(val !== null){
        this.$store.commit('hooks/updateSinkData',{
          sink: this.sink,
          module: this.module,
          newData: val,
        })
        this.$emit('change', null)
      }
    },
  },
  async created () {
    // noinspection ES6MissingAwait
    let cancelled = new Promise(resolve => this.cancel = resolve);

    await new Promise(async (resolve)=>{
      let stop = false
      // noinspection ES6MissingAwait
      cancelled.then(()=>{stop = true})
      if(this.generator !== null){
        for await (const data of this.generator()){
          if(stop) break
          this.$store.commit('hooks/updateSinkData',{
            sink: this.sink,
            module: this.module,
            newData: data,
          })
        }
      }
    }).then(()=> resolve())
  },
  beforeDestroy(){
    this.cancel()
  },
  render (createElement) {
    return createElement()
  }
}
</script>

<style scoped>

</style>
