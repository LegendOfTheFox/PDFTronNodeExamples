import React from 'react';

import './App.css';
import BasicWebViewer from "./Components/BasicWebViewer";
import ExtractSignatureWebViewer from "./Components/ExtractSignatureWebViewer";
import CustomizedWebViewer from "./Components/CustomizedWebViewer/CustomizedWebViewer";
import AnnotationWebViewer from "./Components/AnnotationWebViewer";
import ProgrammaticAnnotationWebViewer from "./Components/ProgrammaticAnnotationWebViewer";
import DisableFeatureWebViewer from "./Components/DisableWebViewer";

const App = () => {

  return (
    <div className="App">
      <ProgrammaticAnnotationWebViewer />
    </div>
  );
};

export default App;
