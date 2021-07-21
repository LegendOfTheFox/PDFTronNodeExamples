import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is adding some annotations then removing them via the Annotation Manager

*/
class RemoveAnnotations extends React.Component {
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
              const highlight = new Annotations.TextHighlightAnnotation();
              highlight.PageNumber = 4;
              highlight.X = 405;
              highlight.Y = 165;
              highlight.Width = 275;
              highlight.Height = 25;
              highlight.StrokeColor = new Annotations.Color(255, 255, 0);
              // you might get the quads from text selection, a server calculation, etc
              highlight.Quads = [
                { x1: 644, y1: 178, x2: 682, y2: 178, x3: 682, y3: 168, x4: 644, y4: 168 },
                { x1: 408, y1: 190, x2: 458, y2: 190, x3: 458, y3: 180, x4: 408, y4: 180 }
              ];

              annotManager.addAnnotation(highlight);
              annotManager.drawAnnotations(highlight.PageNumber);
              annotManager.addAnnotation(highlight);
              annotManager.drawAnnotations(highlight.PageNumber);
            });

            docViewer.on('click', () => {
              console.log("Delete Annotations");
              console.log(annotManager.getAnnotationsList().length);
              annotManager.deleteAnnotation(annotManager.getAnnotationsList());
              console.log(annotManager.getAnnotationsList().length);
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

export default RemoveAnnotations;