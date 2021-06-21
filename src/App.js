import React from 'react';

import './App.css';
import BasicWebViewer from "./Components/BasicWebViewer";
import ExtractSignatureWebViewer from "./Components/ExtractSignatureWebViewer";
import CustomizedWebViewer from "./Components/CustomizedWebViewer/CustomizedWebViewer";
import AnnotationWebViewer from "./Components/AnnotationWebViewer";
import ProgrammaticAnnotationWebViewer from "./Components/ProgrammaticAnnotationWebViewer";
import DisableFeatureWebViewer from "./Components/DisableWebViewer";
import CustomAnnotationTriangle from "./Components/CustomAnnotationTriangle";
import CustomAnnotationArc from "./Components/CustomAnnotationArc";

const App = () => {

  return (
    <div className="App">
      {/* <BasicWebViewer /> */}
      <CustomAnnotationArc />
      {/* <CustomAnnotationTriangle /> */}
    </div>
  );
};

export default App;
