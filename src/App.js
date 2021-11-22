import React from 'react';

import './App.css';
import BasicWebViewer from "./Components/BasicWebViewer";
import DisableWebViewer from "./Components/DisableWebViewer";
import FormFillingWebViewer from "./Components/FormFilling";
import PSPDFKITBasicViewer from "./Components/PSPDFKitBasicViewer"

const App = () => {

  return (
    <div className="App">
      <h1>Test</h1>
      <BasicWebViewer />
      {/* <PSPDFKITBasicViewer document={"/files/2gb-sample-file.pdf"} /> */}
    </div>
  );
};

export default App;
