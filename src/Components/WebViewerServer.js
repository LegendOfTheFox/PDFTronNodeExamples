import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class WebViewerServer extends React.Component {
    componentDidMount() {

        var startTime = performance.now();
        WebViewer(
            {
                path: '/webviewer/lib',
                webviewerServerURL: "http://localhost:8090",
                licenseKey: globals.KEY
            },
            document.getElementById('viewer'),
        ).then( async (instance) => {
            const { documentViewer } = instance.Core;

            let serverURL = `http://192.168.0.137:3000/wvserver/${this.props.document}`;
            
            instance.UI.loadDocument(serverURL);

            documentViewer.on('documentLoaded', () => {
                var endTime = performance.now();
		        console.log(`Load Document took ${endTime - startTime} milliseconds`);
                
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

export default WebViewerServer;