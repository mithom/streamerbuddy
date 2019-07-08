<template>
    <IconButton
        :nb-notifications="alerts | count"
        :notifications="true"
    >
        <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"
        />
    </IconButton>
</template>

<script>
import IconButton from './IconButton'
import {mapState} from 'vuex'

export default {
  name: 'InformationButton',
  components: {IconButton},
  computed:{
    ...mapState(['alerts'])
  }
}
</script>

<style scoped>

</style>
