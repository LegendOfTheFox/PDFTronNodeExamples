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
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            document.getElementById('viewer'),
        ).then( (instance) => {
          const { documentViewer, annotationManager, PDFNet, Annotations } = instance.Core;
          const fieldManager = annotationManager.getFieldManager();
          const { Tools } = instance.Core;


          // const newActionButton = {
          //     type: 'toggleElementButton',
          //     img: '/images/foxsamplepng.png',
          //     toolName: 'Test',
          //     onClick: () => {
          //         //alert('Foxy Test!');
          //         //const stampAnnot = new Annotations.StampAnnotation();
          //        // const tool = documentViewer.getTool('AnnotationCreateRubberStamp');
          //       //  documentViewer.setToolMode('AnnotationCreateRubberStamp')
          //       const formFillCrossTool = new Tools.RubberStampCreateTool(this, undefined);

          //       formFillCrossTool.useStamp({
          //         'Icon': '/images/foxsamplepng.png',
          //         'Width': 23,
          //         'Height': 23
          //         //'FillColor': new Color(0, 0, 0, 1)
          //       });

          //       documentViewer.setToolMode(formFillCrossTool);
          //         //console.log(tool);
          //         console.log("Test")
          //     },
          //     dataElement: 'alertButton',
          //     hidden: ['mobile']
          // }

          // instance.UI.setHeaderItems(header => {
          //       header.push(newActionButton);
          // })

            //checkStampToolButton
          //const tool = documentViewer.getTool('AnnotationCreateCheckStamp');


          instance.UI.updateTool('AnnotationCreateArrow', {
            buttonImage: 'https://www.pdftron.com/favicon-32x32.png'
          });

          instance.UI.updateElement('crossStampToolButton', {
            img: 'https://www.pdftron.com/favicon-32x32.png'
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

export default FormFillingWebViewer;