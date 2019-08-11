<template>
    <div class="block w-full p-2 border-b text-left">
        <FunctionButton
            :func="()=>{}"
            class="float-right mr-16 mt-2"
        >
            Disconnect
        </FunctionButton>
        <div>{{ connection }}</div>
    </div>
</template>

<script>
import FunctionButton from '../../parts/FunctionButton'
export default {
  name: 'Connection',
  components: {FunctionButton},
  props:{
    connection:{
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
