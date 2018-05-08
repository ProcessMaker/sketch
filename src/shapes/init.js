window.joint.shapes.pmio = {
    events: {},
    util: {},
    tasks: {},
    gateways: {}
};

require('./util/basic.js')
require('./events/start.js')
require('./events/end.js')
require('./util/add.js')
require('./tasks/script.js')
require('./tasks/service.js')
require('./gateways/exclusive.js')
require('./gateways/inclusive.js')
