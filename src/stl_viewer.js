import React from 'react';
import { StlViewer } from 'react-stl-viewer';
import './STLViewer.css'; // Import CSS file

const STLViewerComponent = ({ stlUrl }) => {
    const style = {
        top: 0,
        left: 0,
        width: '100%',
        height: '80%',
    };

    return (
        <div className="stl-viewer-container">
            <p className="viewer-title">3D Viewer</p>
            {stlUrl && ( // Render STL viewer if STL URL is available
                <StlViewer
                    style={style}
                    orbitControls
                    shadows
                    showAxes={true}
                    url={stlUrl} // Use the provided STL URL
                    onFinishLoading={() => console.log('Model loaded successfully')}
                    onError={(err) => console.error('Error loading model:', err)}
                />
            )}
        </div>
    );
};

export default STLViewerComponent;
