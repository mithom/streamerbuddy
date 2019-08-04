<template>
    <div>
        <template v-for="[name, setting] of Object.entries(settings)">
            <Component
                :is="componentType(setting.type)"
                :key="name"
                :value="getValue(name)"
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
  methods:{
    componentType: function (type) {
      return this.types[type]
    },
    parseText: function(setting, props){
      return Object.keys(props).reduce((str, key)=> str.replace(new RegExp(`\{${key}\}`, 'g'), props[key]), setting.text)
    },
    getValue: function(name){
      return this.value[name] || this.settings[name].default
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