<template>
    <div>
        <Header @click.native="opened = !opened" ><slot/></Header>
        <ul 
            v-if="opened"
        >
            <module-item
                v-for="module of modules"
                :key="module">{{ module }}
            </module-item>
        </ul>
    </div>
</template>

<script>
import Header from './Header'
import ModuleItem from './ModuleItem'

export default {
  name: 'Category',
  components:{
    ModuleItem,
    Header
  },
  props:{
    modules:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return {
      opened: true
    }
  }
}
</script>

<style scoped>

</style>
