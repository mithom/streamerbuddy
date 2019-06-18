<template>
    <div class="flex -mx-2 mb-4">
        <div
            class="flex w-full mx-2 items-center pb-2 border-b-2 border-gray-400"
        >
            <h1 class="text-2xl font-semibold">{{ name }}</h1>
            <svg
                class="fill-current w-5 h-5 ml-8 mr-4 cursor-pointer"
                viewBox="0 0 20 20"
            >
                <path
                    d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
            </svg>
            <ToggleButton
                :is-toggled-on.sync="enabled"
                on-text="enabled" 
                off-text="disabled"/>
            <button
                class="leading-snug bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 shadow-md uppercase font-semibold rounded-lg ml-4"
            >
                Publish
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data(){
    return {
      name: "StreamTimers",
      enabled: true
    }
  }
}
</script>

<style scoped>

</style>
