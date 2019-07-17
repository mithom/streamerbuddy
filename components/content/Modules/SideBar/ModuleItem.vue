<template>
    <li
        :class="borderClass"
        class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4"
    >
        <slot>Module_Name</slot>
    </li>
</template>

<script>
export default {
  name: 'ModuleItem',
  props:{
    active:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    borderClass(){
      return this.active ? 'border-blue-300 bg-blue-900' : 'border-transparent'
    }
  }
}
</script>

<style scoped>

</style>
