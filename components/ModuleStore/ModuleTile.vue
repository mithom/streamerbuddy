<template>
    <div class="inline-block px-2 py-4 mx-2 bg-gray-200 shadow-inner rounded-lg">
        <h2 class="font-bold text-xl">
            {{ module }}
        </h2>
        <p>NbComponents: {{ components | count(-1) }}<!-- offset -1 to compensate for module.json --></p>
        <InstallButton
            @click.native="install"
        >
            Install
        </InstallButton>
    </div>
</template>

<script>
import InstallButton from "../parts/InstallButton";
import { ipcRenderer } from 'electron'

export default {
  name: "ModuleTile",
  components: {InstallButton},
  props:{
    module:{
      type: String,
      default: "moduleName"
    },
    category:{
      type: String,
      default: "categoryName"
    },
    components:{
      type: Array,
      default: ()=>[]
    }
  },
  methods:{
    install(){
      ipcRenderer.send('install-module', this.components)
    }
  }
}
</script>

<style scoped>

</style>