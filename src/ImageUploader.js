import React, { useState } from 'react';
import axios from 'axios';
import './ImageUploader.css'; // Import CSS file
import spinner from './spinner.gif'; 

const placeholderImage = require('./placeholder.png');

const ImageUploader = ({ setStlUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(placeholderImage);
  const [uploadMessage, setUploadMessage] = useState('');
  const [imageName, setImageName] = useState('');
  const [isConverting, setIsConverting] = useState(false); // State to control spinner visibility

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Store the image name
    setImageName(file.name);

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.data === 'No file received') {
        setUploadMessage('No Image Selected');
      } else {
        setUploadMessage('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('Error uploading image');
    }
  };

  const handleConvertButtonClick = async () => {
    try {
      setIsConverting(true);
      setStlUrl(`http://localhost:5000/convert?imageName=${imageName}`);
  
      const pollConversionStatus = async () => {
        try {
          const response = await axios.get('http://localhost:5000/is_done');
          console.log(response.data.done)
          if (response.data.done) {
            setIsConverting(false);
          } else {
            setTimeout(pollConversionStatus, 1000); // Poll again after 1 second
          }
        } catch (error) {
          console.error('Error checking conversion status:', error);
          //setIsConverting(false);
        }
      };
  
      pollConversionStatus();
    } catch (error) {
      console.error('Error converting to 3D:', error);
      setIsConverting(false);
    }
  };
  


  return (
    <div className="image-uploader-container">
      <p className="upload-title">Upload image to get 3D CAD model</p>
      <div className="input-container">
        <input type="file" id="file-input" onChange={handleFileChange} accept="image/*" />
        <img src={previewURL} alt="Preview" className="preview-image" onClick={() => document.getElementById('file-input').click()} />
      </div>
      <button className="upload-button" onClick={handleSubmit}>Upload Image</button>
      <p className="upload-message">{uploadMessage}</p>
      <button className="convert-button" onClick={handleConvertButtonClick}>Convert To 3D</button>
      {isConverting && <img src={spinner} alt="Spinner" className="spinner" />}
    </div>
  );
};

export default ImageUploader;
