const { PDFNet } = require("@pdftron/pdfnet-node");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        data: "Hello from the server"
    })
});

/*
Sample endpoint showcases how values can be subbed out of a template PDF and be replaced with values of your choice
Values to replaced should be within []. Examples on the pdf include [QuoteNumber] & [CustomerName]
*/
app.get("/generateInvoice", (req, res) => {
    const inputPath = path.resolve(__dirname, "./files/sampleword.pdf");
    const outputPath = path.resolve(__dirname, "./files/sampleword_replaced.pdf");

    const replaceText = async () => {
        // Build the PDF
        const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
        // Lockdown the file
        await pdfdoc.initSecurityHandler();
        // Create replacer object
        const replacer = await PDFNet.ContentReplacer.create();
        // Grab the page you want to perform the replace on
        const page = await pdfdoc.getPage(1);

        // Sub out the values
        await replacer.addString("QuoteNumber", "6452");
        await replacer.addString("CustomerName", "Bryan Fox");
        await replacer.addString("AddressLine1", "100 Front St.");
        await replacer.addString("AddressLine2", "Toronto, Ont");
        await replacer.addString("Item1", "Apples");
        await replacer.addString("Item1Qnt", "28");
        await replacer.addString("Item1Total", "28");
        await replacer.addString("Total", "28");
        await replacer.addString("ExpiryDate", new Date(Date.now()).toLocaleDateString());

        // Process all of the changes
        await replacer.process(page);

        // Save the changes, PDF is being linearized for speed and allows the document to be chunked before viewing
        pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
    }

    PDFNet.runWithCleanup(replaceText).then(() => {
        fs.readFile(outputPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err);
            } else {
                res.setHeader("ContentType", "application/pdf");
                res.end(data);
            }
        })
    }).catch(err => {
        res.statusCode = 500;
        res.end(err);
    });
});

/*
Sample shows how to add a watermark to your document. Watermarks can either be text or images
*/
app.get("/watermark", (req, res) => {
    const { filename, watermark } = req.query;

    console.log(filename);
    console.log(watermark);

    const inputPath = path.resolve(__dirname, `./files/${filename}.pdf`);
    const outputPath = path.resolve(__dirname, `./files/${filename}_watermarked.pdf`);

    const watermarkPDF = async () => {
        const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
        pdfdoc.initSecurityHandler();

        // Create the stample object and define where the stamping will occur by the bounds of the document and scaling
        const stamper = await PDFNet.Stamper.create(PDFNet.Stamper.SizeType.e_relative_scale, 0.5, 0.5);

        // Set the stamplers alignment
        stamper.setAlignment(PDFNet.Stamper.HorizontalAlignment.e_horizontal_center,
            PDFNet.Stamper.VerticalAlignment.e_vertical_center);

        // Set the color of the Text used in this example, RGB value
        const redColorPt = await PDFNet.ColorPt.init(1, 0, 0);
        stamper.setFontColor(redColorPt);
        // Set the range of pages that will have the watermark applied to them
        const pgSet = await PDFNet.PageSet.createRange(1, await pdfdoc.getPageCount());
        // Perform the watermarking
        await stamper.stampText(pdfdoc, watermark, pgSet);

        await pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
    }

    PDFNet.runWithCleanup(watermarkPDF).then(() => {
        fs.readFile(outputPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err);
            } else {
                res.setHeader("ContentType", "application/pdf");
                res.end(data);
            }
        })
    }).catch(err => {
        res.statusCode = 500;
        res.end(err);
    });
})

/*
    This example converts a .docx file to a pdf
*/
app.get("/convertFromOffice", (req, res) => {
    const { filename } = req.query;

    const inputPath = path.resolve(__dirname, `./files/${filename}`);
    const outputPath = path.resolve(__dirname, `./files/${filename}.pdf`);

    const convertToPDF = async () => {
        // empty PDF to hold the file
        const pdfdoc = await PDFNet.PDFDoc.create();
        await pdfdoc.initSecurityHandler();
        // perform the actual conversion
        await PDFNet.Convert.toPdf(pdfdoc, inputPath);
        pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
    }

    PDFNet.runWithCleanup(convertToPDF).then(() => {
        fs.readFile(outputPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err);
            } else {
                res.setHeader("ContentType", "application/pdf");
                res.end(data);
            }
        })
    }).catch(err => {
        res.statusCode = 500;
        res.end(err);
    });
});

/*
    This sample performs the generation of a graphical thumbnail of a PDF
*/
app.get("/thumbnail", (req, res) => {
    const { filename } = req.query;

    const inputPath = path.resolve(__dirname, `./files/${filename}`);
    const outputPath = path.resolve(__dirname, `./files/${filename}.png`);

    const getThumbFromPDF = async () => {
        const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
        await doc.initSecurityHandler();

        // create the Drawing object, defining a DPI value for the final image
        const pdfDraw = await PDFNet.PDFDraw.create(92);
        // grab the page you want to convert into the thumbnail
        const currPage = await doc.getPage(1);
        // export the actual page, defining the output type 
        await pdfDraw.export(currPage, outputPath, 'PNG');
    }

    PDFNet.runWithCleanup(getThumbFromPDF).then(() => {
        fs.readFile(outputPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err);
            } else {
                res.setHeader("ContentType", "image/png");
                res.end(data);
            }
        })
    }).catch(err => {
        res.statusCode = 500;
        res.end(err);
    });
});

/*
This sample extracts text from a page within a PDF and returns the raw String values
*/
app.get("/textExtract", (req, res) => {
    const { filename, pageNumber } = req.query;

    const inputPath = path.resolve(__dirname, `./files/${filename}`);

    const extractText = async () => {
        const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
        await doc.initSecurityHandler();
        // Define the page # to extract the text from
        const page = await doc.getPage(Number(pageNumber));
        // Create the Text Extractor object
        const txt = await PDFNet.TextExtractor.create();
        // Define the area that the extraction will be executed on, this can allow you to clip out certain areas of the document
        const rect = new PDFNet.Rect(0, 0, 612, 794);
        // read in the data based on the page selected and the defined bounding coordinates
        txt.begin(page, rect);
        // perform the actual text extractions
        const text = await txt.getAsText();

        res.status(200).json({
            status: "success",
            data: text
        })
    }

    PDFNet.runWithCleanup(extractText).then(() => {

    }).catch(err => {
        res.statusCode = 500;
        res.end(err);
    });
});

app.listen(4000, () => {
    console.log("App is running");
});