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
//import OCGWebViewer from './Components/OCGWebViewer';
import ZoomTest from './Components/ZoomTest';
import UIChanges from './Components/UIChanges';
import BasicForm from './Components/BasicForm';
import RemoveAnnotations from "./Components/RemoveAnnotations";
import TemplateGeneration from "./Components/TemplateGenerationTest";
import ViewerOptimizedWebViewer from "./Components/ViewerOptimizedWebViewer";
import FormFieldTesting from "./Components/FormFieldTesting";
import XFATest from "./Components/XFATest";

const App = () => {

  return (
    <div className="App">
      {/* <BasicWebViewer /> */}
      <XFATest />
      {/* <CustomAnnotationTriangle /> */}
    </div>
  );
};

export default App;
