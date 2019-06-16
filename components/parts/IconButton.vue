<template>
    <div class="relative p-3 mr-1">
        <svg
            class="fill-current text-white w-5 h-5 hover-opacity"
            viewBox="0 0 20 20"
        >
            <slot>
                <path
                    d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
                />
            </slot>
        </svg>
        <div
            v-if="showNotifications"
            class="absolute top-0 right-0 -mr-2 rounded-lg w-6 h-6 text-center leading-snug border-2 border-blue-700 bg-blue-1000 text-sm text-white"
        >
            {{ nbNotifications }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'IconButton',
  props:{
    notifications:{
      type: Boolean,
      default: false
    },
    nbNotifications:{
      type: Number,
      default: null
    }
  },
  computed:{
    showNotifications(){
      return this.notifications && this.nbNotifications > 0
    }
  }
}
</script>

<style scoped>

</style>
