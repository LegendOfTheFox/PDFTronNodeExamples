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
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { docViewer, Annotations } = instance;
            const annotManager = docViewer.getAnnotationManager();
            

            docViewer.on('documentLoaded', () => {
                var url = new URL(window.location.href); 
                //var zoom = url.searchParams.get("zoom");
                let zoom ="200,1,972,477";
                if (zoom) { 
                  var setting = zoom.split(","); //zoom=200,1,972,477 
                  instance.setZoomLevel(setting[0] / 100); 
                  const doc = docViewer.getDocument(); 
                  var scale = 2.835; 
                  //var ViewerCoordinate = doc.getViewerCoordinates(setting[1], setting[2] * scale, setting[3] * scale);
                  var ViewerCoordinate = doc.getViewerCoordinates(setting[1], setting[2], setting[3]);
                  console.log("Viewer Coordinates");
                  console.log(ViewerCoordinate); 
                  docViewer.displayPageLocation(setting[1], ViewerCoordinate.x, ViewerCoordinate.y);
                  console.log("Page Info");
                  console.log(doc.getPageInfo(1));
                  // problem # 1 is the conversion is wrong, the values being multipled out are larger than the page...

                  const rectangleAnnot = new Annotations.RectangleAnnotation();
                  rectangleAnnot.PageNumber = setting[1];
                  console.log(setting[2]);
                  console.log(setting[3]);
                  // values are in page coordinates with (0, 0) in the top left
                  rectangleAnnot.X = 2;
                  rectangleAnnot.Y = 2;
                  rectangleAnnot.Width = 20;
                  rectangleAnnot.Height = 20;
                  //rectangleAnnot.Author = annotManager.getCurrentUser();

                  annotManager.addAnnotation(rectangleAnnot);
                  // need to draw the annotation otherwise it won't show up until the page is refreshed
                  annotManager.redrawAnnotation(rectangleAnnot);
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