<template>
<div class="add">
   <font-awesome-icon icon="plus" /> Add Step 

    <b-modal size="lg" id="step-browser-modal" title="Add A Step" ref="stepBrowserModal">
        <b-container>
            <b-row>
                <b-col sm="4">
                    <b-list-group flush>
                        <b-list-group-item action class="category" @click="selectedCategory = category" :active="selectedCategory == category" v-for="(category, index) in categories" :key="index">
                            <span>{{category}}</span>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col class="step-list" sm="8">
                    <b-list-group v-if="filtered.length">
                    <b-list-group-item href="#" v-for="(item,index) in filtered" :key="index" class="element">
                        <b-row>
                        <b-col sm="2">
                        <img :src="item.icon" :alt="item.title" />
                        </b-col>
                        <b-col sm="10">
                            <div class="description">
                            <div class="title">{{item.title}}</div>{{item.description}}
                            </div>
                        </b-col>
                        </b-row>
                    </b-list-group-item>
                    </b-list-group>
                    <div class="nomatch" v-else>
                        There are no steps that match your search
                    </div>
                </b-col>
            </b-row>
       </b-container>

        <template slot="modal-header">
            <b-container>
            <b-row>
                <b-col sm="6">
                    <h5 class="modal-title">Add A Step</h5>
                </b-col>
                <b-col sm="6">
                    <b-form-input size="sm" v-model="filter" type="text" placeholder="Filter Steps"></b-form-input>
                </b-col>
            </b-row>
            </b-container>
        </template>

        <template slot="modal-footer">
            <b-button @click="close">Cancel</b-button>
        </template>
    </b-modal>
</div>
</template>

<script>
import base from "./base.js";
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import catalog from "../../steps-catalog.json"

export default {
    name: 'add',
    mixins: [base],
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            catalog: catalog,
            selectedCategory: 'All',
            filter: '',
        }
    },
    watch: {
        selected: function(value, old) {
            if(value) {
                this.$refs.stepBrowserModal.show();
            } else {
                this.$refs.stepBrowserModal.hide();
            }
        }
    },
    methods: {
        close() {
            this.$refs.stepBrowserModal.hide()
        }
    },
    computed: {
        categories() {
            let categories = [
                'All'
            ];
            for(let index in this.catalog) {
                categories.push(this.catalog[index].title);
            }
            return categories;
        },
        filtered() {
            let filtered = [];
            for(let index in this.catalog) {
                if(this.selectedCategory == 'All' || this.catalog[index].title == this.selectedCategory) {
                    // We are allowed to see this category. Let's go through each
                    for(let element of this.catalog[index].items) {
                        if(this.filter.toLowerCase().trim() == '' || element.title.toLowerCase().indexOf(this.filter.toLowerCase().trim()) != -1) {
                            // Match, let's add it to our filtered list
                            filtered.push(element);
                        }
                    }
                }
            }
            return filtered;
        }
    }
};
</script>
 
<style lang="scss" scoped>
.add {
    background-color: white;
    border: 1px solid grey;
    border-radius: 15px;
    padding: 4px 16px;
    font-size: 12px;

}

.category {
    cursor: pointer;
}

.step-list {
    height: 400px;
    overflow: auto;
}

.element {
    img {
        width: 48px;
        height: 48px;
    }
    .title {
        font-weight: bold;
        font-size: 1.1em;
    }
    .description {
        padding-top: 4px;
    }
}
</style>
 
