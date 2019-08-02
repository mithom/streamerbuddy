<template>
    <InstallButton
        v-if="settingsAvailable"
        :installed="moduleSettingsOpen"
        :install="toggleModuleSettingsOpen"
        :uninstall="toggleModuleSettingsOpen"
    >
        Settings
        <portal to="settingsPanel">
            <SettingsSideBar v-if="moduleSettingsOpen" />
        </portal>
    </InstallButton>
</template>

<script>
import InstallButton from "../../parts/InstallButton";
import SettingsSideBar from "./SettingsSideBar";
import {Wormhole} from 'portal-vue'

export default {
  name: "SettingsButton",
  components:{
    InstallButton,
    SettingsSideBar
  },
  data(){
    return {
      moduleSettingsOpen: false
    }
  },
  computed:{
    settingsAvailable(){
      return Wormhole.hasContentFor('settings')
    },
  },
  methods:{
    toggleModuleSettingsOpen: function () {
      this.moduleSettingsOpen = !this.moduleSettingsOpen
    }
  },
}
</script>

<style scoped>

</style>