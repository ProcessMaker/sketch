<template>
<div class='container'>
  <h1>Process {{ name }}</h1>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      process: [],
      pid: this.$route.query.id,
      tasks: [],
      name: ''
    }
  },
  created () {
    axios
      .get(this.$root.credentials.api_url + '/api/v1/processes/' + this.pid, {
        headers: {
          Authorization: `Bearer ${this.$root.credentials.access_token}`
        }
      })
      .then(
        response => {
          this.process = response.data.data
          this.name = this.process.attributes.name
        },
        error => {
          this.process = error.response.status
        }
      )
  },
  mounted () {
    axios
      .get(this.$root.credentials.api_url + '/api/v1/processes/' + this.pid + '/tasks', {
        headers: {
          Authorization: `Bearer ${this.$root.credentials.access_token}`
        }
      })
      .then(
        response => {
          this.tasks = response.data.data
        },
        error => {
          this.tasks = error.response.status
        }
      )
  }
}

// console.log(shared)
</script>
