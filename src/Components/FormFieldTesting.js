import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class FormFieldTesting extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/form-1040.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { docViewer, Annotations } = instance;
            const annotManager = docViewer.getAnnotationManager();
            const fieldManager = annotManager.getFieldManager();

            const checkField = (field) => {
              // Do something with data
              const { name, value } = field;
              
              // Check children fields
              field.children.forEach(checkField);
            }

            annotManager.on('fieldChanged', (field, value) => {
              // Do something with data
              console.log("Field Changed");
              console.log(field.type);
              console.log(value);
            })

            docViewer.on('documentLoaded', () => {
               
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

export default FormFieldTesting;