import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class CustomStamp extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: this.props.document,
                licenseKey: globals.KEY,
                enableMeasurement: true,
                fullAPI: true
            },
            document.getElementById('viewer'),
        ).then( async (instance) => {
            const { documentViewer, PDFNet } = instance.Core;
            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);

            documentViewer.addEventListener("documentLoaded", async () => {

                const pageNumber = 1; // Extract the text in the first page
                const doc = await instance.Core.documentViewer.getDocument();

                console.log(doc);
                const text = await doc.loadPageText(pageNumber);
                // .. do something with text
                console.log(text);

                const quads = await doc.getTextPosition(pageNumber, 0, 1)

                console.log(quads);

                const doc2 = await instance.Core.documentViewer.getDocument().getPDFDoc();

                // Run PDFNet methods with memory management
                await PDFNet.runWithCleanup(async () => {

                // lock the document before a write operation
                // runWithCleanup will auto unlock when complete
                doc2.lock();
                const s = await PDFNet.Stamper.create(PDFNet.Stamper.SizeType.e_relative_scale, 0.5, 0.5);

                await s.setAlignment(PDFNet.Stamper.HorizontalAlignment.e_horizontal_center, PDFNet.Stamper.VerticalAlignment.e_vertical_top);
                const font = await PDFNet.Font.create(doc2, PDFNet.Font.StandardType1Font.e_courier);
                await s.setFont(font);
                const redColorPt = await PDFNet.ColorPt.init(1, 0, 0, 0);
                await s.setFontColor(redColorPt);
                await s.setTextAlignment(PDFNet.Stamper.TextAlignment.e_align_right);
                await s.setAsBackground(false);
                const pgSet = await PDFNet.PageSet.createRange(1, 2);
                await s.stampText(doc2, 'This is a title!', pgSet);
                });
                // clear the cache (rendered) data with the newly updated document
                documentViewer.refreshAll();
                // Update viewer to render with the new document
                documentViewer.updateView();
                // Refresh searchable and selectable text data with the new document
                documentViewer.getDocument().refreshTextData();
            })
            
        })
    };

    render() {
        return (<React.Fragment>
          
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
            </div>
        </React.Fragment>);
    }
}

export default CustomStamp;