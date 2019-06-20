<template>
    <div
        :class="widthClass"
        class="px-2"
    >
        <div class="bg-white shadow rounded h-32 p-4">
            <slot>{{ widthClass }} column</slot>
        </div>
    </div>
</template>

<script>
import {widthType} from '~/app/enums'

export default {
  name: 'Card',
  props: {
    widthEnum: {
      type: Object,
      default: ()=> widthType.THIRD
    }
  },
  data(){
    return {
      widthType: widthType
    }
  },
  computed:{
    widthClass(){
      switch (this.widthEnum) {
      case this.widthType.THIRD:
        return 'w-1/3'
      case this.widthType.TWO_THIRD:
        return 'w-2/3'
      case this.widthType.HALF:
      default:
        return 'w-1/2'
      }
    }
  },
}
</script>

<style scoped>

</style>
