import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class PSPDFKitServer extends React.Component {
    componentDidMount() {
      console.log("PSPDFKit")
      let PSPDFKit = window.PSPDFKit;
      let documentId = "7KPZZJBCW6AFSH3AAY2ERJ3XN2";
      
        fetch(`http://localhost:3000/documents/${documentId}`, {
          //mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( async res => {
          console.log("What is the res");
          
          let data = await res.json();

          console.log(data.documentId);

          var startTime = performance.now();
          PSPDFKit.load({
            container: "#pspdfkit",
            documentId: data.documentId,
            authPayload: { jwt: data.jwt },
            instant: true
          })
            .then(function (instance) {
              console.log("PSPDFKit loaded", instance);

              var endTime = performance.now();
              console.log(`Load Document took ${endTime - startTime} milliseconds`);
            })
            .catch(function (error) {
              console.error(error.message);
            });

        });
        

    };

    render() {
        return (<React.Fragment>
                  <div id="pspdfkit" style={{width: "100%", "max-width": "800px", height: "480px"}}></div>
                </React.Fragment>);
    }
}

export default PSPDFKitServer;