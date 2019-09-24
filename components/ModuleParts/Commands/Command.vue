<template>
    <portal
        :to="`commands-${componentName}`"
    >
        <div class="w-full h-8 odd:bg-gray-500 even:bg-gray-300">
            test
        </div>
    </portal>
    <String
    />
</template>

<script>
import {componentName} from "~/app/component-util";

export default {
  name: 'Command',
  props:{
    name:{
      type: String,
      required: true,
    },
    command:{
      type: String,
      required: true,
    },
    userCoolDown:{
      type: Number,
      default: 0,
    },
    globalCoolDown:{
      type: Number,
      default: 0,
    },
    enableUserCoolDown:{
      type: Boolean,
      default: true,
    },
    enableGlobalCoolDown:{
      type: Boolean,
      default: true,
    },
    editCommand:{
      type: Boolean,
      default: true,
    },
    editUserCoolDown:{
      type: Boolean,
      default: true,
    },
    editGlobalCoolDown:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      componentName: componentName(this)
    }
  },
}
</script>

<style scoped>

</style>
