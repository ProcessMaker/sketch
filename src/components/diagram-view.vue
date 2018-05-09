<template>
    <div class="diagram-view h-100">

    </div>
</template>

<script>

    export default {
        props: [
            'width',
            'height',
            'model'
        ],
        data: function() {
            return {
                paper: null,
                graph: null
            };
        },
        mounted() {
            this.graph = new joint.dia.Graph;
            this.paper = new joint.dia.Paper({
                el: this.$el,
                width: this.width,
                height: this.height,
                model: this.graph,
                interactive: false,
                gridSize: 5,
                drawGrid: true,
                highlighting: {
                    'default': {
                        name: 'stroke',
                        options: {
                            padding: 3
                        }
                    }
                }
            });
            this.paper.setInteractivity(false);
            this.buildGraph();
            this.paper.on('cell:pointerdown', (cellView, evt, x, y) => {
                this.$emit('element-click', cellView.model.id);
            });
        },
        methods: {
            drawGrid: function() {
                this.paper.drawGrid();
            },
            makeElement(id, data) {
                let label = data.name ? data.name : data.title;
                let classname = 'joint.shapes.pmio.' + data.type;
                var constructorFunc = classname.split('.')
                    .reduce((prev, next) => prev[next], window);

                // Calc the label rect size
                var maxLineLength = _.max(label.split('\n'), function(l)  { return l.length; }).length;

                // Compute width/height of the rectangle based on the number
                // of lines in the label and the letter size. 0.6 * letterSize is
                // an approximation of the monospace font letter width.
                var letterSize = 6;
                var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
                var height = 1.5 * ((label.split('\n').length + 1) * letterSize);

                return new constructorFunc({
                    id: id,
                    attrs: {
                        text: {
                            text: label
                        },
                        'image.icon': {
                            'xlink:href': data.icon
                        },
                        'rect.label': {
                            width: width,
                            height: height
                        }
                    }
                });
            },
            makeLink(id, targetId) {
                return new joint.dia.Link({
                    source: {id: id},
                    target: {id: targetId},
                    attrs: {
                        '.marker-target': {d: 'M 4 0 L 0 2 L 4 4 z' }
                    },
                    smooth: false
                })
            },
            buildGraph() {
                let elements = [];
                let links = [];
                _.each(this.model, (node, id) => {
                    elements.push(this.makeElement(id, node));
                    _.each(node.connections, (targetId) => {
                        links.push(this.makeLink(id, targetId));
                    });
                });

                let data = elements.concat(links);
                this.graph.resetCells(data);
                joint.layout.DirectedGraph.layout(this.graph, {
                    marginX: 128,
                    marginY: 48,
                    nodeSep: 160,
                    edgeSep: 50,
                    setLinkVertices: false
                });
            }
        },
        watch: {
            model: {
                handler: function(val) {
                    // Rebuild graph
                    this.buildGraph(val);
                },
                deep: true
            },
            width: function(val) {
                if(this.paper) {
                    this.paper.setDimensions(val, this.height);
                    this.drawGrid();
                }
            },
            height: function(val) {
                if(this.paper) {
                    this.paper.setDimensions(this.width, val);
                    this.drawGrid();
                }
            }
        }

    }

</script>

<style scoped lang="scss">
    svg {
        height: default;
    }

</style>