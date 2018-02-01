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
    processInfo: {},
    pmio_url: 'https://0lqmxthf.api.processmaker.io/api/v1/',
    pmio_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEwODFiOGI1NDA4NDg2OWY1ZWVmMzQ0MGI3NzZlOGMzNDZjNTA2MDVlMzIzNTNjMTM1MzYxNDZlMjAxNTUzMDhjNDQ0NmVmNmU5YjllMDhkIn0.eyJhdWQiOiI0NjkzMzkxNyIsImp0aSI6IjEwODFiOGI1NDA4NDg2OWY1ZWVmMzQ0MGI3NzZlOGMzNDZjNTA2MDVlMzIzNTNjMTM1MzYxNDZlMjAxNTUzMDhjNDQ0NmVmNmU5YjllMDhkIiwiaWF0IjoxNTE2MDUwMjI1LCJuYmYiOjE1MTYwNTAyMjUsImV4cCI6MTU0NzU4NjIyNSwic3ViIjoiMSIsInNjb3BlcyI6W119.hRzABPhxCA5AezaLvsZV2xggPu7lpxekDhM1fb7IjmMtFM3ruKjCoCrGgUk3qGv7WOLR84pdoSf2XVFaZ2-5sxJr6cvAyx_rv3zT3A7hxpjzBhyr7xRd4u7lUAM677slW1A4IP1dbgdPrn_B8AjH73j6gZDVnq6R1mHLpwbSeBU84w5jKgtGF1Rh6CvnNQNcqHD0ZTLackTDYXdIRV4MZIuI76cAsLBoRYNHSv5OJILU_TSlQEKzf9GeZm_kq710ocHH2rxLjTYM799zbkWPLzK99uwVQ-uvz3EwnLiaQSeVhk31TxY24Vjh5oye6jCaDA7IvPxqa-ubr7dOA9ZyXFrep0ktPum-5Ym9E4XY9LFKOIj3o0BmGuBEH0x1IvRmiFEufPS0NxgZUizUuFM7tp2DyQIgCNxE7fpgulhEktzB20O0MZ2ij7H-qtKZ_DGK8JUN2o4tGWHo86D9zUh9A1fSSdHWu-RXxylwqlVK4JEiZO5FVb8QlP1M1qZWwxKPGM1asuUxXRQknUSZGTxtolpRiRcbmaOVGHH6NkeXN33lZkxQp690NwSyVyBjsVVb2RMneiOY7fB_bugjqrSDcKyPf4et3_5Pm6ND-5dsQ2Yl97T817HA7dNR-pmP5v7X6pQxC_d__H8J5JJ3LGpAmmCJn-k1MmPcPc-B8jIVr-w',
    pmio_process_id: 'ebd2e112-04ed-42d7-86bd-c4324debc898',
    pageTitle: 'Loading...',
    model: {
      '013aa8fb-15ec-44e7-9727-fd7273d9b109': {
        title: 'Start Event',
        name: 'Start from Webhook',
        type: 'events.Start',
        connections: [],
        parent: []
      }



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

    pmioLoad(){

      axios.get(
          this.pmio_url+'processes/'+this.pmio_process_id,
          {headers: {
              "Authorization" : `Bearer ${this.pmio_token}`
            }
          }
        )
        .then((response) => {
            this.pageTitle = response.data.data.attributes.name;
            // console.log(response.data.data);
            this.processInfo = response.data.data;

            this.pmioTasks(response.data.data.id)

          },
          (error) => {
            this.processInfo = error.response.status;
          }
        );

    },

    pmioTasks(id){

      axios.get(
          this.pmio_url+'processes/'+id+'/tasks',
          {headers: {
              "Authorization" : `Bearer ${this.pmio_token}`
            }
          }
        )
        .then((response) => {

          let tasks = response.data.data;

          if(tasks.length > 0){

            let startEl = this.model['013aa8fb-15ec-44e7-9727-fd7273d9b109'];

            startEl.connections.length = 0;

            startEl.connections.push(tasks[0].id);

            let i = -1;

            for(let task in tasks){

              let add = {
                title: tasks[task].attributes.name,
                name: tasks[task].attributes.name,
                type: "tasks.Script",
                connections: [],
                parent: ['013aa8fb-15ec-44e7-9727-fd7273d9b109'] // Start
              }

              if(tasks[i + 2]){
                add.connections = [tasks[i + 2].id]
              } else {
                add.connections = ['e4e51853-a604-4725-a75c-a1ae611a1ca7'];
              }

              // update the model

              this.$set(this.model, tasks[task].id, add);

              i++;

            };

            let add = {
              title: 'Add Element',
              name: 'Add',
              type: 'util.Add',
              connections: [],
              parent: [tasks[i].id]
            };

            this.$set(this.model,'e4e51853-a604-4725-a75c-a1ae611a1ca7', add);

          }

          // return response.data.data;
            // return response.data.data;
          },
          (error) => {
            return error.response.status;
          }
        );

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

      // Remove activeElement

      let parent_info = this.model[this.activeElement].parent;

      this.$delete(this.model, this.activeElement);
      // Now determine if the new element is a termination, if not, add an Add

      if (!data.termination) {

        if (data.type !== 'gateways.MergeExclusive') {

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

          if (children.length > 1) {

            this.$set(this.exclusive, guid, children);

          }

          // Search the exclusive objects for this add element and replace it.

          if (this.exclusive) {

            let i = 0
            let changeElements = {};

            for (let gateway in this.exclusive) {

              if (this.exclusive[gateway].includes(this.activeElement)) {

                if (this.model[guid].type !== 'events.End') {

                  changeElements[i++] = {
                    action: 'add',
                    gateway: gateway,
                    uuid: guid
                  }

                }

                changeElements[i++] = {
                  action: 'delete',
                  gateway: gateway,
                  uuid: this.activeElement
                }

              }

            }

            for (let change in changeElements) {

              if (changeElements[change].action === 'add') {

                this.exclusive[changeElements[change].gateway].push(changeElements[change].uuid)

              }

              if (changeElements[change].action === 'delete') {

                this.exclusive[changeElements[change].gateway].splice(changeElements[change].uuid, 1)

              }

              if (this.exclusive[changeElements[change].gateway].length === 1) {

                this.$delete(this.exclusive, changeElements[change].gateway)

              }

            }

            changeElements = {}

          }

        } else {

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

            for (let linkedKey of this.exclusive[gateway]) {

              // TODO: Need to join other open elements into the merge. Maybe use a click event with different colored add elements?

              // if (this.model[linkedKey].type && this.model[linkedKey].type === 'gateways.Exclusive') {
              //
              //   // there is another gateway in play
              //
              //   let otherchildren = this.exclusive[linkedKey];
              //
              //   // remove the gateway from the options
              //
              //   otherchildren.splice(linkedKey, 1);
              //
              //   console.log(otherchildren);
              //
              // }

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
  beforeMount() {
    //do something before mounting vue instance
    this.pmioLoad();
  }

});
