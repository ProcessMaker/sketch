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
    pmio_url: 'https://barcrafd.api.processmaker.io/api/v1/',
    pmio_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM0YzE3ZmU2ODg1MDQyY2NiNGJmZDExMDAxZGMzYzcxYzQyYTk1ZjNhYzEyZDRlYTQ3NWRlZWU2NDg4ZmE5MmIxMDJkMzdjOThiYzViZTgxIn0.eyJhdWQiOiI1MzcxODEzOCIsImp0aSI6IjM0YzE3ZmU2ODg1MDQyY2NiNGJmZDExMDAxZGMzYzcxYzQyYTk1ZjNhYzEyZDRlYTQ3NWRlZWU2NDg4ZmE5MmIxMDJkMzdjOThiYzViZTgxIiwiaWF0IjoxNTE3OTU1MDExLCJuYmYiOjE1MTc5NTUwMTEsImV4cCI6MTU0OTQ5MTAxMSwic3ViIjoiMSIsInNjb3BlcyI6W119.oRHMs7bmg36QOKAAxCSWvaUCXK4oM7EmWEiHPUsw6ifRYk9rzCc3wRzh4e77tvVWeOImYtG274QZIVttww8o_rp3Buw4-FovifM7yVayCCGhfXXzcmotPm0rT1RbgjK5TsomgTrRIl-OYGQYHJ-cU7sq9XljzYq0ewfTFZ2pdG-MJl4ru-pLjf5Kse2lC2SItdod_U6Y_5QeTWWyo24z4O_BaQjhFfw9xtgAb9Xq_6A8Sd22ITUIx3gCVFtofqJSNC3jBECC1TSiMOhHO3gDKsYeq9jisv22SwMro5gf1pnnpMvq6DgKji0xu9riW3IoN4FyOjdRz8yH6GUgQh0ALp5qrwurwQa4Mu18M2kdI_yg5xVmC_jXvZDZAPqs6pFpAkzKHXwKRZufkM1pDqqzMNEfzzz_dqdcBoUPMR-H9kl7N-HQ6rsbvxXh0t-CuVAbPMkN-5CV4sgVPJjwnQkIDRLnfP8y8qpd5qBomZrhpeVG86HM8WkGaSNahOl2CbveVcVO_SDccjuV9GjKS8W-uBX55Jfx3tVrQzu3pz3kdzxrBJ10UXzbzsdryyg0aUjy1p0v1RauX1dxdeeVU_MTC5uXikSS9DPwXzchlwT3kR6QvPHMBdNGR-Owt23omp6ZdTfUZjgk1zcTwNdKQbGy3o9cwDpKKlKHhsq_CnJbhOE',
    pmio_process_id: 'dc3c723a-2970-4c30-8912-dc34ae50f014',
    // TODO: Mappings
    pmio_elements: {
      'SERVICE-TASK': {
        map: 'tasks.Service',
        template: 'messaging.items.sendmail',
        category: 'messaging',
        item: 'sendmail',
        icon: '/icons/mail.png',
        name: 'sendmail'
      },
      'SCRIPT-TASK': {
        map: 'tasks.Script',
        template: 'scripting.items.nodejs',
        category: 'scripting',
        item: 'nodejs',
        icon: '/icons/script.png',
        name: 'nodejs'
      }
    },
    // 'util.Basic':'',
    // 'util.Add':'',
    // 'tasks.Service':'SERVICE-TASK',
    // 'tasks.Script':'SCRIPT-TASK',
    // 'gateways.MergeExclusive':'',
    // 'gateways.Exclusive':'',
    // 'events.Start':'',
    // 'events.End':'',
    // ],
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
    tasks: [],
    exclusive: {
      // '7fe6d632-2d10-4946-99ed-cdb0a0670b7a': [
      //   'a23a8d95-00a5-4145-bdfc-7b653c906825',
      //   '2ef1713a-4593-4ce0-aa9b-d0998b0f8de3'
      // ]

    }, // will be key of the exclusive gateway and gateway children array
    // TODO: Templates
    templates: {
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
            formConfig: [{
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
            formConfig: [{
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
            formConfig: [{
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
  },
  methods: {

    pmioLoad() {

      axios.get(
          this.pmio_url + 'processes/' + this.pmio_process_id, {
            headers: {
              "Authorization": `Bearer ${this.pmio_token}`
            }
          }
        )
        .then((response) => {
            this.pageTitle = response.data.data.attributes.name;

            this.processInfo = response.data.data;

            this.pmioTasks(response.data.data.id)

          },
          (error) => {
            this.processInfo = error.response.status;
          }
        );

    },
    // TODO: Import Task Connectors from API
    pimoTaskConnectors(process_id, task_id) {
      axios.get(
          this.pmio_url + 'processes/' + process_id + '/tasks/' + task_id + '/connectors', {
            headers: {
              "Authorization": `Bearer ${this.pmio_token}`
            }
          }
        )
        .then((response) => {
            if(response.data.data[0]){

              let params = response.data.data[0]['attributes']['input_parameters'];

              let form = [];

              for(let param in params){

                let set_type = 'text';

                if(params[param].length > 96){
                  set_type = 'textarea';
                }

                form.push({
                  type: set_type,
                  label: param,
                  name: param,
                  value: params[param],
                });

              }

              console.log(form);

              this.model[task_id].formConfig = form;


              this.tasks.push(response.data.data[0]);
            }

            // console.log('Get Connectors');
            // console.log(response.data.data);
          },
          (error) => {
            console.log('Error:');
            console.log(error.response.status);
          }
        );

    },

    pmioTasks(id) {

      axios.get(
          this.pmio_url + 'processes/' + id + '/tasks', {
            headers: {
              "Authorization": `Bearer ${this.pmio_token}`
            }
          }
        )
        .then((response) => {

            let tasks = response.data.data;

            if (tasks.length > 0) {

              let startEl = this.model['013aa8fb-15ec-44e7-9727-fd7273d9b109'];

              startEl.connections.length = 0;

              startEl.connections.push(tasks[0].id);

              let i = -1;

              for (let task in tasks) {

                // TODO: Import Tasks from API

                this.pimoTaskConnectors(id, tasks[task].id);

                let mapping = this.pmio_elements[tasks[task].attributes.type]

                let type_template = this.pmio_elements[tasks[task].attributes.type].template

                let template = this.templates[mapping.category]['items'][mapping.item];

                let add = {
                  title: tasks[task].attributes.name,
                  name: tasks[task].attributes.name,
                  type: mapping.map,
                  icon: mapping.icon,
                  connections: [],
                  parent: ['013aa8fb-15ec-44e7-9727-fd7273d9b109'] // Start
                }


                if(this.tasks[task] !== undefined){

                  add.formConfig = this.tasks[task][attributes][input_parameters];

                }

                if (mapping.map === 'tasks.Script') {
                  add.formConfig = [{
                      type: 'help',
                      text: 'The Node.JS Script Task provides the ability to execute a Node.JS script inside your process.'
                    },
                    {
                      type: 'script',
                      label: 'Node.JS Script',
                      value: tasks[task].attributes.script,
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

                if (tasks[i + 2]) {
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

              this.$set(this.model, 'e4e51853-a604-4725-a75c-a1ae611a1ca7', add);

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
    save: function() {
      console.log('WTF');
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
