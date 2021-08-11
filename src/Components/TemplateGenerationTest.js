import React from 'react';
import WebViewer from '@pdftron/webviewer';

const json_data_string = {
        "legal_heading":"End-User Agreement",
        "indemnification_clause":"Sed ut unde omnis iste natus error sit volup tatem dolo remque laud antium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi tecto beatae vitae dicta sunt.",
        "escrow_clause":"Lorem ipsum dolor sit amet, consec  tetuer adipi scing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pena tibus et magnis dis partu rient montes, nascetur ridiculus mus. Donec quam felis, ultri cies nec, pellent esque faucibus. Nullam quis ante. Etiam sit amet orci eget eros fauc ibus tinc idunt. Duis leo. Sed frin gilla mauris sit amet nibh. Donec sodales sag ittis magna. Sed conse quat, leo eget",
        "arbitration_clause":"pretium quis, sem. Nulla conse quat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venen atis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tinc",
        //"image_url": {image_url: "./files/fox.jpg", width: 500, height: 500}
        "image_url": {image_url: "http://www.httpvshttps.com/letsencrypt-logo-horizontal.svg", width: 500, height: 500}
    };

/*
This example is drawing a Rectangle Annotation onto the page.

*/
class TemplateGeneration extends React.Component {
    componentDidMount() {



        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
                fullAPI: true
                
            },
            document.getElementById('viewer'),
        ).then(async (instance) => {
          //const { PDFNet } = instance.CoreControls;
          instance.CoreControls.enableFullPDF(true);
          const { docViewer, PDFNet} = instance.CoreControls;
          
          instance.disableFeatures(instance.Feature.Download);
          //let options = await PDFNet.;
          
          //await options.setTemplateParamsJson(JSON.stringify(json_data_string));

          // perform the conversion with the template replacement data
          //const pdfdoc = await instance.PDFNet.Convert.officeToPdfWithPath("/files/templatetest.docx", options);

          //await pdfdoc.save('/files/template-1.pdf', 0);

            //const { docViewer, Annotations } = instance;
           // const annotManager = docViewer.getAnnotationManager();

        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default TemplateGeneration;