<template>
    <Modal
        name="connectionManager"
        width="75%"
        height="75%"
    >
        <div class="overflow-auto h-full p-4">
            <CloseButton @click.native="$modal.hide('connectionManager')" />
            <div class="flex flex-col">
                <portal-target
                    name="connections"
                    :multiple="true"
                />
                <button class="hover:bg-gray-200 w-full p-2 border-b flex items-center">
                    <span class="border border-blue-300 bg-gray-200 w-10 h-10 inline-block rounded plus" />
                    <span class="px-2">
                        Add Connection
                    </span>
                </button>
            </div>
        </div>
    </Modal>
</template>

<script>
import CloseButton from "../parts/CloseButton";
export default {
  name: "ConnectionsManager",
  components: {CloseButton},
  mounted() {
    this.$modal.show('addConnection')
  }
}
</script>

<style scoped>
.plus{
    position: relative;
}
.plus::after {
    content: " ";
    position: absolute;
    display: block;
    background-color: #718096;
    height: 8px;
    margin-top: -4px;
    top: 50%;
    left: 6px;
    right: 6px;
    z-index: 9;
    border-radius: 2px;
}
.plus::before {
    content: " ";
    position: absolute;
    display: block;
    background-color: #718096;
    width: 8px;
    margin-left: -4px;
    left: 50%;
    top: 6px;
    bottom: 6px;
    z-index: 9;
    border-radius: 2px;
}
</style>