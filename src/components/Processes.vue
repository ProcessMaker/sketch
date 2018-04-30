<template>
    <div class="container">
        <h1>Process List</h1>
        <ul>
            <li v-for="process in processes" :key="process.id">
                <router-link :to="{ name: 'Process', query: { id: process.id }}">{{ process.attributes.name }}</router-link>
                </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      creds: this.$root.credentials,
      processes: []
    }
  },

  created () {
    axios
      .get(this.creds.api_url + '/api/v1/processes', {
        headers: {
          Authorization: `Bearer ${this.creds.access_token}`
        }
      })
      .then(
        response => {
          this.processes = response.data.data
        },
        error => {
          this.processes = error.response.status
        }
      )
  }
}

// console.log(shared)
</script>
