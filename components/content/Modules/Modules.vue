<template>
    <div v-if="promoteStore">
        <StorePromote />
    </div>
    <div v-else>
        <Header />
        <Component :is="component" />
    </div>
</template>

<script>
import Header from "./Header";
import StorePromote from "./StorePromote";
import {mapState} from 'vuex'

export default {
  name: "Modules",
  components: {StorePromote, Header},
  computed:{
    component(){
      return this.$store.state.activeModule
    },
    promoteStore(){
      return this.$store.state.activeModule === null
    }
  }
}
</script>

<style scoped>

</style>