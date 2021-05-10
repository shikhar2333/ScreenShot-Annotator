import React, {CSSProperties, ReactNode, useEffect, useState } from 'react';
import './styles.scss';
import 'math-abs';
import { drawCanvas, CropProps, Window } from './ScreenShotUtils';

interface ImageCoordinates {
  startX: number;
  startY: number;
}

interface CrossHair {
  crossHairsTop: number,
  crossHairsLeft: number,
}

interface BorderWidth {
  borderWidth: number | string | CSSProperties;
}

interface ScreenShotProps {
  children?: ReactNode;
  onEndCapture: (url: string) => void;
}

const ScreenCapture: React.FC<ScreenShotProps> = ( ({children, ...props}: ScreenShotProps) => { 
  const {
    onEndCapture
  } = props;

  const [on, setOn] = useState<boolean>(false);
  // const [escape, setEscape] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [imageCoord, setImageCoord] = useState<ImageCoordinates>({startX:0, startY:0});
  // const [imageURL, setImageURL] = useState<string>('');
  const [windowState, setWindowState] = useState<Window>({windowWidth:0, windowHeight: 0});
  const [borderWidth, setBorderWidth] = useState<BorderWidth>({borderWidth: 0});
  const [cropState, setCropState] = useState<CropProps>({cropPositionTop: 0, cropPositionLeft: 0, cropWidth: 0, cropHeight: 0});
  const [crossHair, setCrossHair] = useState<CrossHair>({crossHairsLeft: 0, crossHairsTop: 0});

  const handleWindowResize = () => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    setWindowState({
      windowWidth,
      windowHeight,
    });
  };

  useEffect( () => {
      handleWindowResize();
  }, []);

  window.addEventListener("resize", handleWindowResize);
  const handStartCapture = () => setOn(true);

  const handleMouseMove = (e: any) => {
    const { windowWidth, windowHeight } = windowState;
    const { startX, startY } = imageCoord;
    const endX = e.clientX;
    const endY = e.clientY;
    const cropPositionTop = endY >=startY ? startY : endY;
    const cropPositionLeft = endX >= startX ? startX : endX;
  
    let newBorderWidth = borderWidth.borderWidth;
    const abs = require('math-abs');
    const cropWidth = abs(startX - endX)*window.devicePixelRatio;
    const cropHeight = abs(startY - endY)*window.devicePixelRatio;
    const borderTop = endY >= startY ? startY : endY;
    const borderRight = endX >= startX ? (windowWidth - endX) : (windowWidth - startX);
    const borderBottom = endY >= startY ? (windowHeight - endY) : (windowHeight - startY);
    const borderLeft  = endX >= startX ? startX : endX;

    if (isMouseDown) {
      newBorderWidth = `${borderTop}px ${borderRight}px ${borderBottom}px ${borderLeft}px`;
    }
    
    setCropState({
      cropPositionTop: cropPositionTop,
      cropPositionLeft: cropPositionLeft,
      cropWidth: cropWidth,
      cropHeight: cropHeight,
    })
    setBorderWidth({
      borderWidth: newBorderWidth
    });
    setCrossHair({
      crossHairsTop: e.clientY,
      crossHairsLeft: e.clientX,
    });
  };

  const handleMouseDown = (e: any) => {
    const startX = e.clientX;
    const startY = e.clientY;
    setImageCoord({
      startX: startX,
      startY: startY
    });
    const prevCropState = cropState;
    setCropState({
      cropPositionTop: startY,
      cropPositionLeft: startX,
      cropWidth: prevCropState.cropWidth,
      cropHeight: prevCropState.cropHeight
    });
    setIsMouseDown(true);
    const { windowWidth, windowHeight } = windowState;
    setBorderWidth({
      borderWidth: `${windowWidth}px ${windowHeight}px`,
    });
  };

  const handleMouseUp = () => {
    handleClickTakeScreenShot();
    setOn(false);
    setIsMouseDown(false);
    setBorderWidth({
      borderWidth: 0
    });
  };

  const handleClickTakeScreenShot = () => {
    const CaptureFunction  = {
      onEndCapture: onEndCapture
    };
    drawCanvas(cropState, CaptureFunction);

    setCrossHair({
      crossHairsTop: 0,
      crossHairsLeft: 0,
    });
  };

  const renderChild = () => {
    const props = {
      onStartCapture: handStartCapture
    };

    if (typeof children === 'function') {
      return children(props);
    }

    return children;
  };

  const {
    crossHairsTop,
    crossHairsLeft,
  } = crossHair;
  const bwidth = borderWidth.borderWidth;
    
  if (!on) {
    return renderChild();
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {renderChild()}
      <div
        className={`overlay ${isMouseDown && 'highlighting'}`}
        style={{ borderWidth: `${bwidth}` }}
      />
      <div
        className='crosshairs'
        style={{left: crossHairsLeft + 'px', top: crossHairsTop + 'px'}}
      />
  </div>
  );

});
export default ScreenCapture;