<script>
import {componentName} from "~/app/component-util";

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
  data(){
    return {
      componentName: componentName(this)
    }
  },
  async created () {
    await this.$store.dispatch('hooks/registerHook', {
      hook: this.hook,
      module: this.componentName
    })
    for await (const data of this.generator()){
      this.$store.commit('hooks/updateData',{
        hook: this.hook,
        module: this.componentName,
        newData: data,
      })
    }
  },
  render (createElement) {
    return createElement()
  }
}
</script>

<style scoped>

</style>
