import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Sample for OCR Testing

*/
class OCRWebViewer extends React.Component {
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

export default OCRWebViewer;