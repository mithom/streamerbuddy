<template>
    <div>
        <portal
            v-if="$store.state.moduleState[moduleName]"
            to="addConnection"
        >
            <div>
                <button @click.prevent="openAuthWindow">
                    Connect
                </button>
            </div>
        </portal>
        <template
            v-if="true"
        >
            <portal
                v-for="[id,connection] of Object.entries(connections)"
                :key="id"
                to="connections"
            >
                <div class="block w-full p-2 border-b text-left">
                    <InstallButton
                        class="float-right mr-16 mt-2"
                    >
                        Disconnect
                    </InstallButton>
                    <div>{{ connection }}</div>
                </div>
            </portal>
        </template>
    </div>
</template>

<script>
import secureRandom from 'secure-random'
import {ipcRenderer} from 'electron'
import {moduleName} from '~/app/component-util'
import InstallButton from "~/components/parts/InstallButton";

export default {
  name: "ConnectionSource",
  components: {InstallButton},
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
  data(){
    return {
      moduleName: moduleName(this)
    }
  },
  computed:{
    allowNewConnection(){
      return this.allowMultiple || !this.connections
    },
    connections(){
      return this.$store.state.connections.access_tokens[this.clientId] || []
    }
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
        this.$store.commit('connections/consumeAccountId')
        const method = this.allowMultiple ? 'addAccessToken' : 'setAccessToken'
        this.$store.commit(`connections/${method}`, {
          provider: this.clientId,
          id: this.$store.state.connections.nextAccountId,
          access_token,
        })
      })
      ipcRenderer.send('openAuthWindow', options)
    },
  }
}
</script>

<style scoped>

</style>