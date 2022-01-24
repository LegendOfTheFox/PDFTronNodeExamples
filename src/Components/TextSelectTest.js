import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class TextSelectTest extends React.Component {
    componentDidMount() {

        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: "/files/PDFTron_about.pdf"
            },
            document.getElementById('viewer'),
        ).then( async (instance) => {
            const { documentViewer, annotationManager } = instance.Core;

            // Method 1
            annotationManager.on('annotationChanged', (annotations, action, info) => {
              if ( action === 'add') {
                if( annotations[0].Subject === 'Highlight'){
                  const textToBeExtracted = annotations[0].getCustomData("trn-annot-preview");
                  console.log(textToBeExtracted);
                }
              }
            });

            // Method 2
            documentViewer.on('textSelected', (quads, text, pageNumber) => {
              const textToBeExtracted = text;
              console.log(textToBeExtracted);
            });
        });
    };

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default TextSelectTest;