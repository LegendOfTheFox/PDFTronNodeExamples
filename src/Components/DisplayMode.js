import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class DisplayMode extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                licenseKey: globals.KEY,
            },
            document.getElementById('viewer'),
        ).then( async (instance) => {
            const { documentViewer } = instance.Core;

            

            documentViewer.addEventListener('documentLoaded', () => {
                const displayMode = new instance.Core.DisplayMode(documentViewer, 'Single');
                documentViewer.getDisplayModeManager().setDisplayMode(displayMode);
            });
        })
        //https://www.pdftron.com/api/web/Core.html#.DisplayModes__anchor
        //https://www.pdftron.com/api/web/Core.DisplayModeManager.html#setDisplayMode

        

    };

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default DisplayMode;