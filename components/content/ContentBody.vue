<template>
    <div class="w-4/5 p-4 text-blue-1000 -mx-2">
        <!-- Content: Header -->
        <Component :is="activeScreen" />
        <!-- Content: Sub Header -->
    </div>
</template>

<script>
import Dashboard from "./Dashboard/Dashboard"
import Modules from "./Modules/Modules"
import {mapState} from 'vuex'

export default {
  name: "ContentBody",
  components: {
    Dashboard,
    Modules
  },
  computed:{
    ...mapState(['activeScreen'])
  }
}
</script>

<style scoped>

</style>
