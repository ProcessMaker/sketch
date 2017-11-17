<!DOCTYPE html>
<html>
<head>
    <title>ProcessMaker Sketch</title>
    <meta name="csrf-token" value="{{csrf_token()}}">

    <link rel="stylesheet" href="{{mix('css/sketch.css')}}">

</head>

<body>
<div id="sketch">
    <md-app>
        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span>Navigation</span>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button md-dense" @click="toggleMenu">
                        <md-icon>keyboard_arrow_left</md-icon>
                    </md-button>
                </div>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>move_to_inbox</md-icon>
                    <span class="md-list-item-text">Inbox</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">Sent Mail</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>delete</md-icon>
                    <span class="md-list-item-text">Trash</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>error</md-icon>
                    <span class="md-list-item-text">Spam</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>
    <load-browser @select="loadSelect" ref="load-browser"></load-browser>
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
                            @{{model[activeElement].title}}
                        </h3>
                        <h3 class="md-title" v-else>
                            @{{ inspectorTitle }}
                        </h3>
                </div>

            </md-toolbar>

        </md-whiteframe>
        <div id="inspector-body" v-if="activeElement">
            <md-input-container>
                <label>Name</label>
                <md-input v-model="model[activeElement].name" v-bind:placeholder="model[activeElement].title"></md-input>
            </md-input-container>
                <div v-for="item in model[activeElement].formConfig">
                    <p v-if="item.type == 'help'" v-text="item.text"></p>
                    <md-input-container v-else-if="item.type == 'text'">
                        <label v-text="item.label"></label>
                        <md-input v-model="item.value" v-bind:placeholder="item.placeholder"></md-input>
                    </md-input-container>
                    <md-input-container v-else-if="item.type =='textarea'">
                         <label v-text="item.label"></label>
                        <md-textarea v-model="item.value" v-bind:placeholder="item.placeholder"></md-textarea>
                    </md-input-container>
                    <div v-else-if="item.type == 'script'">
                        <label v-text="item.label"></label>
                        <codemirror v-model="item.value" :options="item.options"></codemirror>
                    </div>
                </div>

            <md-button class="md-raised md-accent" @click="closeInspector">Close</md-button>
        </div>

    </md-sidenav>
    <div id="toolbar-container">
        <md-whiteframe md-elevation="2">
            <md-toolbar v-cloak>
                <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <h1 class="md-title" style="flex: 1">ProcessMaker Sketch</h1>
                <md-button @click="load">Load Existing</md-button>
            </md-toolbar>
        </md-whiteframe>
    </div>
    <div id="diagram-container" v-cloak v-bind:style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
        <diagram-view @element-click="handleElementClick" :width="graphWidth" :model="model" :height="graphHeight"></diagram-view>
    </div>
    </md-app>
</div>
<script src="{{mix('js/sketch.js')}}"></script>
</body>
</html>
