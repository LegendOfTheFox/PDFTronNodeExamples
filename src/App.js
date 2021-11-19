import React from 'react';

import './App.css';
import BasicWebViewer from "./Components/BasicWebViewer";
import DisableWebViewer from "./Components/DisableWebViewer";
import FormFillingWebViewer from "./Components/FormFilling";
import PSPDFKITBasicViewer from "./Components/PSPDFKitBasicViewer"

const App = () => {

  return (
    <div className="App">
      <PSPDFKITBasicViewer document={"/files/PDFTRON_about.pdf"} />
    </div>
  );
};

export default App;
