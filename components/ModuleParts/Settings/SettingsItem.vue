<template>
    <div class="tooltip p-2 border-b border-gray-500">
        <slot />
        <span class="tooltiptext px-2 py-1"><slot name="tooltip" /></span>
    </div>
</template>

<script>
export default {
  name: "SettingsItem"
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