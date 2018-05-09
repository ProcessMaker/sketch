
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'

window.Vue = Vue;
window.VueCodeMirror = require('vue-codemirror')

window.graphlib = require('graphlib');
window.dagre = require('dagre');
window.joint = require('jointjs');

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import './sass/sketch.scss'

Vue.use(VueMaterial)

window.Vue.use(window.VueCodeMirror);

// Bring in our custom jointjs shapes
require('./shapes/init.js');

import sketch from './components/sketch.vue'

/***
 * Initialize our Sketch app
 */
new Vue({
    el: '#sketch',
    components: { sketch },
    template: '<sketch />'
});



