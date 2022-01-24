import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
Adjusting some form filling behaviors

*/
class FormFillingWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/form.pdf',
            },
            document.getElementById('viewer'),
        ).then( (instance) => {
          const { documentViewer, annotationManager, PDFNet, Annotations } = instance.Core;
          const { WidgetFlags } = Annotations;
          
          const getFieldNameAndValue = (field) => {
            //console.log(field);

            if(field.widgets && field.widgets.length > 0){
              console.log(field.widgets[0].rect);


              // set flags for required
              const flags = new WidgetFlags();
              flags.set('Required', true);

              // create a form field
              const sigField = new Annotations.Forms.Field("some signature field name", { 
                type: 'Sig', 
                flags,
              });

              // create a widget annotation
              const widgetAnnot = new Annotations.SignatureWidgetAnnotation(sigField, {
                appearance: '_DEFAULT',
                appearances: {
                  _DEFAULT: {
                    Normal: {
                      data:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC',
                      offset: {
                        x: 100,
                        y: 100,
                      },
                    },
                  },
                },
              });

              // set position and size
              widgetAnnot.PageNumber = 1;
              widgetAnnot.X = field.widgets[0].X;
              widgetAnnot.Y = field.widgets[0].Y;
              widgetAnnot.Width = field.widgets[0].Width;
              widgetAnnot.Height = field.widgets[0].Height;

              //add the form field and widget annotation
              annotationManager.addAnnotation(widgetAnnot);
              annotationManager.drawAnnotationsFromList([widgetAnnot]);
              annotationManager.getFieldManager().addField(field);
            }

            // Check children fields
            field.children.forEach(getFieldNameAndValue);
          }

          documentViewer.addEventListener('annotationsLoaded', () => {
            const fieldManager = annotationManager.getFieldManager();
            //fieldManager.forEachField(getFieldNameAndValue);
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

export default FormFillingWebViewer;