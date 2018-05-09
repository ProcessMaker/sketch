<template>
    <b-modal id="loaddialog" title="Load Existing Process" ref="loaddialog">

        <h2 v-if="loading">Fetching Processes....</h2>
        <b-list-group v-else>
            <b-list-group-item v-for="process in processes" :key="process.id">
                <a href="#" @click="loadProcess(process.id)">{{process.attributes.name}}</a>
            </b-list-group-item>
        </b-list-group>


        <template slot="modal-footer">
            <b-button @click="close()">Cancel</b-button>
        </template>
    </b-modal>
</template>

<script>

export default {
    props: [
        'show'
    ],

    data: function() {
        return {
            loading: true,
            api: null,
            processes: [],
            showDialog: false
        }
    },
    mounted: function() {
    },
    methods: {
        loadProcess(id) {
            // Time to fetch everything for this process
            axios.get('/api/processes/' + id)
                .then((response) => {
                    this.$emit('select', response.data);
                    this.close();
                })
                .catch((err) => {

                });
        },
        close() {
            this.showDialog = false;
            this.$emit('closed');
        }
    },
    watch: {
        show: function(val) {
            this.showDialog = val;
            if(val == true) {
                // Then we wanted to load!
                this.loading = true;
                this.showDialog = true;
                // Load processes
                axios.get('/api/processes')
                    .then((response) => {
                        this.processes = response.data.data;
                        this.loading = false;
                    })
                    .catch((err) => {
                        this.loading = false;
                    });
            }
        }
    }

}
</script>

<style scoped lang="scss">

</style>