<template>
    <md-dialog :md-active.sync="showDialog" ref="elementsdialog">
        <md-dialog-title>Browse Elements</md-dialog-title>

                    <md-list>
                        <md-list-item @click="selected = model[item.id]" v-for="item in model" :key="item.id">
                            <md-icon>{{item.icon}}</md-icon>
                            <span>{{item.title}}</span>
                        </md-list-item>
                    </md-list>
                    <md-list v-if="selected">
                        <div v-for="item in selected.items" :key="item.id">
                          <div v-if="item.id !== 'mergeexclusive' || item.id === 'mergeexclusive'">

                            <h4 @click="select(selected.id, item.id)"><strong>{{item.title}}</strong>: {{item.id}}</h4>
                            <p>
                            {{item.description}}
                            </p>

                          </div>
                        </div>
                    </md-list>

        <md-dialog-actions>
            <md-button class="md-primary" @click="close()">Cancel</md-button>
            <md-button class="md-primary" @click="close()">Ok</md-button>
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
                showDialog: false,
                selected: null,
                model: {
                    process: {
                        id: "process",
                        title: "Process",
                        icon: "build",
                        items: {
                            end: {
                                id: "end",
                                title: "End Event",
                                description: 'Denotes the completion of the process',
                                type: 'events.End',
                                termination: true
                            }
                        }
                    },
                    gateways: {
                        id: "gateways",
                        title: "Gateways",
                        icon: "build",
                        items: {
                            exclusive: {
                                id: "exclusive",
                                title: "Exclusive Gateway",
                                description: 'Add a branching gateway to the process',
                                type: 'gateways.Exclusive'

                            },
                            mergeexclusive: {
                                id: "mergeexclusive",
                                title: "Merge Exclusive Gateway",
                                description: 'Recombine a branching gateway to the process',
                                type: 'gateways.MergeExclusive'

                            },
                            // inclusive: {
                            //     id: "inclusive",
                            //     title: "Inclusive Gateway",
                            //     description: 'Add a merging gateway to the process',
                            //     type: 'gateways.Inclusive'
                            // },
                        }
                    },
                    messaging: {
                        id: 'messaging',
                        title: 'Messaging',
                        icon: 'chat',
                        items: {
                            sendmail: {
                                id: 'sendmail',
                                title: 'Send E-Mail',
                                connector_class: 'SendMailConnector',
                                icon: '/icons/mail.png',
                                description: 'Send an e-mail to a specified recipient and with content',
                                type: 'tasks.Service',
                                formConfig: [
                                    {
                                        type: 'help',
                                        text: 'The SendMailConnector sends mail to a target email address. The subject and message template uses data model replacements, specifying what to insert into the message with curly braces.'
                                    },
                                    {
                                        type: 'text',
                                        name: 'to',
                                        label: 'Recipient Email Address',
                                    },
                                    {
                                        type: 'text',
                                        name: 'name',
                                        label: 'Sender Name',
                                        placeholder: 'Name the email will appear from'
                                    },
                                    {
                                        type: 'text',
                                        name: 'subject',
                                        label: 'Email Subject Line'
                                    },
                                    {
                                        type: 'textarea',
                                        name: 'template',
                                        label: 'Message Template'
                                    }
                                ]
                            }
                        }
                    },
                    scripting: {
                        id: 'scripting',
                        title: "Scripting",
                        icon: "code",
                        items: {
                            lua: {
                                id: "lua",
                                title: "LUA Script",
                                type: 'tasks.Script',
                                description: 'Execute a provided LUA script',
                                formConfig: [
                                    {
                                        type: 'help',
                                        text: 'The LUA Script Task provides the ability to execute a LUA script inside your process.'
                                    },
                                    {
                                        type: 'script',
                                        label: 'LUA Script',
                                        value: '',
                                        options: {
                                            tabSize: 4,
                                            mode: 'text/x-lua',
                                            theme: 'base16-dark',
                                            lineNumbers: true,
                                            line: true
                                        }
                                    }
                                ]
                            },
                            nodejs: {
                                id: "nodejs",
                                title: "Node.JS Script",
                                type: 'tasks.Script',
                                description: "Execute a provided Node.JS Script",
                                formConfig: [
                                    {
                                        type: 'help',
                                        text: 'The Node.JS Script Task provides the ability to execute a Node.JS script inside your process.'
                                    },
                                    {
                                        type: 'script',
                                        label: 'Node.JS Script',
                                        value: '',
                                        options: {
                                            tabSize: 4,
                                            mode: 'text/javascript',
                                            theme: 'base16-dark',
                                            lineNumbers: true,
                                            line: true
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        },
        methods: {
            selectCategory(catId) {
                this.selected = this.model[catId];
            },
            open() {
                this.showDialog = false;
                this.selected = this.model.util;
            },
            close() {
                this.$emit('closed');
                this.showDialog = false;
            },
            select(catId, itemId) {
                this.$emit('select', this.model[catId].items[itemId]);
                this.close();
            }
        },
        watch: {
            show: function(val) {
                this.showDialog = val;
            }
        }
    }
</script>

<style lang="scss">
    .md-dialog {
        width: 80%;
    }
</style>
