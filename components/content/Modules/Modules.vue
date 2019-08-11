<template>
    <div class="flex flex-grow h-full">
        <SideBar />
        <div :class="contentClass">
            <Header v-if="component" />
            <portal-target
                name="Modules"
                :multiple="true"
            />
        </div>
        <portal-target
            name="settingsPanel"
            :slim="true"
            :multiple="false"
        />
    </div>
</template>

<script>
import Header from "./Header";
import SideBar from "./SideBar/SideBar";
import {mapState} from 'vuex'

export default {
  name: "Modules",
  components: {SideBar, Header},
  data(){
    return {
      contentClass: "w-full px-2 py-4 text-blue-1000 overflow-y-auto",
    }
  },
  computed:{
    ...mapState([
      'activeScreen',
    ]),
    component(){
      return this.$store.state.activeModule?.fullname
    },
  }
}
</script>

<style scoped>

</style>
