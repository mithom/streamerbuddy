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
                    :placeholder="defaultValue"
                    @input="setSetting($event.target.value)"
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
  name: "String",
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
    }
  },
  mounted(){
    this.$emit('input', this.storeValue)
  },
  methods:{
    ...mapMutations({
      setModuleSetting: 'settings/setModuleSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue) {
        this.setModuleSetting({
          moduleName: this.moduleName,
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
