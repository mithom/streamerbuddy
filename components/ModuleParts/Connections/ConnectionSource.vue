<template>
    <div>
        <button @click.prevent="openAuthWindow">
            Connect
        </button>
    </div>
</template>

<script>
import secureRandom from 'secure-random'
import {ipcRenderer} from 'electron'

export default {
  name: "ConnectionSource",
  props:{
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
        state: secureRandom(64, {type: 'Array'}).join(""),
        validUntil: this.$dateFns.addMinutes(new Date(), 15)
      }
      this.$store.commit('connections/addConnectionAttempt', {
        nonce: options.state,
        options
      })
      ipcRenderer.on('finishAuth', (event, user)=>{
        this.$store.commit('connections/addAccessToken', {
          provider: this.clientId,
          user_id: this._id, //TODO: clean this part up (use better data)
          user,
        })
      })
      ipcRenderer.send('openAuthWindow', options)
    }
  }
}
</script>

<style scoped>

</style>