<template>
  <div>
    <h1>Progress:</h1>
    <v-wait for ="downloading">
      <template slot="waiting">
        <h1>downloading</h1>
        <span>progress: {$store.state.progress}</span>
      </template>
      <h1>Download Complete</h1>
    </v-wait>
  </div>
</template>

<script>

import VWait from "vue-wait/src/components/v-wait";

$wait.start("downloading")
export default {
	components: {VWait},
	created() {
		this.updateProgress();
	},
	methods:{
		async updateProgress(){
			$wait.progress('downloading', $store.state.progress)
		}
	},
}

</script>

<style scoped>

</style>