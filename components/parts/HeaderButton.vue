<template>
    <li>
        <a
            :class="activeClass"
            href="#"
            class="block px-4 py-4 border-b-4 hover:bg-blue-800"
        ><slot /></a>
    </li>
</template>

<script>
export default {
  name: 'HeaderButton',
  props:{
    active:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    activeClass(){
      return this.active ? 'bg-blue-800 border-blue-400' : 'border-transparent'
    }
  }
}
</script>

<style scoped>

</style>
