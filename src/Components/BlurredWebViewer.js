import React from 'react';
import WebViewer from '@pdftron/webviewer';
import globals from '../config/globals';

class BlurredWebViewer extends React.Component {
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
            const { documentViewer, annotationManager, Annotations } = instance.Core;

            instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);


            documentViewer.addEventListener('documentLoaded', () => {
              let canvas = document.getElementById('viewer');
              let overlay = document.getElementById('overlay');

              console.log(overlay);

              var ctx = overlay.getContext("2d");
              
            // ctx.globalAlpha = 0.8;
              //
              // ctx.filter = 'blur(200px)';
              ctx.fillStyle = "red"
              //ctx.arc(100, 100, 25, 0, Math.PI * 2);
              //ctx.clip("evenodd");   
              ctx.fillRect(0, 0, 1000, 1000);

              ctx.clearRect(100, 50, 120, 150);
              

              
          


            // insert into DOM on top:
            //canvas.parentNode.insertBefore(topCanvas, canvas);
            })
            

            
        })
    };

    render() {
        return (<React.Fragment>
          
            <div className="webviewer" id="viewer" style={{ height: "100vh" }}>
              <canvas className="Overlay" id="overlay" ></canvas>
            </div>
        </React.Fragment>);
    }
}

export default BlurredWebViewer;