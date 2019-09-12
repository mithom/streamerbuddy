<template>
    <div class="block w-full p-2 border-b text-left break-words">
        <FunctionButton
            class="float-right mr-16 mt-2"
            @func="disconnect"
        >
            Disconnect
        </FunctionButton>
        <div class="max-w-full">
            {{ connection }}
        </div>
    </div>
</template>

<script>
import FunctionButton from '~/components/parts/FunctionButton'

export default {
  name: 'Connection',
  components: {FunctionButton},
  props:{
    connection:{
      type: Object,
      required: true,
    },
    clientId:{
      type: String,
      required: true,
    },
    connectionId:{
      type: String,
      required: true,
    },
  },
  methods:{
    disconnect: function(){
      this.$store.commit('connections/removeAccessToken', {provider: this.clientId, connectionId: this.connectionId})
    }
  }
}
</script>

<style scoped>

</style>
