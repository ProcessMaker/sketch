<!DOCTYPE html>
<html>
<head>
    <title>ProcessMaker Sketch</title>
    <meta name="csrf-token" value="{{csrf_token()}}">

    <link rel="stylesheet" href="{{mix('css/sketch.css')}}">

</head>

<body>
<div id="sketch">
    <load-browser @select="loadSelect" :show="showLoadDialog" @closed="showLoadDialog = false" ref="load-browser"></load-browser>
    <element-browser ref="element-browser" @closed="showElementBrowser = false" :show="showElementBrowser" @select="browserSelect"></element-browser>
    <md-snackbar v-cloak md-position="center" ref="snackbar">
        <span v-text="statusText"></span>
    </md-snackbar>
    <md-drawer id="inspector" :md-active.sync="showInspector" v-cloak class="md-right" ref="inspector" class="md-elevation-2">
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
<script src="{{mix('js/sketch.js')}}"></script>
</body>
</html>
