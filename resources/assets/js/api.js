class Api {
  /**
   * Create a new Api instance.
   */
  constructor() {

    this.apiUrl = '',
    this.apiKey = '',

  }

  setUp(apiUrl,apiKey){

    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  data() {
      return {
        posts: [],
        errors: []
      }
    },

    // Fetches posts when the component is created.
    created() {
      axios.get(this.apiUrl)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    methods: {
      processes: function() {

      },
      process: function(id) {

      }
    }

}
