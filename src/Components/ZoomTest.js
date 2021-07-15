import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Questions Related to a zoom ticket

url=200,1,152,50
zoom = 200
page = 1
X = 152mm
Y = 50mm

Problem 1)
Issue scaling and having to scale by a factor (2.835), point is displayed in the upper left corner
*/
class ZoomTest extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/C.pdf',
                enableMeasurement: true
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { docViewer, Annotations } = instance;
            const annotManager = docViewer.getAnnotationManager();
            

            docViewer.on('documentLoaded', () => {
                //var zoom = url.searchParams.get("zoom");
                let zoom ="200,1,152,50";
                if (zoom) { 
                    var setting = zoom.split(",");
                    
                    const doc = docViewer.getDocument(); 
                    const scale = 0.35265457598; //mm scaling ratio 
                    const x =  (setting[2] / scale);
                    const y = (setting[3] / scale);
                    console.log("Page Dimensions");
                    console.log(doc.getPageInfo(1));
                    console.log(`x: ${x}, y: ${y}`);

                    instance.setZoomLevel(setting[0] / 100); 
                    
                    const ViewerCoordinate = doc.getViewerCoordinates(setting[1], x, y);
                    docViewer.displayPageLocation(setting[1],ViewerCoordinate.x, ViewerCoordinate.y);

                    let viewportRegion = docViewer.getExactViewportRegionRect(1);

                    // Draw the Annotation
                    const rectangleAnnot = new Annotations.RectangleAnnotation();
                    rectangleAnnot.PageNumber = 1;
                    rectangleAnnot.X = (viewportRegion.x1 + viewportRegion.x2)/2;
                    rectangleAnnot.Y = (viewportRegion.y1 + viewportRegion.y2)/2;
                    rectangleAnnot.Width = 2;
                    rectangleAnnot.Height = 2;
                    annotManager.addAnnotation(rectangleAnnot);
                    annotManager.redrawAnnotation(rectangleAnnot);

                    // let afterZoom = doc.getViewerCoordinates();
                    // console.log("After Zoom");
                    // console.log(afterZoom);
                }
            });
        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default ZoomTest;