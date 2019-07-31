<template>
    <div>
        <template v-for="[name, setting] of Object.entries(settings)">
            <Component
                :is="componentType(setting.type)"
                :key="name"
                :value="value[name] || setting.default"
                :name="name"
                :default-value="setting.default"
                @input="setVal(name, $event)"
            >
                <template #default="props">
                    {{ parseText(setting, props) }}
                </template>
                <!-- eslint-disable -->
                <template #tooltip>{{ setting.tooltip }}</template>
                <!-- eslint enable -->
            </Component>
        </template>
    </div>
</template>

<script>
import {componentName} from "~/app/component-util";

export default {
  name: "Settings",
  model: {
    prop: 'value',
    event: 'input'
  },
  props:{
    settings:{
      type: Object,
      required: true,
      validator: value =>{
        return Object.values(value).every(setting => ['type','default','text','tooltip'].every(key=> key in setting))
      }
    },
    value:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      data: {},
      types:{
        Integer: 'Integer',
        Number: 'Number',
        String: 'String',
        Boolean: 'Boolean',
        Button: 'SButton',
        ColorPicker: 'ColorPicker',
        Range: 'Range',
        SelectBox: 'SelectBox'
      }
    }
  },
  mounted(){
    this.$emit('input', this.value)
  },
  methods:{
    componentType: function (type) {
      return this.types[type]
    },
    parseText: function(setting, props){
      return Object.keys(props).reduce((str, key)=> str.replace(new RegExp(`\{${key}\}`, 'g'), props[key]), setting.text)
    },
    setVal(name, val){
      this.value[name] = val
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped>

</style>