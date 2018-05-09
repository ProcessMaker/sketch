<template>
    <div>
        <load-browser @select="loadSelect" :show="showLoadDialog" @closed="showLoadDialog = false" ref="load-browser"></load-browser>
        <element-browser ref="element-browser" @closed="showElementBrowser = false" :show="showElementBrowser" @select="browserSelect"></element-browser>
        <md-snackbar v-cloak md-position="center" ref="snackbar">
            <span v-text="statusText"></span>
        </md-snackbar>
        <md-drawer id="inspector" :md-active.sync="showInspector" v-cloak class="md-right md-elevation-2" ref="inspector">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title" v-if="activeElement">
                        @{{model[activeElement].title}}
                    </h3>
                    <h3 class="md-title" v-else>
                        @{{ inspectorTitle }}
                    </h3>
                </div>

            </md-toolbar>

            <div id="inspector-body" v-if="activeElement">
                <md-field>
                    <label>Name</label>
                    <md-input v-model="model[activeElement].name" v-bind:placeholder="model[activeElement].title"></md-input>
                </md-field>
                <div v-for="item in model[activeElement].formConfig">
                    <p v-if="item.type == 'help'" v-text="item.text"></p>
                    <md-field v-else-if="item.type == 'text'">
                        <label v-text="item.label"></label>
                        <md-input v-model="item.value" v-bind:placeholder="item.placeholder"></md-input>
                    </md-field>
                    <md-field v-else-if="item.type =='textarea'">
                        <label v-text="item.label"></label>
                        <md-textarea v-model="item.value" v-bind:placeholder="item.placeholder"></md-textarea>
                    </md-field>
                    <div v-else-if="item.type == 'script'">
                        <label v-text="item.label"></label>
                        <codemirror v-model="item.value" :options="item.options"></codemirror>
                    </div>
                </div>

                <md-button class="md-raised md-accent" @click="closeInspector">Close</md-button>
            </div>

        </md-drawer>
        <div id="toolbar-container" class="md-elevation-2">
            <md-toolbar v-cloak>
                <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <h1 class="md-title" style="flex: 1">ProcessMaker Sketch</h1>
                <md-button @click="load">Load Existing</md-button>
            </md-toolbar>
        </div>
        <div id="diagram-container" v-cloak v-bind:style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
            <diagram-view @element-click="handleElementClick" :width="graphWidth" :model="model" :height="graphHeight"></diagram-view>
        </div>
    </div>

</template>

<script>
import diagramView from "./diagram-view.vue";
import elementBrowser from "./element-browser.vue";
import loadBrowser from "./load-browser.vue";

export default {
  name: "sketch",
  components: {
    "diagram-view": diagramView,
    "element-browser": elementBrowser,
    "load-browser": loadBrowser
  },
  data: function() {
    return {
      graphHeight: 0,
      graphWidth: 0,
      statusText: "",
      // Represents the active element that has been clicked
      activeElement: null,
      menuVisible: false,
      inspectorTitle: "",
      inspectorFormConfig: null,
      showElementBrowser: false,
      showInspector: false,
      showLoadDialog: false,
      inspectorTitleEditing: false,
      inspectorTempTitle: "test",
      model: {
        "213aa8fb-15ec-44e7-9727-fd7273d9b109": {
          title: "Start Event",
          name: "Start from Webhook",
          type: "events.Start",
          connections: ["e4e51853-a604-4725-a75c-a1ae611a1ca7"]
        },
        "e4e51853-a604-4725-a75c-a1ae611a1ca7": {
          title: "Add Element",
          name: "Add",
          type: "util.Add",
          connections: []
        }
      }
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    guid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
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
        formConfig: data.formConfig
      };
      this.$set(this.model, guid, el);
      // Now make all items that previously connected to the activeElement now connect to this element
      for (let itemId in this.model) {
        let item = this.model[itemId];
        let idx = item.connections.indexOf(this.activeElement);
        if (idx > -1) {
          item.connections.splice(idx, 1);
          item.connections.push(guid);
        }
      }
      // Remove activeElement
      this.$delete(this.model, this.activeElement);
      // Now determine if the new element is a termination, if not, add an Add
      if (!data.termination) {
        let addGuid = this.guid();
        let add = {
          title: "Add Element",
          name: "Add",
          type: "util.Add",
          connections: []
        };
        this.$set(this.model, addGuid, add);
        el.connections.push(addGuid);
      }
      this.activeElement = null;
    },
    handleElementClick: function(id) {
      let element = this.model[id];
      this.activeElement = id;
      if (element.type == "util.Add") {
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
    let toolbar = $("#toolbar-container");
    this.graphHeight = $(window).height() - toolbar.height();
    this.graphWidth = $(window).width();
    $(window).on("resize", e => {
      this.graphHeight = $(window).outerHeight() - toolbar.outerHeight();
      this.graphWidth = $(window).outerWidth();
    });
  }
};
</script>

<style lang="scss" scoped>

</style>


