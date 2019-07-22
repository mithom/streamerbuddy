<template>
    <SettingsItem>
        <slot />
        <template #tooltip>
            <slot name="tooltip" />
        </template>
    </SettingsItem>
</template>

<script>
import SettingsItem from './SettingsItem'

export default {
  name: "Integer",
  components:{
    SettingsItem
  }
}
</script>

<style scoped>

</style>