import PlusImage from '../../icons/plus.png'

joint.shapes.pmio.util.Add = joint.shapes.basic.Generic.extend({
    markup: '<image class="icon" />',

    defaults: joint.util.deepSupplement({
        type: 'pmio.util.Add',
        size: {
            width: 64,
            height: 64
        },
        attrs: {
            'image.icon': {
                'xlink:href': PlusImage,
                width: 64,
                height: 64
            }
        }
    })
});
