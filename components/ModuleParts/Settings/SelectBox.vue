<template>
    <SettingsItem
        v-bind="$attrs"
        :name="name"
        :default-value="defaultValue"
    >
        <template #default>
            <label>
                <slot :value="options[value]" />
                <select
                    :value="storeValue"
                    :placeholder="defaultValue"
                    @change="setSetting($event.target.value)"
                >
                    <option
                        v-for="option in options"
                        :key="option"
                        :value="option"
                    >
                        <slot
                            name="option"
                            :value="option"
                        >
                            {{ option }}
                        </slot>
                    </option>
                </select>
            </label>
        </template>
        <template #tooltip>
            <slot name="tooltip" />
        </template>
    </SettingsItem>
</template>

<script>
import SettingsItem from './SettingsItem'
import {mapMutations} from 'vuex'
import {componentName} from "~/app/component-util";

export default {
  name: "SelectBox",
  components:{
    SettingsItem
  },
  model:{
    prop: 'value',
    event: 'input'
  },
  props:{
    value:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    defaultValue:{
      type: String,
      required: true
    },
    options:{
      type: Array,
      required: true,
    },
  },
  data(){
    return {
      componentName: componentName(this)
    }
  },
  computed:{
    storeValue: function(){
      const moduleSettings = this.$store.state.settings.componentSettings[this.componentName]
      return moduleSettings ? moduleSettings[this.name] : this.defaultValue
    },
  },
  watch:{
    value(val){
      this.setSetting(val)
    },
    storeValue(val){
      this.$emit('input', val)
    },
    options(val){
      if(val.indexOf(this.value) === -1){
        this.$emit('input', this.defaultValue)
      }
    }
  },
  mounted(){
    this.$emit('input', this.storeValue)
  },
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue) {
        this.setComponentSetting({
          component: this.componentName,
          name: this.name,
          value: e
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
