<template>
    <portal
        :to="`commands-${moduleName}`"
    >
        <div class="w-full h-12 odd:bg-gray-500 even:bg-gray-300 flex flex-row justify-between items-center">
            <p>{{ name }}</p>
            <String
                v-show="edit"
                :in-place="true"
                :value="command"
                :name="`${moduleName}-Command-${name}-Name`"
                :default-value="`!${name}`"
                :component="componentName"
                :module="moduleName"
                @input="$emit('update:command', $event)"
            />
            <p
                v-show="!edit"
            >
                {{ command }}
            </p>
            <FunctionButton
                @func="edit = !edit"
            >
                {{ edit ? 'Save' : 'Edit' }}
            </FunctionButton>
        </div>
    </portal>
</template>

<script>
import {moduleName, componentName} from "~/app/component-util";
import FunctionButton from '../../parts/FunctionButton'

export default {
  name: 'Command',
  components: {FunctionButton},
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
      moduleName: moduleName(this),
      componentName: componentName(this),
      edit: false,
    }
  },
}
</script>

<style scoped>

</style>
