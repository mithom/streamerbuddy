<template>
    <SettingsItem
        v-bind="$attrs"
        :name="name"
        :default-value="defaultValue"
    >
        <template>
            <label>
                <slot :value="storeValue" />
                <input
                    :value="storeValue"
                    class="form-input"
                    :placeholder="defaultValue"
                    type="number"
                    :step="step"
                    @input="setSetting($event.target.value)"
                    @blur="defaultOnEmpty"
                >
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
import {moduleName} from "~/app/component-util";

export default {
  name: "Number",
  components:{
    SettingsItem
  },
  model:{
    prop: 'value',
    event: 'input'
  },
  props:{
    value:{
      type: Number,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    defaultValue:{
      type: Number,
      required: true
    },
    step:{
      type: Number,
      default: 0.1
    },
  },
  data(){
    return {
      moduleName: moduleName(this)
    }
  },
  computed:{
    storeValue: function(){
      const moduleSettings = this.$store.state.settings.moduleSettings[this.moduleName]
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
  },
  mounted(){
    this.$emit('input', this.storeValue)
  },
  methods:{
    ...mapMutations({
      setModuleSetting: 'settings/setModuleSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue){
        this.setModuleSetting({
          moduleName: this.moduleName,
          name: this.name,
          value: Number(e)
        })
      }
    },
    defaultOnEmpty(e){
      if (!e.target.value){
        this.setModuleSetting({
          moduleName: this.moduleName,
          name: this.name,
          value: this.defaultValue
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
