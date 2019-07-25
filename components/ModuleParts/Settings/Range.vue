<template>
    <SettingsItem>
        <slot :value="value" />
        <input
            :value="value"
            type="range"
            min
            max
            :step="step"
            class="w-full"
            @input="SetSetting"
        >
        <template #tooltip>
            <slot name="tooltip" />
        </template>
    </SettingsItem>
</template>

<script>
import SettingsItem from './SettingsItem'
import {mapMutations} from 'vuex'

export default {
  name: "Range",
  components:{
    SettingsItem
  },
  props:{
    component:{
      type: String,
      required: true
    },
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
    min:{
      type: Number,
      default: 0
    },
    max:{
      type: Number,
      default: 100
    },
    step:{
      type: Number,
      default: 5
    },
  },
  data(){
    return {
      val: 0
    }
  },
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    SetSetting(e){
      this.setComponentSetting({
        component: this.component,
        name: this.name,
        value: Number(e.target.value)
      })
    },
    defaultOnEmpty(e){
      if (!e.target.value){
        this.setComponentSetting({
          component: this.component,
          name: this.name,
          value: this.defaultValue
        })
      }
    }
  }
}
</script>

<style scoped>
input{
    -webkit-appearance: none;
    width: 100%;
    height: 0.7em;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

input::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

input:hover {
    opacity: 1; /* Fully shown on mouse-over */
}
</style>