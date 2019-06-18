<template>
    <div class="flex pt-4 w-75 bg-blue-1000 sidebar">
        <div class="flex flex-col text-gray-300 h-full w-full">
            <Category
                :active-module.sync="activeModule"
                :modules="['StreamTimers', 'Alerts','Notifications','LiveTweeter']">
                Modules - Categorie #1
            </Category>
            <Category
                :active-module.sync="activeModule"
                :modules="['ApexStats (active)', 'MK11Stats','LoLStats','SekiroStats']">
                Modules - Categorie #2
            </Category>
            <Category
                :active-module.sync="activeModule"
                :modules="['SC2 Match Info', 'SC2 Scene Switcher','SC2 Betting System','SC2 Replay Renamer']">
                StarCraft 2 - Categorie #3
            </Category>
        </div>
    </div>
</template>

<script>
import Category from './Category'
const {categories} = require('~/app/enums')

export default {
  name: "SideBar",
  components: {Category},
  props:{
    isSelected:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      lastActive: null,
      modules:{
        'CORE':['StreamTimers', 'Alerts','Notifications','LiveTweeter'],
        'UTILITY': ['ApexStats (active)', 'MK11Stats','LoLStats','SekiroStats'],
        'GAMING': ['SC2 Match Info', 'SC2 Scene Switcher','SC2 Betting System','SC2 Replay Renamer']
      }
    }
  },
  computed: {
    activeModule: {
      get: function () {
        if(this.isSelected){
          if(this.lastActive){
            return this.lastActive
          }else{
            console.log(this.moduleCount)
            if(this.moduleCount === 0){
              return 'GOTO-STORE'
            }else{
              return this.firstModule
            }
          }
        } else {
          return null
        }
      },
      set: function (newValue) {
        this.$emit('update:isSelected', true)
        this.lastActive = newValue
      }
    },
    moduleCount(){
      return categories.enums.reduce((prev, cat)=>{
        return prev +this. modules[cat.key].length
      },0)
    },
    firstModule(){
      return this.modules[categories.enums.filter((cat)=>Object.keys(this.modules[cat.key]).length !== 0)[0].key][0]
    }
  }
}
</script>

<style scoped>

</style>
