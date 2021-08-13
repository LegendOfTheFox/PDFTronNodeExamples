import React from 'react';
import WebViewer from '@pdftron/webviewer';

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class XFAWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                fullAPI: true
            },
            document.getElementById('viewer'),
        ).then( (instance) => {
            const { docViewer, Annotations, PDFNet } = instance;
            const annotManager = docViewer.getAnnotationManager();

            docViewer.on('documentLoaded', () => {
            
            });

            docViewer.on('mouseLeftDown',  async () => {
              console.log("Click");

              await PDFNet.initialize();

              let doc = await PDFNet.PDFDoc.createFromURL("/files/xfa_file.pdf");
              //let doc = await PDFNet.PDFDoc.createFromURL("/files/A3.pdf");

              //console.log(await doc.getAcroForm());
              let acro_form = await doc.getAcroForm();
              if(acro_form !== null){
                console.log("Acro Forms Present");

                let data = await acro_form.findObj("XFA");
                let page = await doc.getPage(1);

                let newDoc = await PDFNet.PDFDoc.create();
                await newDoc.pagePushFront(page);

                newDoc.flattenAnnotations(true);
                console.log(data);

                instance.loadDocument(newDoc);
                //doc.flattenAnnotations();
                
              }else{
                console.log("Standard PDF");
                instance.loadDocument(doc);
              }

              
              //instance.loadDocument("/files/xfa_file.pdf");
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

export default XFAWebViewer;