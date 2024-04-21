import React, { useState } from 'react';
import './App.css';
import ImageUploader from './ImageUploader';
import STLViewerComponent from './stl_viewer';

function App() {
  const [stlUrl, setStlUrl] = useState(null);

  return (
    <div className="App">
      <h1>Image Uploader and 3D Viewer</h1>
      <div className="container">
        <div className="uploader">
          <ImageUploader setStlUrl={setStlUrl}/>
        </div>
        <div className="viewer">
          <STLViewerComponent stlUrl={stlUrl}/>
        </div>
      </div>
    </div>
  );
}

export default App;
