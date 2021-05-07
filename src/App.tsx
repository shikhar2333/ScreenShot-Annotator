import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import ScreenCapture  from './ScreenCapture';
import FullScreenCapture from './FullScreenCapture';

interface StartCapture {
  onStartCapture: () => void;
}

const RandomText = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
      distinctio exercitationem a tempore delectus ducimus necessitatibus
      dolor voluptatum aut est quaerat aspernatur, vero quod aperiam odio.
      Exercitationem distinctio in voluptates?
    </p>
  );
};

function App() {
  const [screenCapture, setScreenCapture] = useState('');
  const handleScreenCapture = (screenCapture: string) => {
    setScreenCapture(screenCapture);
  };

  const handleSave = () => {
    const screenCaptureSource = screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  // console.log(screenCapture);
  return (
    <div>
      {/* <ScreenCapture onEndCapture={handleScreenCapture}>
      {(props: StartCapture ) => (
          <div>
              <button onClick={props.onStartCapture}>Capture</button>
              <RandomText/>
              <RandomText/>
              <RandomText/>
              <div>
                  <p>
                    {screenCapture && <button onClick={handleSave}>Download</button>}
                  </p>
             </div>
          </div>
      )}
    </ScreenCapture> */}
    <FullScreenCapture onEndCapture={handleScreenCapture}>
      {(props: StartCapture ) => (
          <div>
              <button onClick={props.onStartCapture}>Full Screen Capture</button>
              <RandomText/>
              <RandomText/>
              <RandomText/>
              <div>
                  <p>
                    {screenCapture && <button onClick={handleSave}>Download</button>}
                  </p>
             </div>
          </div>
      )}
    </FullScreenCapture>
    </div>
  );
}
export default App;
