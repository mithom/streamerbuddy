<template>
    <div class="inline-block px-2 py-4 mx-2 bg-teal-300 shadow-inner rounded-lg">
        <h2 class="font-bold text-xl">
            {{ module }}
        </h2>
        <p>NbComponents: {{ components | count(-1) }}<!-- offset -1 to compensate for module.json --></p>
        <InstallButton
            :install="install"
            :installed="installed"
            :uninstall="uninstall"
        />
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
  computed:{
    installed: function(){
      return (this.$store.state.appModules[this.category] || {}).hasOwnProperty(this.module)
    }
  },
  methods:{
    install(){
      ipcRenderer.send('install-module', {
        category: this.category,
        module: this.module,
        components: this.components,
        authHeaders: this.$store.getters['account/authHeaders']
      })
    },
    uninstall(){
      const moduleInfo = {
        category: this.category,
        module: this.module,
        components: this.components
      };
      this.$store.dispatch('removeModule', {data: moduleInfo, unregisterModule: this.$store.unregisterModule})
      ipcRenderer.send('uninstall-module', moduleInfo)
    }
  }
}
</script>

<style scoped>

</style>
