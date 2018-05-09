import ScriptImage from '../../icons/script.png';

joint.shapes.pmio.tasks.Script = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable"><image class="icon" /><rect class="label" /> <text /></g>',

    defaults: joint.util.deepSupplement({
        type: 'pmio.events.ScriptTask',
        size: {
            width: 64,
            height: 64
        },
        attrs: {
            'image.icon': {
                'xlink:href': ScriptImage,
                width: 64,
                height: 64
            },
            'rect.label': {
                fill: 'white',
                stroke: '#ccc',
                rx:5,
                ry: 5,
                ref: 'image.icon',
                'ref-x': 0.5,
                'ref-y': 72,
                'x-alignment': 'middle',
                'y-alignment': 'middle',
            },
            text: {
                text: '',
                fill: 'black',
                'font-size': 12,
                ref: 'rect.label',
                'ref-x': 0.5,
                'ref-y': 0.5,
                'font-weight': 'bold',
                'font-family': 'monospace',
                'font-color': 'black',
                'y-alignment': 'middle',
                'x-alignment': 'middle'
            },
        }
    })
});
