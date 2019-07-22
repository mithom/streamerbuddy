<template>
    <div
        v-if="panelOpen"
        class="bg-gray-300 h-full w-2/5"
    >
        <portal-target
            name="settings"
            :slot-props="{text:'settingsPanel'}"
        />
    </div>
</template>

<script>

export default {
  name: "SettingsSideBar",
  props:{
    panelOpen:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>