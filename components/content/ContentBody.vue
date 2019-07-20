<template>
    <div class="w-4/5 px-2 py-4 text-blue-1000 vld-parent">
        <!-- Content: Header -->
        <Component :is="activeScreen" />
        <!-- Content: SettingsPanel -->
    </div>
</template>

<script>
import Dashboard from "./Dashboard/Dashboard"
import Modules from "./Modules/Modules"

export default {
  name: "ContentBody",
  components: {
    Dashboard,
    Modules,
  },
}
</script>

<style scoped>

</style>
