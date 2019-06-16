<template>
    <div>
        <Header><slot/></Header>
        <ul class="">
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
  }
}
</script>

<style scoped>

</style>
