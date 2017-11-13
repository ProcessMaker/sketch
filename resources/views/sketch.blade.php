<!DOCTYPE html>
<html>
<head>
    <title>ProcessMaker Sketch</title>
    <meta name="csrf-token" value="{{csrf_token()}}">

    <link rel="stylesheet" href="{{mix('css/sketch.css')}}">

</head>

<body>
<div id="sketch">
    <element-browser ref="element-browser" @select="browserSelect"></element-browser>
    <md-snackbar v-cloak md-position="bottom center" ref="snackbar" md-duration="4000">
        <span v-text="statusText"></span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
    <md-sidenav id="inspector" v-cloak class="md-right" ref="inspector">
        <md-whiteframe md-elevation="2">
            <md-toolbar>
                <div class="md-toolbar-container">
                        <h3 class="md-title" v-if="activeElement">
                            @{{model[activeElement].label ? model[activeElement].label : model[activeElement].title}}
                        </h3>
                        <h3 class="md-title" v-else>
                            @{{ inspectorTitle }}
                        </h3>
                </div>

            </md-toolbar>

        </md-whiteframe>
        <div id="inspector-body" v-if="activeElement">
            <md-input-container>
                <md-input v-model="model[activeElement].label" v-bind:placeholder="model[activeElement].title"></md-input>
            </md-input-container>
                <div v-for="item in model[activeElement].formConfig">
                    <p v-if="item.type == 'help'" v-text="item.text"></p>
                    <md-input-container v-else-if="item.type == 'text'">
                        <label v-text="item.label"></label>
                        <md-input v-bind:placeholder="item.placeholder"></md-input>
                    </md-input-container>
                    <md-input-container v-else-if="item.type =='textarea'">
                         <label v-text="item.label"></label>
                        <md-textarea v-bind:placeholder="item.placeholder"></md-textarea>
                    </md-input-container>
                    <div v-else-if="item.type == 'script'">
                        <label v-text="item.label"></label>
                        <codemirror :model="item.value" :options="item.options"></codemirror>
                    </div>
                </div>

            <md-button class="md-raised md-accent" @click="closeInspector">Close</md-button>
        </div>

    </md-sidenav>
    <div id="toolbar-container">
        <md-whiteframe md-elevation="2">
            <md-toolbar v-cloak>
                <h1>ProcessMaker Sketch</h1>
            </md-toolbar>
        </md-whiteframe>
    </div>
    <div id="diagram-container" v-cloak v-bind:style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
        <diagram-view @element-click="handleElementClick" :width="graphWidth" :model="model" :height="graphHeight"></diagram-view>
    </div>
</div>
<script src="{{mix('js/sketch.js')}}"></script>
</body>
</html>
