<template>
<div class="card" style="width: 24rem; margin: 0 auto">
  <div class="card-header">
      <strong>ProcessMaker.io Login</strong>
    </div>
  <div class="card-body">
    <p>Please enter your details from your processmaker.io environment.</p>
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" class="form-control" id="username" v-model="credentials.username" placeholder="Username">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" v-model="credentials.password" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="client_id">Client Id</label>
    <input type="text" class="form-control" id="client_id" v-model="credentials.client_id" placeholder="Client Id">
  </div>
  <div class="form-group">
    <label for="client_secret">Client Secret</label>
    <input type="password" class="form-control" id="client_secret" v-model="credentials.client_secret" placeholder="Client Secret">
  </div>
  <div class="form-group">
    <label for="api_url">API URL</label>
    <input type="text" class="form-control" id="api_url" v-model="credentials.api_url" placeholder="API URL">
  </div>
</div>
<div class="card-footer text-right">
<button @click="submit()" class="btn btn-primary btn-sm">Sign In</button>
</div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: this.$root.credentials,
      error: ''
    }
  },
  methods: {
    submit () {
      axios
        .post(this.credentials.api_url + '/oauth/access_token', {
          username: this.credentials.username,
          password: this.credentials.password,
          client_id: this.credentials.client_id,
          client_secret: this.credentials.client_secret,
          grant_type: 'password'
        })
        .then(
          response => {
            this.credentials.api_url = this.credentials.api_url
            this.credentials.access_token = response.data.access_token
            this.$router.push('/processes')
          },
          error => {
            console.log(error.response.status)
          }
        )

      // this.$emit('credentials', credentials)
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      // auth.login(this, credentials, 'secretquote')
    }
  }
}
</script>
