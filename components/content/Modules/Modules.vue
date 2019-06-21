<template>
    <div>
        <Header />
        <Component :is="component" />
    </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "Modules",
  components: {Header},
  computed:{
    component(){
      return this.$store.state.activeModule.main.name
    }
  }
}
</script>

<style scoped>

</style>