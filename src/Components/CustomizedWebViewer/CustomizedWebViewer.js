import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Example of how to customize the Web Viewer to have different looks based on CSS stylesheet
Example of adding Custom UI Element to the Tool Bar
*/

const newActionButton = {
    type: 'actionButton',
    img: '/images/foxsamplepng.png',
    onClick: () => {
        alert('Foxy Test!');
    },
    dataElement: 'alertButton',
    hidden: ['mobile']
}


class CustomizedWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                css: '/styles/stylesheet.css'
                //config: 'config.js' // path/to/your/config.js
            },
            document.getElementById('viewer'),
        ).then((instance) => {

            instance.setHeaderItems(header => {
                header.push(newActionButton);
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

export default CustomizedWebViewer;