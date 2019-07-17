<template>
    <p class="font-bold text-sm uppercase text-blue-400 m-2 mt-6 ml-4">
        <svg
            class="fill-current inline w-4 h-4"
            viewBox="0 0 20 20"
        >
            <path
                :style="arrowStyles"
                style="transition: transform 200ms ease-in; transform-origin: center"
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
        </svg>
        <slot>Module_Name</slot>
    </p>
</template>

<script>
export default {
  name: 'Header',
  props:{
    expanded:{
      type: Boolean,
      default: true
    }
  },
  computed:{
    arrowStyles(){
      return this.expanded ? 'transform: rotate(0)' : 'transform: rotate(-90deg)'
    }
  }
}
</script>

<style scoped>

</style>
