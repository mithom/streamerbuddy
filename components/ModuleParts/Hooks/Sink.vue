<script>
export default {
  name: 'Sink',
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
      required: true
    },
  },
  data(){
    return {
      cancel: null
    }
  },
  async created () {
    // noinspection ES6MissingAwait
    let cancel, cancelled = new Promise(resolve => cancel = resolve);
    this.cancel = cancel

    await new Promise(async (resolve)=>{
      let stop = false
      // noinspection ES6MissingAwait
      cancelled.then(()=>{stop = true})
      for await (const data of this.generator()){
        if(stop) break
        this.$store.commit('hooks/updateSinkData',{
          sink: this.sink,
          module: this.module,
          newData: data,
        })
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
