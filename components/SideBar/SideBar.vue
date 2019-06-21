<template>
    <div class="flex pt-4 w-75 bg-blue-1000 sidebar">
        <div class="flex flex-col text-gray-300 h-full w-full">
            <Category 
                v-for="cat in categories"
                :key="cat.category"
                :modules="cat.modules"
            >
                {{ cat.category }}
            </Category>
        </div>
    </div>
</template>

<script>
import Category from './Category'
import {mapState} from 'vuex'

export default {
  name: "SideBar",
  components: {Category},
  data(){
    return {

    }
  },
  computed: {
    categories(){
      const cats = []
      for(const [cat, modules] of Object.entries(this.$store.state.appModules)){
        cats.push({category: cat, modules: modules})
      }
      return cats
    }
  }
}
</script>

<style scoped>

</style>
