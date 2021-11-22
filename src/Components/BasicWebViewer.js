import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class BasicWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                enableMeasurement: true,
                fullAPI: true,
                licenseKey: globals.KEY
            },
            document.getElementById('viewer'),
        ).then( async (instance) => {
            const { documentViewer, annotationManager, PDFNet } = instance.Core;
            const fieldManager = annotationManager.getFieldManager();
            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);
            instance.UI.enableElements(['editTextButton']);

            documentViewer.addEventListener('click', async (e) => {
                console.log("Test")
                await PDFNet.initialize();
                const doc = await documentViewer.getDocument().getPDFDoc();

                await PDFNet.runWithCleanup(async () => {
                
                    doc.lock(); 
                    const replacer = await PDFNet.ContentReplacer.create();
                    const page = await doc.getPage(1);
                    console.log(page);
                    // replace a text placeholder
                    await replacer.addString('', '');
                    await replacer.process(page);
                    // clear the cache (rendered) data with the newly updated document
                });
                documentViewer.refreshAll();
                // Update viewer to render with the new document
                documentViewer.updateView();
                // Refresh searchable and selectable text data with the new document
                documentViewer.getDocument().refreshTextData();
            })

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