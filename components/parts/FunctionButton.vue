<template>
    <button
        class="leading-snug bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 shadow-md uppercase font-semibold rounded-lg ml-4"
        @click.prevent="func"
    >
        <slot>
            {{ text }}
        </slot>
    </button>
</template>

<script>
export default {
  name: 'FunctionButton',
  props:{
    func:{
      type: Function,
      required: true,
    },
    text:{
      type: String,
      default: "buttonText"
    }
  }
}
</script>

<style scoped>

</style>
