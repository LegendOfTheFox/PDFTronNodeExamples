import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
OCG
*/
class OCGWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/ocgsample.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {

            const { docViewer, PDFDoc } = instance;

            docViewer.on('documentLoaded', async () => {

                let doc = docViewer.getDocument();
                console.log(typeof doc);

                //const initCfg = await doc.getOCGConfig();

                doc.getLayersArray().then(layers => {
                    layers.forEach((layer, index) => {
                        layers[index].visible = false;
                    });

                    doc.setLayersArray(layers);

                    docViewer.refreshAll();
                    docViewer.updateView();
                })





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

export default OCGWebViewer;