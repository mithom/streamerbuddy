<template>
    <portal
        to="settings"
        :disabled="inPlace"
    >
        <div class="tooltip p-2 border-b border-gray-500">
            <slot />
            <span
                v-if="$slots.tooltip"
                class="tooltiptext px-2 py-1"
            >
                <slot name="tooltip" />
            </span>
        </div>
    </portal>
</template>

<script>
import {componentName} from "~/app/component-util";

export default {
  name: "SettingsItem",
  inheritAttrs:true,
  props:{
    name:{
      type: String,
      required: true
    },
    defaultValue:{
      type: [String, Number, Boolean],
      required: true
    },
    inPlace:{
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$store.commit('settings/addComponentSetting', {
      component: componentName(this),
      name: this.name,
      default: this.defaultValue
    })
  }
}
</script>

<style scoped>
.tooltip {
    position: relative;
}

.tooltip .tooltiptext {
    white-space: pre-wrap;
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    top: 125%;
    left: 0;
    margin: 0 1em;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>