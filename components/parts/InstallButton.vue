<template>
    <button
        class="rounded-lg bg-blue-300 px-2 py-1 mt-2 border-2 border-blue-600 hover:bg-blue-500"
    >
        Install
    </button>
</template>

<script>
export default {
  name: "InstallButton"
}
</script>

<style scoped>
    button{
        transition: box-shadow 0.1s;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.75)
    }
    button:active{
        transform: translateY(2px);
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.75);
    }
</style>