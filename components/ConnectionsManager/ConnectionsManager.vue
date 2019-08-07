<template>
    <Modal
        name="connectionManager"
        width="75%"
        height="75%"
    >
        <div class="overflow-auto h-full p-4">
            <CloseButton
                class="z-10"
                @click.native="$modal.hide('connectionManager')"
            />
            <div class="flex flex-col">
                <portal-target
                    name="connections"
                    :multiple="true"
                />
                <!-- class="w-full p-2 border-b flex items-center relative" -->
                <button
                    class="w-full p-2 border-b relative text-left"
                    :class="{'hover:bg-gray-200': !opened, 'cursor-default': opened}"
                    :disabled="opened"
                    @click="toggleAdd"
                >
                    <span class="align-middle border border-blue-300 bg-gray-200 w-10 h-10 inline-block rounded plus" />
                    <span class="px-2 inline-block align-middle">
                        Add Connection
                    </span>
                    <span
                        v-if="opened"
                        class="block"
                    >
                        opened: {{ opened }}
                        <InstallButton
                            class="right-0 top-0 absolute mr-16 mt-2"
                            :install="toggleAdd"
                            @click.native.stop
                        >
                            Close
                        </InstallButton>
                        <portal-target
                            name="addConnection"
                            :multiple="true"
                        />
                    </span>
                </button>
            </div>
        </div>
    </Modal>
</template>

<script>
import CloseButton from "../parts/CloseButton";
import InstallButton from "../parts/InstallButton";

export default {
  name: "ConnectionsManager",
  components: {InstallButton, CloseButton},
  data(){
    return {
      opened: false
    }
  },
  mounted() {
    this.$modal.show('addConnection')
  },
  methods:{
    toggleAdd: function(){
      this.opened = !this.opened
    }
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