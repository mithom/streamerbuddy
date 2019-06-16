<template>
    <li>
        <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-200"
        >
            <slot>menu_item</slot>
        </a
        >
    </li>
</template>

<script>
export default {
  name: 'MenuItem'
}
</script>

<style scoped>

</style>
