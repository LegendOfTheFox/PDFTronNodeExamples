import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class ViewerOptimizedWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                fullAPI: true
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { docViewer, Annotations, PDFNet } = instance;
            const annotManager = docViewer.getAnnotationManager();

            const opts = new PDFNet.PDFDoc.ViewerOptimizedOptions();

            docViewer.on('documentLoaded', () => {
               
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

export default ViewerOptimizedWebViewer;