<template>
    <section class="container">
        <div>
            <h1>streamer-buddy</h1>
            <h2>You updated successfully to v4</h2>
            <h2>An assistant for streaming which includes also some modules for specific games.</h2>
            <ul id="modules">
                <li
                    v-for="module in this.$store.state.appModules"
                    :key="module.main.name">
                    {{ module.main.name }}
                    <ul>
                        <li
                            v-for="component in module.components"
                            :key="component.fullname">
                            {{ component.name }}
                        </li>
                    </ul>
                </li>
            </ul>
            <div id="dashboard">
                <component
                    v-for="component in components"
                    :key="'0' + component.fullname"
                    :is="component.fullname">non default text</component>
            </div>
            <a 
                href="https://nuxtjs.org/" 
                target="_blank" 
                class="btn btn-primary">Documentation</a>
            <a 
                href="https://github.com/nuxt/nuxt.js" 
                target="_blank" 
                class="btn btn-primary">GitHub</a>
            <a 
                href="https://electronjs.org/" 
                target="_blank" 
                class="btn btn-secondary">Electron</a>
            <a 
                href="https://github.com/electron-userland/electron-builder" 
                target="_blank" 
                class="btn btn-secondary">Electron
                Builder</a>
        </div>
    </section>
</template>

<script>
export default {
  components: {},
  computed: {
    components() {
      const components = []
      for (const mod of this.$store.state.appModules) {
        if (mod && mod.components) {
          components.push(...mod.components)
        }
      }
      return components
    }
  },
  async fetch({store, params}) {
  },
}

</script>

<style scoped>
    .container {
        min-height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .btn {
        margin: 0 8px;
    }
</style>
