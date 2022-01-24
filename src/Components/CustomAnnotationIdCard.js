import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class CustomAnnotationIdCard extends React.Component {
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
            const { Annotations, annotationManager, Tools, documentViewer } = instance.Core;
            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);

            const userName = "Bryan Fox"
            const title = "Developer"
            const profilePictureImagePath = "./images/foxsamplepng.png"// Path to your Profile Image
            const checkMarkImagePath = "./images/greencheckmark.png" // Path to Your Checkmark Image

            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            class CardAnnotation extends Annotations.CustomAnnotation {
              constructor() {
                super('card');
                this.Subject = 'Card';
              }

              draw(ctx, pageMatrix) {
                const x = this.X;
                const y = this.Y
                const xOffset = 50
                const yOffset = 24
                const checkmarkOffset = 230

                ctx.beginPath();
                ctx.font = '40px serif';
                ctx.fillText(userName, x + xOffset, (y));
                ctx.font = '20px serif';
                ctx.fillText(title, x + xOffset, (y + yOffset));
                ctx.font = '15px serif';
                ctx.fillText(date, x + xOffset, (y + yOffset*2 ));

                const profilePic = new Image();   // Create new img element
                profilePic.src = profilePictureImagePath;
                ctx.drawImage(profilePic, x, y, 50, 50)

                const checkMarkImage = new Image();   // Create new img element
                checkMarkImage.src = checkMarkImagePath;
                ctx.drawImage(checkMarkImage, x + checkmarkOffset, y, 50, 50)

              }
            }

            // this is necessary to set the elementName before instantiation
            CardAnnotation.prototype.elementName = 'card';

            annotationManager.registerAnnotationType(CardAnnotation.prototype.elementName, CardAnnotation);

            class CardCreateTool extends Tools.GenericAnnotationCreateTool {
              constructor(documentViewer) {
                super(documentViewer, CardAnnotation);
              }
            };

            const cardToolName = 'AnnotationCreateCard';

            const cardTool = new CardCreateTool(documentViewer);
            instance.UI.registerTool({
              toolName: cardToolName,
              toolObject: cardTool,
              buttonImage: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>' +
                '<path fill="none" d="M0 0h24v24H0V0z"/>' +
              '</svg>',
              buttonName: 'cardToolButton',
              tooltip: 'Card Annotation'
            }, CardAnnotation);

            instance.UI.setHeaderItems((header) => {
              header.getHeader('toolbarGroup-Annotate').get('highlightToolGroupButton').insertBefore({
                type: 'toolButton',
                toolName: cardToolName
              });
            });

            documentViewer.addEventListener('documentLoaded', () => {
              // set the tool mode to our tool so that we can start using it right away
              instance.UI.setToolMode(cardToolName);
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

export default CustomAnnotationIdCard;