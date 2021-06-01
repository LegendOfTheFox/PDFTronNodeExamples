import React from 'react';

import './App.css';
import BasicWebViewer from "./Components/BasicWebViewer";
import ExtractSignatureWebViewer from "./Components/ExtractSignatureWebViewer";

const App = () => {

  return (
    <div className="App">

      <ExtractSignatureWebViewer />
    </div>
  );
};

export default App;
