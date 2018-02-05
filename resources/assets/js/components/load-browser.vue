<template>
    <md-dialog :md-active.sync="showDialog" md-open-from="#custom" md-close-to="#custom" ref="loaddialog">
        <md-dialog-title>Load Existing Processes</md-dialog-title>

        <md-dialog-content>
            <h2 v-if="loading">Fetching Processes....</h2>
            <md-list v-else>
                <md-list-item v-for="process in processes" :key="process.id">
                    <a href="#" @click="loadProcess(process.id)">{{process.attributes.name}}</a>
                </md-list-item>
            </md-list>


        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="close()">Cancel</md-button>
        </md-dialog-actions>
    </md-dialog>
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
