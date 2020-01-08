import {mapGetters} from 'vuex'
const loggedInMixin = {
  data(){
    return {
      loggedInResult: null
    }
  },
  computed:{
    ...mapGetters({loggedIn: 'account/loggedIn'})
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler(promise){
        // save Promise result in local state
        promise.then(result => this.loggedInResult = result)
      }
    }
  }
}

export default loggedInMixin
