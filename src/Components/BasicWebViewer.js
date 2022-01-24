import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class BasicWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: this.props.document,
                licenseKey: globals.KEY,
                enableMeasurement: true,
                fullAPI: true
            },
            document.getElementById('viewer'),
        ).then( async (instance) => {
            const { documentViewer, annotationManager, Annotations } = instance.Core;

            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);
            

            documentViewer.addEventListener('documentLoaded', async () => {
                const doc = documentViewer.getDocument();
                await doc.documentCompletePromise();
                documentViewer.updateView();

                const keys = await doc.getTemplateKeys();
                console.log(keys);
            });

            annotationManager.on('annotationChanged', (annotations, action) => {
                console.log(annotations);
                console.log(action);
                
                if (action === 'add') {
                    annotations[0].NoZoom = false;
                    annotationManager.updateAnnotation(annotations[0]);
                }
            })
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