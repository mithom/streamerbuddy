<template>
    <portal to="settings">
        <slot name="before" />
        <slot>
            <Component
                :is="componentType(setting.type)"
                v-for="setting of settings"
                :key="setting.name"
                :default-value="setting.default"
            >
                {{ setting.text }}
                <!-- eslint-disable -->
                <template #tooltip>{{ setting.tooltip }}</template>
                <!-- eslint enable -->
            </Component>
        </slot>
        <slot name="after" />
    </portal>
</template>

<script>
import Integer from './Settings/Integer'
import Number from './Settings/Number'

export default {
  name: "Settings",
  components:{
    Integer,
    Number
  },
  props:{
    settings:{
      type:Array,
      default: ()=>[]
    }
  },
  data(){
    return {
      Integer,
      Number,
    }
  },
  methods:{
    componentType: function (type) {
      return this[type]
    }
  }
}
</script>

<style scoped>

</style>