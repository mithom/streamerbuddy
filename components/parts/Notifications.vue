<template>
    <IconButton
        :nb-notifications="notifications | count"
        :notifications="true"
    >
        <path
            d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
        />
    </IconButton>
</template>
<script>
import IconButton from './IconButton'
import {mapState} from 'vuex'

export default {
  name: 'Notifications',
  components: {IconButton},
  computed:{
    ...mapState(['notifications'])
  }
}
</script>

<style scoped>

</style>
