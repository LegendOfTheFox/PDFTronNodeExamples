import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class DeleteAnnotationsWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/654.pdf'
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { Annotations, annotationManager, documentViewer } = instance.Core;

            const annotManager = documentViewer.getAnnotationManager();
            documentViewer.setEnableAutomaticLinking(false);

            documentViewer.on('documentLoaded', () => {
                
                
            });

            annotManager.addEventListener('annotationChanged', (annotation, action) => {
                console.log("Annotation Changed");

            })

            documentViewer.on('click', () => {
                let annotations = annotManager.getAnnotationsList();
                console.log(annotations);

                const rectangleAnnot = new Annotations.RectangleAnnotation();
                rectangleAnnot.PageNumber = 1;
                // values are in page coordinates with (0, 0) in the top left
                rectangleAnnot.X = 100;
                rectangleAnnot.Y = 150;
                rectangleAnnot.Width = 200;
                rectangleAnnot.Height = 50;
                rectangleAnnot.Author = annotationManager.getCurrentUser();

                annotationManager.addAnnotation(rectangleAnnot);
                // need to draw the annotation otherwise it won't show up until the page is refreshed
                annotationManager.redrawAnnotation(rectangleAnnot);
            })

            documentViewer.on('keyDown', () => {
                console.log("Key Down");
                const annots = annotationManager.getAnnotationsList();

                // remove annotations
                annotationManager.deleteAnnotations(annots);
                console.log("After the Delete");
                console.log(annotationManager.getAnnotationsList());
            })
        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default DeleteAnnotationsWebViewer;