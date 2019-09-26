<template>
    <li
        :class="borderClass"
        class="py-2 pl-8 pr-4 border-l-4"
    >
        <fa
            icon="hashtag"
            style="padding-right: 5px"
            size="lg"
        />
        <slot>Module_Name</slot>
        <portal
            v-if="loaded"
            to="Modules"
        >
            <Component
                :is="component"
                :key="component"
                :class="{hidden: !active}"
                :component="component"
                :module="module"
            />
        </portal>
    </li>
</template>

<script>
import StorePromote from "../StorePromote";

export default {
  name: 'ModuleItem',
  components:{
    StorePromote
  },
  props:{
    active:{
      type: Boolean,
      default: false
    },
    component:{
      type: String,
      required: true
    },
    module:{
      type: String,
      required: true
    }
  },
  computed:{
    borderClass(){
      return this.active ? 'border-blue-300 bg-blue-800 white-text' : 'hover:bg-blue-900 border-transparent'
    },
    enabled: function(){
      return this.$store.state.moduleState[this.module]
    },
    loaded: function(){
      return this.enabled || this.component === this.$store.getters.activeModule?.fullname
    }
  }
}
</script>

<style scoped>

</style>
