import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Examples of programmtically working with annotations

Use Case 1
Updating text on a free text annotation programmatically

Use Case 2
Programatically creating Annotation comments whenever someone deletes a comment from a reply stack
*/
class AnnotationWebViewer extends React.Component {

    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                annotationUser: 'Bryan'
            },
            document.getElementById('viewer'),
        ).then(instance => {
            const { annotManager } = instance;

            // Use Case 1
            annotManager.on('annotationSelected', (annotations, action) => {
                if (annotations[0].Subject === 'Free Text' && action === 'selected') {
                    annotations[0].setContents('Redacted');
                    annotManager.updateAnnotation(annotations[0]);
                }
            });

            // Use Case 2
            annotManager.on('deleteReply', (annotation, root) => {
                annotManager.createAnnotationReply(root, `Comment was Removed by ${annotManager.getCurrentUser()}`);
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

export default AnnotationWebViewer;