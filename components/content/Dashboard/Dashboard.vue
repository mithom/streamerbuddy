<template>
    <section class="container">
        <div>
            <h1>streamer-buddy</h1>
            <h2>You updated successfully to v0.0.8</h2>
            <h2>An assistant for streaming which includes also some modules for specific games.</h2>
            <div id="dashboard">
                <component
                    :is="component.fullname"
                    v-for="component in components"
                    :key="'0' + component.fullname"
                >
                    non default text
                </component>
            </div>
            <a
                href="https://nuxtjs.org/"
                target="_blank"
                class="btn btn-primary"
            >
                Documentation
            </a>
            <a
                href="https://github.com/nuxt/nuxt.js"
                target="_blank"
                class="btn btn-primary"
            >
                GitHub
            </a>
            <a
                href="https://electronjs.org/"
                target="_blank"
                class="btn btn-secondary"
            >
                Electron
            </a>
            <a
                href="https://github.com/electron-userland/electron-builder"
                target="_blank"
                class="btn btn-secondary"
            >
                Electron Builder
            </a>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  computed: {
    components() {
      const components = []
      for(const modules of Object.values(this.$store.state.appModules)){
        for (const mod of Object.values(modules)){
          if (mod.components && mod.components.length !== 0) {
            components.push(...mod.components)
          }
        }
      }
      return components
    }
  },
  async fetch({store, params}) {
  },
}

</script>

