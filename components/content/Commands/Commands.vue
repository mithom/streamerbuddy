<template>
    <div class="container">
        <template
            v-for="module in allModules"
        >
            <div
                v-if="hasCommands(module.name)"
                :key="module.name"
                class="border-b left-m-4 w-full"
            >
                <div>{{ module.name }}</div>
                <portal-target
                    :multiple="true"
                    :name="`commands-${module.name}`"
                />
            </div>
        </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {Wormhole} from 'portal-vue'

export default {
  name: "Commands",
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters(['allModules']),
  },
  methods:{
    hasCommands: function (moduleName) {
      return Wormhole.hasContentFor(`commands-${moduleName}`)
    }
  }
}
</script>

<style scoped>

</style>
