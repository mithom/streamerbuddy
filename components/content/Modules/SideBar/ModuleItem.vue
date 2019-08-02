<template>
    <li
        :class="borderClass"
        class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4"
    >
        <slot>Module_Name</slot>
        <portal
            v-if="loaded"
            class="hidden"
            to="Modules"
            :disabled="!active"
        >
            <Component
                :is="component"
                :component="component"
            />
        </portal>
    </li>
</template>

<script>
export default {
  name: 'ModuleItem',
  props:{
    active:{
      type: Boolean,
      default: false
    },
    component:{
      type: String,
      required: true
    }
  },
  computed:{
    borderClass(){
      return this.active ? 'border-blue-300 bg-blue-900' : 'border-transparent'
    },
    enabled: function(){
      return this.$store.state.moduleState[this.component]
    },
    loaded: function(){
      return this.enabled || this.component === this.$store.state.activeModule.fullname
    }
  }
}
</script>

<style scoped>

</style>
