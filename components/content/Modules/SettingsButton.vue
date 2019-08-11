<template>
    <FunctionButton
        v-if="settingsAvailable"
        :func="toggleModuleSettingsOpen"
    >
        Settings
        <portal to="settingsPanel">
            <SettingsSideBar v-if="moduleSettingsOpen" />
        </portal>
    </FunctionButton>
</template>

<script>
import SettingsSideBar from "./SettingsSideBar";
import {Wormhole} from 'portal-vue'
import FunctionButton from '../../parts/FunctionButton'

export default {
  name: "SettingsButton",
  components:{
    FunctionButton,
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
