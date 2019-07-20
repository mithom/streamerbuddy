<template>
    <div class="flex flex-grow">
        <SideBar />
        <div
            v-if="promoteStore"
            :class="contentClass"
        >
            <StorePromote />
        </div>
        <div
            v-else
            :class="contentClass"
        >
            <Header />
            <Component
                :is="component"
                class=""
            />
        </div>
        <portal to="settings">
            <p> i am content for a setting </p>
        </portal>
        <div
            v-if="moduleSettingsOpen"
            class="bg-gray-300 h-full w-2/5"
        >
            <portal-target name="settings" />
        </div>
    </div>
</template>

<script>
import Header from "./Header";
import StorePromote from "./StorePromote";
import SideBar from "./SideBar/SideBar";
import {mapState} from 'vuex'

export default {
  name: "Modules",
  components: {SideBar, StorePromote, Header},
  data(){
    return {
      contentClass: "w-4/5 px-2 py-4 text-blue-1000",
    }
  },
  computed:{
    ...mapState([
      'activeScreen',
      'moduleSettingsOpen'
    ]),
    component(){
      return this.$store.state.activeModule.fullname
    },
    promoteStore(){
      return this.$store.state.activeModule === null
    }
  }
}
</script>

<style scoped>

</style>
