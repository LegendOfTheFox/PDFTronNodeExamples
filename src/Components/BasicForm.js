import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Form Example

*/
class BasicForm extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { annotManager, Annotations } = instance;
            const { WidgetFlags } = Annotations;

            //let fieldManager = Annotations.Forms.FieldManager(annotManager);

            // set flags for multiline and required
            const flags = new WidgetFlags();
            flags.set('Multiline', true);
            flags.set('Required', true);

            // create a form field
            const field = new Annotations.Forms.Field("some text field name", {
            type: 'Tx',
            defaultValue: "99",
            flags,
            });

            // create a widget annotation
            const widgetAnnot = new Annotations.TextWidgetAnnotation(field);

            // set position and size
            widgetAnnot.PageNumber = 1;
            widgetAnnot.X = 100;
            widgetAnnot.Y = 100;
            widgetAnnot.Width = 500;
            widgetAnnot.Height = 20;

            //add the form field and widget annotation
            annotManager.addAnnotation(widgetAnnot);
            annotManager.drawAnnotationsFromList([widgetAnnot]);
            annotManager.getFieldManager().addField(field);
            // annotManager.getFieldManager().fieldChanged(field).then( fieldChanged => {
            //     console.log(fieldChanged);
            // })

            annotManager.on('fieldChanged', (test) => {
console.log("Testing")
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

export default BasicForm;