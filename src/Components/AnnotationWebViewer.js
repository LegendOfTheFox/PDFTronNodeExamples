import React from 'react';
import WebViewer from '@pdftron/webviewer';

const sampleUser = {
    id: 45454,
    name: 'Bryan',
    position: 'solutions engineer'
}

/*
Examples of what you can do with Annotation functionality
*/
class AnnotationWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                annotationUser: String(sampleUser.id)
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { annotManager } = instance;

            annotManager.on('annotationChanged', (annotations, action, options) => {
                if (action === 'add' && !options.imported) {
                    const annot = annotations[0]
                    annot.setCustomData('userId', String(sampleUser.id))
                }
            })

            const mapNames = () => {
                return sampleUser.name;
            }

            annotManager.setAnnotationDisplayAuthorMap(mapNames);
        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default AnnotationWebViewer;