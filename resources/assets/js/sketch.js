/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.VueCodeMirror = require('vue-codemirror')

window.graphlib = require('graphlib');
window.dagre = require('dagre');
window.joint = require('jointjs');

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

window.Vue.use(window.VueCodeMirror);

// Bring in our custom jointjs shapes
require('./shapes/init.js');

// Bring in our components
Vue.component('diagram-view', require('./components/diagram-view.vue'));
Vue.component('element-browser', require('./components/element-browser.vue'));
Vue.component('load-browser', require('./components/load-browser.vue'));

/**
 * Initialize our Sketch app
 */
const sketch = new Vue({
  el: '#sketch',

  data: {
    graphHeight: 0,
    graphWidth: 0,
    statusText: '',
    // Represents the active element that has been clicked
    activeElement: null,
    menuVisible: false,
    inspectorTitle: '',
    inspectorFormConfig: null,
    showElementBrowser: false,
    showInspector: false,
    showLoadDialog: false,
    inspectorTitleEditing: false,
    inspectorTempTitle: 'test',
    model: {
      '013aa8fb-15ec-44e7-9727-fd7273d9b109': {
        title: 'Start Event',
        name: 'Start from Webhook',
        type: 'events.Start',
        connections: [
          'e4e51853-a604-4725-a75c-a1ae611a1ca7'
        ],
        parent: []
      },
      'e4e51853-a604-4725-a75c-a1ae611a1ca7': {
        title: 'Add Element',
        name: 'Add',
        type: 'util.Add',
        connections: [],
        parent: ['013aa8fb-15ec-44e7-9727-fd7273d9b109']
      },


      // '1fe6d632-2d10-4946-99ed-cdb0a0670b7a': {
      //   title: "Exclusive Gateway",
      //   name: "Exclusive Gateway",
      //   type: "gateways.Exclusive",
      //   icon: undefined,
      //   connections: ["a23a8d95-00a5-4145-bdfc-7b653c906825", "2ef1713a-4593-4ce0-aa9b-d0998b0f8de3"],
      //   formConfig: undefined,
      //   parent: ["013aa8fb-15ec-44e7-9727-fd7273d9b109"]
      // },
      // '2ef1713a-4593-4ce0-aa9b-d0998b0f8de3': {
      //   title: "Send E-Mail",
      //   name: "Send E-Mail",
      //   type: "tasks.Service",
      //   icon: "/icons/mail.png",
      //   connections: ["bf07434b-b557-4452-a0f6-30be2a757dce"],
      //   formConfig: [{
      //       type: "help",
      //       "text": "The SendMailConnector sends mail to a target email address. The subject and message template uses data model replacements, specifying what to insert into the message with curly braces."
      //     },
      //     {
      //       type: "text",
      //       name: "to",
      //       "label": "Recipient Email Address"
      //     },
      //     {
      //       type: "text",
      //       name: "name",
      //       "label": "Sender Name",
      //       "placeholder": "Name the email will appear from"
      //     },
      //     {
      //       type: "text",
      //       name: "subject",
      //       "label": "Email Subject Line"
      //     },
      //     {
      //       type: "textarea",
      //       name: "template",
      //       "label": "Message Template"
      //     }
      //   ],
      //   parent: ["1fe6d632-2d10-4946-99ed-cdb0a0670b7a"]
      // },
      //
      // 'a23a8d95-00a5-4145-bdfc-7b653c906825': {
      //   title: "Send E-Mail",
      //   name: "Send E-Mail",
      //   type: "tasks.Service",
      //   icon: "/icons/mail.png",
      //   connections: ["b7080454-5bc6-497d-b5a3-c76dd4606dcc"],
      //   formConfig: [{
      //       type: "help",
      //       "text": "The SendMailConnector sends mail to a target email address. The subject and message template uses data model replacements, specifying what to insert into the message with curly braces."
      //     },
      //     {
      //       type: "text",
      //       name: "to",
      //       "label": "Recipient Email Address"
      //     },
      //     {
      //       type: "text",
      //       name: "name",
      //       "label": "Sender Name",
      //       "placeholder": "Name the email will appear from"
      //     },
      //     {
      //       type: "text",
      //       name: "subject",
      //       "label": "Email Subject Line"
      //     },
      //     {
      //       type: "textarea",
      //       name: "template",
      //       "label": "Message Template"
      //     }
      //   ],
      //   parent: ["1fe6d632-2d10-4946-99ed-cdb0a0670b7a"]
      // },
      // 'b7080454-5bc6-497d-b5a3-c76dd4606dcc': {
      //   title: "Add Element",
      //   name: "Add",
      //   type: "util.Add",
      //   connections: [],
      //   parent: ["a23a8d95-00a5-4145-bdfc-7b653c906825"]
      // },
      // 'bf07434b-b557-4452-a0f6-30be2a757dce': {
      //   title: "Add Element",
      //   name: "Add",
      //   type: "util.Add",
      //   connections: [],
      //   parent: ["2ef1713a-4593-4ce0-aa9b-d0998b0f8de3"]
      // },


    },
    exclusive: {
      // '7fe6d632-2d10-4946-99ed-cdb0a0670b7a': [
      //   'a23a8d95-00a5-4145-bdfc-7b653c906825',
      //   '2ef1713a-4593-4ce0-aa9b-d0998b0f8de3'
      // ]

    }, // will be key of the exclusive gateway and gateway children array
  },
  methods: {

    mergeGateway: function(gateway_id) {

    },

    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    guid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    // Used when wanting to load an existing process
    load: function() {
      this.showLoadDialog = true;
    },
    loadSelect: function(data) {
      this.model = data;

    },
    browserSelect: function(data) {
      // what we do now is replace the activeElement with a new element
      let guid = this.guid();
      let el = {
        title: data.title,
        name: data.title,
        type: data.type,
        icon: data.icon,
        connections: [],
        formConfig: data.formConfig,
        parent: this.model[this.activeElement].parent
      }

      this.$set(this.model, guid, el);
      // Now make all items that previously connected to the activeElement now connect to this element
      for (let itemId in this.model) {

        let item = this.model[itemId];

        let idx = item.connections.indexOf(this.activeElement);

        if (idx > -1) {

          item.connections.splice(idx, 1);

          item.connections.push(guid);

        };

      };

      // Search the exclusive objects for this add element and replace it.

      for (let gateway in this.exclusive) {

        for(let linkedKey of this.exclusive[gateway]){

          if(linkedKey === this.activeElement){

            // Delete found elements

            console.log("Key found: "+linkedKey);

            this.exclusive[gateway].splice(linkedKey, 1);

            // Add new element

            console.log("New Element: "+guid);

            this.exclusive[gateway].push(guid);

          }

        }

      }

      // Remove activeElement

      let parent_info = this.model[this.activeElement].parent;

      this.$delete(this.model, this.activeElement);
      // Now determine if the new element is a termination, if not, add an Add

      if (!data.termination) {

        if (data.type !== 'gateways.MergeExclusive') {

          for (let gateway in this.exclusive) {

            for(let index of this.exclusive[gateway]){

              if(index.indexOf(parent_info) > -1){

                this.exclusive[gateway].splice(index, 1);

                this.exclusive[gateway].push(guid);

              }
            }

          }

          let add = {
            title: 'Add Element',
            name: 'Add',
            type: 'util.Add',
            connections: [],
            parent: [guid]
          }

          let loops = data.type === 'gateways.Exclusive' ? 2 : 1;

          let children = [];

          for (let i = 0; i < loops; i++) {
            let addGuid = this.guid();
            this.$set(this.model, addGuid, add);
            el.connections.push(addGuid);
            children.push(addGuid);

          }

          if (data.type === 'gateways.Exclusive') {

            this.$set(this.exclusive, guid, children);

          }

        } else {
          // grab the gateway and merge the two open elements

          let newMergeExclusiveObject = {
            title: 'Merge Exclusive',
            name: 'Merge',
            type: 'gateways.MergeExclusive',
            connections: []
          }

          let newMergeExclusiveGuid = this.guid();

          this.$set(this.model, newMergeExclusiveGuid, newMergeExclusiveObject);

          el.connections.push(newMergeExclusiveGuid);

          for (let gateway in this.exclusive) {

            for(let linkedKey of this.exclusive[gateway]){

              this.$delete(this.model, this.model[linkedKey].connections);

              this.model[linkedKey].connections = [newMergeExclusiveGuid];

              this.model[newMergeExclusiveGuid].parent = this.exclusive[gateway];

            }

          }

          this.exclusive = {};

          let add2Guid = this.guid();

          this.$set(this.model, add2Guid, {
            title: 'Add Element',
            name: 'Add',
            type: 'util.Add',
            connections: []
          });

          el.connections.push(add2Guid);

          this.model[newMergeExclusiveGuid].connections = [add2Guid];

        }

      }

      this.activeElement = null
    },
    handleElementClick: function(id) {
      let element = this.model[id];
      this.activeElement = id;
      if (element.type == 'util.Add') {
        this.showElementBrowser = true;

      } else {
        this.inspectorTitle = element.label ? element.label : element.title;
        this.inspectorFormConfig = element.formConfig;
        this.showInspector = true;
      }
    },
    closeInspector() {
      this.activeElement = null;
      this.showInspector = false;

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
  },

});
