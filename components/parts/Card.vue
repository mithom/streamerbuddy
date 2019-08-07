<template>
    <div
        :class="widthClass"
        class="px-2"
    >
        <div
            class="bg-white shadow rounded h-auto p-4"
            style="min-height: 8rem"
        >
            <slot>{{ widthClass }} column</slot>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Card',
  props: {
    widthEnum: {
      type: String,
      default: ()=> null
    }
  },
  computed:{
    ...mapState('enums', ['widthType'] ),
    widthClass(){
      switch (this.widthEnum) {
      case this.widthType.TWO_THIRD:
        return 'w-2/3'
      case this.widthType.HALF:
        return 'w-1/2'
      case this.widthType.THIRD:
      default:
        return 'w-1/3'
      }
    }
  },
}
</script>

<style scoped>

</style>
