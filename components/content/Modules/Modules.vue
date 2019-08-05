<template>
    <div class="flex flex-grow">
        <SideBar />
        <div
            :class="contentClass"
        >
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
import StorePromote from "./StorePromote";
import SideBar from "./SideBar/SideBar";
import {mapState} from 'vuex'

export default {
  name: "Modules",
  components: {SideBar, Header},
  data(){
    return {
      contentClass: "w-4/5 px-2 py-4 text-blue-1000",
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
