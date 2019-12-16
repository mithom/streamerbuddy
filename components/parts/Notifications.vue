<template>
    <IconButton
        :nb-notifications="notifications | count"
        :notifications="true"
        icon="information-solid"
    />
</template>
<script>
import IconButton from './IconButton'
import {mapState} from 'vuex'

export default {
  name: 'Notifications',
  components: {
    IconButton,
  },
  computed:{
    ...mapState(['notifications'])
  }
}
</script>

<style scoped>

</style>
