
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.graphlib = require('graphlib');
window.dagre = require('dagre');
window.joint = require('jointjs');
// Bring in our Vue Material package
window.VueMaterial = require('vue-material');
window.Vue.use(window.VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: {
        color:  'light-blue',
        textColor: 'white'
    },
    warn: 'red',
    background: 'white'
})

// Bring in our custom jointjs shapes
require('./shapes/init.js');

// Bring in our components
Vue.component('diagram-view', require('./components/diagram-view.vue'));

/**
 * Initialize our Sketch app
 */
const sketch = new Vue({
    el: '#sketch',

    data: {
        graphHeight: 0,
        graphWidth: 0,
        statusText: '',
        inspectorTitle: '',
        inspectorFormConfig: null,
        inspectorTitleEditing: false,
        inspectorTempTitle: 'test',
        model: {
            '213aa8fb-15ec-44e7-9727-fd7273d9b109': {
                label: 'Start from Webhook',
                type: 'events.Start',
                connections: [
                    'e4e51853-a604-4725-a75c-a1ae611a1ca7'
                ]
            },
            'e4e51853-a604-4725-a75c-a1ae611a1ca7': {
                label: 'Send Thank You Email',
                type: 'tasks.Service',
                icon: '/icons/mail.png',
                connections: [
                    'a6d0ca7c-abf5-436b-9b5a-4bb282bf4f20'
                ]
            },
            // exclusive gateway
            'a6d0ca7c-abf5-436b-9b5a-4bb282bf4f20': {
                label: 'Determine if Priority Request',
                type: 'gateways.Exclusive',
                connections: [
                    '1de7ba14-87fb-4c04-9c2e-1decc1bd22e4',
                    '0472922c-a39e-4ddc-aeaf-ef1b8e5c38dc'
                ]
            },
            // Script Task 1
            '1de7ba14-87fb-4c04-9c2e-1decc1bd22e4': {
                label: 'Update Active Directory',
                type: 'tasks.ScriptTask',
                connections: [
                    'bc70d19f-c015-4a02-ad15-9203a8bead8d'
                ]
            },
            '0472922c-a39e-4ddc-aeaf-ef1b8e5c38dc': {
                label: 'Send Mail To HR',
                icon: '/icons/mail.png',
                type: 'tasks.Service',
                connections: [
                    'bc70d19f-c015-4a02-ad15-9203a8bead8d'
                ],
                data: {},
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
            },
            'bc70d19f-c015-4a02-ad15-9203a8bead8d': {
                label: 'Merge Paths',
                type: 'gateways.Inclusive',
                connections: [
                    '22b025a2-41b3-4f01-93c4-5e99b797001a'
                ]
            },
            '22b025a2-41b3-4f01-93c4-5e99b797001a': {
                label: 'Finished',
                type: 'events.End',
                connections: []
            }
        }
    },
    methods: {
        handleElementClick: function(id) {
            this.statusText = "Clicked on " + id;
            element = this.model[id];
            this.inspectorTitle = element.label;
            this.$refs.snackbar.open();
            this.inspectorFormConfig = element.formConfig;
            this.showInspector();
        },
        showInspector() {
            this.$refs.inspector.toggle();
        },
        closeInspector() {
            this.$refs.inspector.close();
        }
    },
    mounted() {
        let toolbar = $('#toolbar-container');
        this.graphHeight = $(window).height() - toolbar.height();
        this.graphWidth = $(window).width();
        $(window).on('resize', (e) => {
            this.graphHeight = $(window).outerHeight() - toolbar.outerHeight();
            this.graphWidth = $(window).outerWidth();
        });
    }
});



