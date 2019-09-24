<template>
    <div class="container">
        <template
            v-for="module in allModules"
        >
            <div
                v-if="hasCommands(module.fullname)"
                :key="module.fullname"
                class="border-b left-m-4 w-full"
            >
                <div>{{ module.name }}</div>
                <portal-target
                    :multiple="true"
                    :name="`commands-${module.fullname}`"
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
    hasCommands: function (moduleFullName) {
      return Wormhole.hasContentFor(`commands-${moduleFullName}`)
    }
  }
}
</script>

<style scoped>

</style>
