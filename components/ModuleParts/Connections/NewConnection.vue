<template>
    <div>
        <slot
            :openAuthWindow="openAuthWindow"
            v-bind="$props"
        >
            <FunctionButton
                :func="openAuthWindow"
            >
                Connect
            </FunctionButton>
        </slot>
    </div>
</template>

<script>
import secureRandom from 'secure-random'
import {ipcRenderer} from 'electron'
import FunctionButton from '../../parts/FunctionButton'

export default {
  name: 'NewConnection',
  components: {FunctionButton},
  props:{
    moduleName:{
      type: String,
      required: true,
    },
    clientId:{
      type: String,
      required: true
    },
    accessTokenUrl:{
      type: String,
      default: null
    },
    authorizationUrl:{
      type: String,
      required: true
    },
    scopes:{
      type: Array,
      required: true
    },
    query:{
      type: Object,
      default: ()=>{}
    },
    body:{
      type: Object,
      default: ()=>{}
    },
    headers:{
      type: Object,
      default: ()=>{}
    },
    allowMultiple:{
      type: Boolean,
      default: false
    },
  },
  methods:{
    openAuthWindow: function(){
      const options = {
        clientId: this.clientId,
        redirectUri: `${process.env.baseUrl}/connections/callback`,
        accessTokenUri: this.accessTokenUrl,
        authorizationUri: this.authorizationUrl,
        scopes: this.scopes.join(' '),
        body: this.body,
        query: this.query,
        headers: this.headers,
        state: secureRandom(64, {type: 'Buffer'}).toString('hex'),
        validUntil: this.$dateFns.addMinutes(new Date(), 15)
      }
      this.$store.commit('connections/setConnectionAttempt', {
        nonce: options.state,
        options
      })
      ipcRenderer.once('finishAuth', (event, access_token)=>{
        const method = this.allowMultiple ? 'addAccessToken' : 'setAccessToken'
        this.$store.commit(`connections/${method}`, {
          provider: this.clientId,
          access_token,
        })
      })
      ipcRenderer.send('openAuthWindow', options)
    },
  },
}
</script>

<style scoped>

</style>
