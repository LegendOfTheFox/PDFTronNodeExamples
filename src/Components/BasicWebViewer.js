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
                initialDoc: '/files/vadim2.pdf',
                enableMeasurement: true,
                webviewerServerURL: 'http://localhost:8091/',
            },
            document.getElementById('viewer'),
        ).then( (instance) => {
            const { documentViewer, annotationManager, PDFNet } = instance.Core;
            const fieldManager = annotationManager.getFieldManager();
            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);
            //instance.UI.loadDocument()
            
            //instance.UI.loadDocument(convertedDoc);
            instance.UI.setHeaderItems(function(header) {
                header.unshift({
                    type: 'customElement',
                    render: () => {
                    const newElement = document.createElement('h1');
                    newElement.textContent = "10"// Feed your custom value here;
                    newElement.style.width = '10px';
                    newElement.style.marginLeft = '10px';
                    newElement.style.cursor = 'pointer';
                    newElement.onclick = () => {
                        //Do Something
                    }
                    return newElement;
                    }
                }, 
                {
                    type: 'spacer'
                });
            });

            annotationManager.addEventListener('annotationChanged', (annotations, action, { imported }) => {  
            

            });

          

        })


    };

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default BasicWebViewer;