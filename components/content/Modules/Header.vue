<template>
    <div class="flex -mx-2 mb-4">
        <div
            class="flex w-full mx-2 items-center pb-2 border-b-2 border-gray-400"
        >
            <h1 class="text-2xl font-semibold">
                {{ activeModule.name }}
            </h1>
            <svg
                class="fill-current w-5 h-5 ml-8 mr-4 cursor-pointer"
                viewBox="0 0 20 20"
            >
                <path
                    d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
            </svg>
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
        return this.$store.state.moduleState[this.activeModule.fullname]
      },
      set: function(value){
        this.$store.commit('changeModuleState', {module: this.activeModule.fullname, state: value})
      }
    },
    activeModule(){
      return this.$store.state.activeModule || {name:'moduleName', fullname:'moduleNameMod'}
    },
  },
}
</script>

<style scoped>

</style>
