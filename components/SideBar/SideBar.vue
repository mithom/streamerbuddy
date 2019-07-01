<template>
    <div class="flex pt-4 w-75 bg-blue-1000 sidebar">
        <div class="flex flex-col text-gray-300 h-full w-full">
            <div v-if="promoteStore">
                <ul>
                    <module-item :active="activeScreen === 'Modules'">
                        Store Tutorial
                    </module-item>
                </ul>
            </div>
            <div v-else>
                <Category
                    v-for="cat in categories"
                    :key="cat.category"
                    :modules="cat.modules"
                >
                    {{ cat.category }}
                </Category>
            </div>
        </div>
    </div>
</template>

<script>
import Category from './Category'
import {mapState} from 'vuex'
import ModuleItem from "./ModuleItem";

export default {
  name: "SideBar",
  components: {ModuleItem, Category},
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['activeScreen']),
    categories(){
      const cats = []
      const disabled = []
      for(const [cat, modules] of Object.entries(this.$store.state.appModules)){
        cats.push({
          category: cat,
          modules: modules
            .map(mod => mod.main.name)
            .filter(name => this.$store.state.moduleState[name])
        })
      }
      cats.push({
        category: "Disabled",
        modules: Array.prototype.concat(Object.values(this.$store.state.appModules).flat())
          .map(mod => mod.main.name)
          .filter(name => !this.$store.state.moduleState[name])
      })
      return cats
    },
    promoteStore(){
      return this.$store.state.activeModule === null
    }
  }
}
</script>

<style scoped>

</style>
