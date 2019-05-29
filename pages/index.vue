<template>
	<section class="container">
		<div>
			<h1>streamer-buddy</h1>
			<h2>You updated successfully to v4</h2>
			<h2>An assistant for streaming which includes also some modules for specific games.</h2>
			<ul id="modules">
				<li v-for="module in this.$store.state.appModules" v-bind:key="module.main.name">
					{{module.main.name}}
                    <ul>
                        <li v-for="component in module.components" v-bind:key="component.fullname">
                            {{component.name}}
                        </li>
                    </ul>

				</li>
			</ul>
            <div id="dashboard">
                <Row v-for="component in components" v-bind:key="component.fullname" :row="component"></Row>
<!--                <v-runtime-template :template="components[0].template"></v-runtime-template>-->
            </div>
			<a href="https://nuxtjs.org/" target="_blank" class="btn btn-primary">Documentation</a>
			<a href="https://github.com/nuxt/nuxt.js" target="_blank" class="btn btn-primary">GitHub</a>
			<a href="https://electronjs.org/" target="_blank" class="btn btn-secondary">Electron</a>
			<a href="https://github.com/electron-userland/electron-builder" target="_blank" class="btn btn-secondary">Electron Builder</a>
		</div>
	</section>
</template>

<script>
import path from 'path'
import {promises as fs} from 'fs'

export default {
  async fetch({store, params}){
    await Promise.all(store.state.appModules.map(async (mod,i)=>{
      await Promise.all(mod.components.map(async (comp,j)=>{
        let data = await fs.readFile(comp.path, {encoding: 'UTF-8'})
        let payload = {
          mod_index: i,
          comp_index: j,
          template: data
        }
        store.commit('addTemplate', payload)
      }))
    }))
  },
  computed: {
    components(){
      const components = []
      console.log(this.$store.state.appModules)
      for( const mod of this.$store.state.appModules){
        console.log(mod)
        if(mod && mod.components){
          components.push(...mod.components)
        }
      }
      return components
    }
  },
  components: {
    Row: {
      props: ['row'],
      template: '<v-runtime-template :template="row.template"></v-runtime-template>'
    }
  }
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
