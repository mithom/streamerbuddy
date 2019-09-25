<template>
    <li>
        <component
            :is="disabled ? 'div' : 'n-link'"
            :to="url"
            no-prefetch
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
    },
    url:{
      type: String,
      default: "#",
    }
  }
}
</script>

<style scoped>

</style>
