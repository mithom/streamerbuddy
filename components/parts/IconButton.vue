<template>
    <div class="relative p-3 mr-1">
        <Zondicon
            :icon="icon"
            class="fill-current text-white w-5 h-5 opacity-75 hover:opacity-100"
        />
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
    icon:{
      type: String,
      required: true
    },
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
