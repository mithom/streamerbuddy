<template>
    <div class="flex pt-4 w-75 bg-blue-1000 sidebar">
        <div class="flex flex-col text-gray-300 h-full w-full">
            <Category :modules="['StreamTimers', 'Alerts','Notifications','LiveTweeter']">
                Modules - Categorie #1
            </Category>
            <Category :modules="['ApexStats (active)', 'MK11Stats','LoLStats','SekiroStats']">
                Modules - Categorie #2
            </Category>
            <Category :modules="['SC2 Match Info', 'SC2 Scene Switcher','SC2 Betting System','SC2 Replay Renamer']">
                StarCraft 2 - Categorie #3
            </Category>
        </div>
    </div>
</template>

<script>
import Category from './SideBar/Category'
export default {
  name: "SideBar",
  components: {Category}
}
</script>

<style scoped>

</style>
