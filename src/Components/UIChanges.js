import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
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

            let items = contextMenuPopup.getItems();
            console.log(items);

            contextMenuPopup.add({
              type: 'actionButton',
              label: 'zoom',
              onClick: () => instance.setToolMode('MarqueeZoomTool')
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

export default UIChanges;