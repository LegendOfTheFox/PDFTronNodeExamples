import React from 'react';

import './App.css';
import BasicWebViewer from "./Components/BasicWebViewer";
import DisableWebViewer from "./Components/DisableWebViewer";
import DisplayMode from "./Components/DisplayMode";
import FormFillingWebViewer from './Components/FormFilling';
import BlurredWebViewer from "./Components/BlurredWebViewer";
import CustomStamp from "./Components/CustomStamp";
import CustomAnnotationIdCard from "./Components/CustomAnnotationIdCard";

const App = () => {
  const document = '/files/PDFTRON_about.pdf';

  return (
    <div className="App">
      <CustomAnnotationIdCard document={document} />
    </div>
  );
};

export default App;
