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
const {categories} = require('~/app/enums')

export default {
  name: "SideBar",
  components: {Category},
  data(){
    return {
      categories:[
        {category:'CORE', modules:['test','StreamTimers', 'Alerts','Notifications','LiveTweeter']},
        {category:'UTILITY', modules: ['ApexStats', 'MK11Stats','LoLStats','SekiroStats']},
        {category:'GAMING', modules: ['SC2 Match Info', 'SC2 Scene Switcher','SC2 Betting System','SC2 Replay Renamer']}
      ]
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
