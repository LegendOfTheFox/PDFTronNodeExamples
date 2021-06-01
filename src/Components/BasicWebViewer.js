import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class BasicWebViewer extends React.Component {
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
                const rectangleAnnot = new Annotations.RectangleAnnotation();
                rectangleAnnot.PageNumber = 1;
                // values are in page coordinates with (0, 0) in the top left
                rectangleAnnot.X = 100;
                rectangleAnnot.Y = 150;
                rectangleAnnot.Width = 200;
                rectangleAnnot.Height = 50;
                rectangleAnnot.Author = annotManager.getCurrentUser();

                annotManager.addAnnotation(rectangleAnnot);
                // need to draw the annotation otherwise it won't show up until the page is refreshed
                annotManager.redrawAnnotation(rectangleAnnot);
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

export default BasicWebViewer;