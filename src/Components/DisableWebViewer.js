import React from 'react';
import WebViewer from '@pdftron/webviewer';



/*
Examples of programmtically working with annotations
*/
class DisableFeatureWebViewer extends React.Component {

    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf'
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            //instance.disableFeatures(instance.Feature.Download);
            //instance.disableFeatures(instance.Feature.Print);

            // hide the Shapes, Edit and Insert toolbar groups.
            //instance.UI.disableElements([ "ribbons", "toolsHeader", "panToolButton", "selectToolButton", "searchButton", "toggleNotesButton", "fullscreenButton", "themeChangeButton" ]);
            //instance.UI.disableElements(['toolbarGroup-Edit']);
            //instance.UI.disableElements(['toolbarGroup-Insert']);
        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default DisableFeatureWebViewer;