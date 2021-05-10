import React, {CSSProperties, ReactNode, useEffect, useState } from 'react';
import './styles.scss';
import { drawCanvas, Window } from './ScreenShotUtils';

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
  
    let newBorderWidth = borderWidth.borderWidth;
    const borderTop = endY >= startY ? startY : endY;
    const borderRight = endX >= startX ? (windowWidth - endX) : (windowWidth - startX);
    const borderBottom = endY >= startY ? (windowHeight - endY) : (windowHeight - startY);
    const borderLeft  = endX >= startX ? startX : endX;

    if (isMouseDown) {
      newBorderWidth = `${borderTop}px ${borderRight}px ${borderBottom}px ${borderLeft}px`;
    }
  
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
    drawCanvas(CaptureFunction);

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