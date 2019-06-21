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
      return this.$store.state.appModules[0].main.name
    }
  }
}
</script>

<style scoped>

</style>