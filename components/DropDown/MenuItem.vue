<template>
    <li>
        <component
            :is="disabled ? 'div' : 'a'"
            href="#"
            class="block px-4 py-2"
            :class="{'bg-gray-400': disabled, 'hover:bg-gray-200':!disabled}"
        >
            <slot>menu_item</slot>
        </component>
    </li>
</template>

<script>
export default {
  name: 'MenuItem',
  props:{
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>

</style>
