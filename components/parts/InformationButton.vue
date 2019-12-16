<template>
    <IconButton
        :nb-notifications="alerts | count"
        :notifications="true"
        icon="notifications"
    />
</template>

<script>
import IconButton from './IconButton'
import {mapState} from 'vuex'
import Notifications from './Notifications'

export default {
  name: 'InformationButton',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Notifications,
    IconButton,
  },
  computed:{
    ...mapState(['alerts'])
  }
}
</script>

<style scoped>

</style>
