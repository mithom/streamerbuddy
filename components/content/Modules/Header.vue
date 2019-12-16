<template>
    <div class="flex -mx-2 mb-4">
        <div
            class="flex w-full mx-2 items-center pb-2 border-b-2 border-gray-400"
        >
            <h1 class="text-2xl font-semibold">
                {{ activeModule | pluck('name') }}
            </h1>
            <Zondicon
                icon="cog"
                class="fill-current w-5 h-5 ml-8 mr-4 cursor-pointer"
            />
            <ToggleButton
                :is-toggled-on.sync="enabled"
                :clickable-text="true"
                on-text="enabled"
                off-text="disabled"
            />
            <InstallButton>
                ReadMe
            </InstallButton>
            <SettingsButton />
        </div>
    </div>
</template>

<script>
import InstallButton from '~/components/parts/InstallButton'
import SettingsButton from "./SettingsButton";

export default {
  name: 'Header',
  components: {
    SettingsButton,
    InstallButton
  },
  computed:{
    enabled: {
      get: function(){
        return this.$store.state.moduleState[this.activeModule?.module]
      },
      set: function(value){
        this.$store.commit('changeModuleState', {module: this.activeModule.module, state: value})
      }
    },
    activeModule(){
      return this.$store.getters.activeModule
    },
  },
}
</script>

<style scoped>

</style>
