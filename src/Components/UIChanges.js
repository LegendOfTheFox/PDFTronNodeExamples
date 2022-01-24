import React from 'react';
import WebViewer from '@pdftron/webviewer';

class UIChanges extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { contextMenuPopup } = instance;

            let { documentViewer, Annotations } = instance.Core;
            console.log(documentViewer);
            
            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);

            let items = contextMenuPopup.getItems();
            console.log(items);

            documentViewer.getTool('AnnotationCreateDotStamp').setStyles(currentStyle => ({
                FillColor: new Annotations.Color(255, 0, 0)
            }));
            
            const tool = documentViewer.getTool('AnnotationCreateDotStamp');

            tool.addEventListener('annotationAdded', (annotation) => {
                annotation.FillColor = new Annotations.Color(255, 0, 0);
            });

            contextMenuPopup.add({
              type: 'actionButton',
              label: 'zoom',
              onClick: () => documentViewer.rotateClockwise()//instance.setToolMode('MarqueeZoomTool')
            })


            instance.UI.setHeaderItems(header => {
                header.push({
                    title: "Rotate Page",
                    type: 'actionButton',
                    img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                    onClick: async () => {
                        const doc = documentViewer.getDocument();
                        await doc.rotatePages([documentViewer.getCurrentPage()], 1)
                        console.log("Rotation Complete")
                    }
                });

                header.push({
                    title: "Open File",
                    type: 'actionButton',
                    img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                    onClick: () => {
                        var input = document.createElement('input');
                        input.type = 'file';
                        input.onchange = e => { 
                            var file = e.target.files[0]; 
                            instance.UI.loadDocument(file, { filename: file.name });
                            instance.UI.toggleFullScreen();
                        }
                        input.click();
                    }
                });
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

export default UIChanges;