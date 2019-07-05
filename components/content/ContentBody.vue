<template>
    <div class="w-4/5 px-2 py-4 text-blue-1000 vld-parent">
        <!-- Content: Header -->
        <Component :is="activeScreen" />
        <!-- Content: Sub Header -->
        <loading
            :active="isLoading"
            :can-cancel="false"
            :is-full-page="false"
            :height="100"
            :width="100"
            :opacity="0.7"
            background-color="#cbd5e0"
        >
            <Mikepad />
        </loading>
    </div>
</template>

<script>
import Dashboard from "./Dashboard/Dashboard"
import Modules from "./Modules/Modules"
import {mapState} from 'vuex'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Mikepad from '../parts/Mikepad'

export default {
  name: "ContentBody",
  components: {
    Dashboard,
    Modules,
    Loading,
    Mikepad
  },
  computed:{
    ...mapState(['activeScreen']),
    isLoading(){
      return this.$store.state.moduleStore.isLoading
    }
  }
}
</script>

<style scoped>

</style>
