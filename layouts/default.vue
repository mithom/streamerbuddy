<template>
    <!-- since we use an SPA, i would not use this -->
    <nuxt />
</template>

<script>
const customTitlebar = require('custom-electron-titlebar');

const titleBar = new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex('#2a4365'),
  titleHorizontalAlignment: "center",
  menuPosition: "left"
});

export default {
  beforeDestroy() {
    titleBar.dispose()
  }
}
</script>