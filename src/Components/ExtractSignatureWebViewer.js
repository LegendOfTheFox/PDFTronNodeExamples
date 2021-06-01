import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

// Azure Dependencies
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');
const sasToken = globals.SAS_TOKEN;
const containerName = globals.STORAGE_CONTAINER;
const storageAccountName = globals.STORAGE_ACCOUNT;

/*
Extracting an annotation to an Azure Blob in React
*/
const createBlobInContainer = async (file) => {
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    const containerClient = blobService.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(`annotationsample-${uuidv1()}.png`);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    await blobClient.uploadData(file, options);
}

async function extractAnnotation(annotation, docViewer) {
    // Create a new Canvas to draw the Annotation on
    const canvas = document.createElement('canvas');
    // Reference the annotation from the Document
    const pageMatrix = docViewer.getDocument().getPageMatrix(annotation.PageNumber);

    // Set the height & width of the canvas to match the annotation
    canvas.height = annotation.Height;
    canvas.width = annotation.Width;
    const ctx = canvas.getContext('2d');

    // Translate the Annotation to the top Top Left of the Canvas ie (0, 0)
    ctx.translate(-annotation.X, -annotation.Y);

    // Draw the Annotation onto the Canvas
    annotation.draw(ctx, pageMatrix);

    // Convert the Canvas to a Blob Object for Upload
    canvas.toBlob((blob) => {
        createBlobInContainer(blob);
    });
}

class ExtractSignatureWebViewer extends React.Component {
    componentDidMount() {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/demo-annotated.pdf',
            },
            document.getElementById('viewer'),
        ).then((instance) => {
            const { annotManager, docViewer } = instance;

            docViewer.on('annotationsLoaded', async () => {
                annotManager.on('annotationSelected', async (annotationList, action) => {
                    for (let annotation in annotationList) {
                        await extractAnnotation(annotationList[annotation], docViewer);
                    }
                })
            });
        });
    }

    render() {
        return (<React.Fragment>
            <div className="webviewer" id="viewer" >
            </div>
        </React.Fragment>);
    }
}

export default ExtractSignatureWebViewer;