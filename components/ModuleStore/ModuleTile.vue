<template>
    <div class="inline-block px-2 py-4 mx-2 bg-gray-200 shadow-inner rounded-lg">
        <h2 class="font-bold text-xl">
            {{ module }}
        </h2>
        <p>Nb component: {{ components | count }}</p>
        <InstallButton>
            Install
        </InstallButton>
    </div>
</template>

<script>
import InstallButton from "../parts/InstallButton";
export default {
  name: "ModuleTile",
  components: {InstallButton},
  props:{
    module:{
      type: String,
      default: "moduleName"
    },
    components:{
      type: Array,
      default: ()=>[]
    }
  }
}
</script>

<style scoped>

</style>