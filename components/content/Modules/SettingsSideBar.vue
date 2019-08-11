<template>
    <div
        class="bg-gray-300 h-full w-2/5 overflow-y-auto"
    >
        <portal-target
            name="settings"
            :multiple="true"
            :slot-props="{text:'settingsPanel'}"
        />
    </div>
</template>

<script>

export default {
  name: "SettingsSideBar"
}
</script>

<style scoped>

</style>