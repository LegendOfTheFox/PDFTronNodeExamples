import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class CustomAnnotationTriangle extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            document.getElementById('viewer2'),
        ).then((instance) => {
            const { Annotations, annotManager, CoreControls, docViewer, Tools } = instance;

            class TriangleAnnotation extends Annotations.CustomAnnotation {
                constructor() {
                    super('triangle'); // provide the custom XFDF element name
                    this.Subject = 'Triangle';

                    // create simple property
                    this.vertices = [];
                    const numVertices = 3;
                    // initialize points
                    for (let i = 0; i < numVertices; ++i) {
                        this.vertices.push(new CoreControls.Math.Point());
                    }

                    this.selectionModel = TriangleSelectionModel;
                }

                draw(ctx, pageMatrix) {
                    // the setStyles function is a function on markup annotations that sets up
                    // certain properties for us on the canvas for the annotation's stroke thickness.
                    this.setStyles(ctx, pageMatrix);

                    //console.log(this.X)
                    // first we need to translate to the annotation's x/y coordinates so that it's
                    // drawn in the correct location
                    ctx.translate(this.X, this.Y);
                    ctx.beginPath();
                    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                    ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
                    ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }

                resize(rect) {
                    // this function is only called when the annotation is dragged
                    // since we handle the case where the control handles move
                    const annotRect = this.getRect();
                    // determine how much change in each dimension
                    const deltaX = rect.x1 - annotRect.x1;
                    const deltaY = rect.y1 - annotRect.y1;

                    // shift the vertices by the amount the rect has shifted
                    this.vertices = this.vertices.map((vertex) => {
                        vertex.translate(deltaX, deltaY);
                        return vertex;
                    });
                    this.setRect(rect);
                }

                serialize(element, pageMatrix) {
                    // save our custom property into the custom data
                    this.setCustomData('vertices', this.vertices);
                    // perform regular serialization on other properties
                    const el = super.serialize(element, pageMatrix);
                    return el;
                }

                deserialize(element, pageMatrix) {
                    // perform regular deserialization for other properties
                    super.deserialize(element, pageMatrix);
                    // read our custom property out from custom data
                    const storedVertices = this.getCustomData('vertices');
                    // set the property after initializing the data as points
                    this.vertices = storedVertices.map(v => new CoreControls.Math.Point(v.x, v.y));
                }
            }

            class TriangleCreateTool extends Tools.GenericAnnotationCreateTool {
                constructor(docViewer) {
                    // TriangleAnnotation is the class (function) for our annotation we defined previously
                    super(docViewer, TriangleAnnotation);
                }

                mouseMove(e) {
                    // call the parent mouseMove first
                    super.mouseMove(e);
                    if (this.annotation) {
                        console.log(this.annotation);
                        // set the vertices relative to the annotation width and height
                        this.annotation.vertices[0].x = this.annotation.X + this.annotation.Width / 2;
                        this.annotation.vertices[0].y = this.annotation.Y;
                        this.annotation.vertices[1].x = this.annotation.X + this.annotation.Width;
                        this.annotation.vertices[1].y = this.annotation.Y + this.annotation.Height;
                        this.annotation.vertices[2].x = this.annotation.X;
                        this.annotation.vertices[2].y = this.annotation.Y + this.annotation.Height;

                        // update the annotation appearance
                        annotManager.redrawAnnotation(this.annotation);
                    }
                }
            };

            class TriangleControlHandle extends Annotations.ControlHandle {
                constructor(annotation, index) {
                    super();
                    this.annotation = annotation;
                    // set the index of this control handle so that we know which vertex it corresponds to
                    this.index = index;
                }
                // returns a rect that should represent the control handle's position and size
                getDimensions(annotation, selectionBox, zoom) {
                    let x = annotation.vertices[this.index].x;
                    let y = annotation.vertices[this.index].y;
                    // account for zoom level
                    const width = Annotations.ControlHandle.handleWidth / zoom;
                    const height = Annotations.ControlHandle.handleHeight / zoom;

                    // adjust for the control handle's own width and height
                    x -= width * 0.5;
                    y -= height * 0.5;
                    return new CoreControls.Math.Rect(x, y, x + width, y + height);
                }
                // this function is called when the control handle is dragged
                move(annotation, deltaX, deltaY, fromPoint, toPoint) {
                    annotation.vertices[this.index].x += deltaX;
                    annotation.vertices[this.index].y += deltaY;

                    // recalculate the X, Y, width and height of the annotation
                    let minX = Number.MAX_VALUE;
                    let maxX = -Number.MAX_VALUE;
                    let minY = Number.MAX_VALUE;
                    let maxY = -Number.MAX_VALUE;
                    for (let i = 0; i < annotation.vertices.length; ++i) {
                        const vertex = annotation.vertices[i];
                        minX = Math.min(minX, vertex.x);
                        maxX = Math.max(maxX, vertex.x);
                        minY = Math.min(minY, vertex.y);
                        maxY = Math.max(maxY, vertex.y);
                    }

                    const rect = new Annotations.Rect(minX, minY, maxX, maxY);
                    annotation.setRect(rect);
                    // return true if redraw is needed
                    return true;
                }

                draw(ctx, annotation, selectionBox, zoom) {
                    const dim = this.getDimensions(annotation, selectionBox, zoom);
                    ctx.fillStyle = '#FFFFFF';
                    ctx.beginPath();
                    ctx.moveTo(dim.x1 + (dim.getWidth() / 2), dim.y1);
                    ctx.lineTo(dim.x1 + dim.getWidth(), dim.y1 + dim.getHeight());
                    ctx.lineTo(dim.x1, dim.y1 + dim.getHeight());
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
            }

            class TriangleSelectionModel extends Annotations.SelectionModel {
                constructor(annotation, canModify) {
                    super(annotation, canModify);
                    if (canModify) {
                        const controlHandles = this.getControlHandles();
                        // pass the vertex index to each control handle
                        controlHandles.push(new TriangleControlHandle(annotation, 0));
                        controlHandles.push(new TriangleControlHandle(annotation, 1));
                        controlHandles.push(new TriangleControlHandle(annotation, 2));
                    }
                }

                // changes how we draw the selection outline
                drawSelectionOutline(ctx, annotation, zoom) {
                    // adjust for zoom
                    if (typeof zoom !== 'undefined') {
                        ctx.lineWidth = Annotations.SelectionModel.selectionOutlineThickness / zoom;
                    } else {
                        ctx.lineWidth = Annotations.SelectionModel.selectionOutlineThickness;
                    }

                    // changes the selection outline color if the user doesn't have permission to modify this annotation
                    if (this.canModify()) {
                        ctx.strokeStyle = Annotations.SelectionModel.defaultSelectionOutlineColor.toString();
                    } else {
                        ctx.strokeStyle = Annotations.SelectionModel.defaultNoPermissionSelectionOutlineColor.toString();
                    }

                    ctx.beginPath();
                    ctx.moveTo(annotation.vertices[0].x, annotation.vertices[0].y);
                    ctx.lineTo(annotation.vertices[1].x, annotation.vertices[1].y);
                    ctx.lineTo(annotation.vertices[2].x, annotation.vertices[2].y);
                    ctx.closePath();
                    ctx.stroke();

                    // draw a dashed line around the triangle
                    const dashUnit = Annotations.SelectionModel.selectionOutlineDashSize / zoom;
                    const sequence = [dashUnit, dashUnit];
                    ctx.setLineDash(sequence);
                    ctx.strokeStyle = 'rgb(255, 255, 255)';
                    ctx.stroke();
                }
                // change the selection testing to match the shape of the triangle
                testSelection(annotation, x, y, pageMatrix) {
                    // the canvas visibility test will only select the annotation
                    // if a user clicks exactly on it as opposed to the rectangular bounding box
                    return Annotations.SelectionAlgorithm.canvasVisibilityTest(annotation, x, y, pageMatrix);
                }
            }

            // this is necessary to set the elementName before instantiation
            TriangleAnnotation.prototype.elementName = 'triangle';
            // register the annotation type so that it can be saved to XFDF files
            annotManager.registerAnnotationType(TriangleAnnotation.prototype.elementName, TriangleAnnotation);

            const triangleToolName = 'AnnotationCreateTriangle';

            const triangleTool = new TriangleCreateTool(docViewer);
            instance.registerTool({
                toolName: triangleToolName,
                toolObject: triangleTool,
                buttonImage: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">' +
                    '<path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>' +
                    '<path fill="none" d="M0 0h24v24H0V0z"/>' +
                    '</svg>',
                buttonName: 'triangleToolButton',
                tooltip: 'Triangle'
            }, TriangleAnnotation);

            instance.setHeaderItems((header) => {
                header.getHeader('toolbarGroup-Shapes').get('freeHandToolGroupButton').insertBefore({
                    type: 'toolButton',
                    toolName: triangleToolName
                });
            });

            docViewer.on('documentLoaded', () => {
                // set the tool mode to our tool so that we can start using it right away
                instance.setToolMode(triangleToolName);
            });
        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer2" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default CustomAnnotationTriangle;