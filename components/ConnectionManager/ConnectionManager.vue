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
                <button
                    class="w-full p-2 border-b text-left"
                    :class="{'hover:bg-gray-200': !opened, 'cursor-default': opened}"
                    :disabled="opened"
                    @click="toggleAdd"
                >
                    <FunctionButton
                        v-if="opened"
                        class="float-right clear-none mr-16 mt-2"
                        @func="toggleAdd"
                        @click.native.stop
                    >
                        Close
                    </FunctionButton>
                    <span class="align-middle border border-blue-300 bg-gray-200 w-10 h-10 inline-block rounded plus" />
                    <span class="px-2 inline-block align-middle">
                        Add Connection
                    </span>
                    <span
                        v-if="opened"
                        class="block"
                    >
                        <portal-target
                            name="addConnection"
                            :multiple="true"
                        />
                    </span>
                </button>
                <portal-target
                    name="connections"
                    :multiple="true"
                />
                <!-- class="w-full p-2 border-b flex items-center relative" -->
            </div>
        </div>
    </Modal>
</template>

<script>
import CloseButton from "../parts/CloseButton";
import FunctionButton from '../parts/FunctionButton'

export default {
  name: "ConnectionManager",
  components: {FunctionButton, CloseButton},
  data(){
    return {
      opened: false
    }
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
