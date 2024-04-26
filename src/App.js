import React, { useState } from 'react';
import './App.css';
import ImageUploader from './ImageUploader';
import STLViewerComponent from './stl_viewer';

function App() {
  const [stlUrl, setStlUrl] = useState(null);

  return (
    <div className="App"> 
      <div className='main'>
        <h1 className='heading'>Convert Single Image to 3D Model</h1>
        <div className="container">
          <div className="uploader">
            <ImageUploader setStlUrl={setStlUrl}/>
          </div>
          <div className="viewer">
            <STLViewerComponent stlUrl={stlUrl}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
