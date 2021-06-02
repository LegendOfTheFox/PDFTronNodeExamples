import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Empty Basic Web Viewer
Most Barebones version
*/
class GenericWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {

        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default GenericWebViewer;