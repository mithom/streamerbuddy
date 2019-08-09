<template>
    <div class="flex-none pt-4 w-64 bg-blue-1000 sidebar flex-col text-gray-300">
        <ul v-if="promoteStore">
            <module-item
                :active="activeScreen === 'Modules'"
                :component="'StorePromote'"
            >
                Store Tutorial
            </module-item>
        </ul>
        <Category
            v-for="cat in categories"
            v-else
            :key="cat.category"
            :modules="cat.modules"
        >
            {{ cat.category }}
        </Category>
    </div>
</template>

<script>
import Category from './Category'
import {mapState, mapGetters} from 'vuex'
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
    ...mapGetters(['allModules']),
    categories(){
      const cats = []
      const disabled = []
      for(const [cat, modules] of Object.entries(this.$store.state.appModules)){
        cats.push({
          category: cat,
          modules: Object.values(modules)
            .map(mod=>{return {
              fullname: mod.main.fullname,
              name: mod.main.name,
              module: mod.name,
            }})
            .filter(mod => this.$store.state.moduleState[mod.module])
        })
      }
      cats.push({
        category: "Disabled",
        modules: this.allModules
          .map(mod=>{return {
            fullname: mod.main.fullname,
            name: mod.main.name,
            module: mod.name,
          }})
          .flat()
          .filter(mod => !this.$store.state.moduleState[mod.module])
      })
      return cats.filter(cat=> cat.modules.length > 0)
    },
    promoteStore(){
      return this.$store.state.activeModule === null
    }
  }
}
</script>

<style scoped>

</style>
