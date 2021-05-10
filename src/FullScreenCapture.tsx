import React, { ReactNode, useEffect, useState } from 'react';
import { drawCanvas, Window } from './ScreenShotUtils';

interface FullScreenShotProps {
  children?: ReactNode;
  onEndCapture: (url: string) => void;
}

const FullScreenCapture: React.FC<FullScreenShotProps> = ( ({children, ...props}: FullScreenShotProps) => {
    const {
        onEndCapture
    } = props;

    const [windowState, setWindowState ] = useState<Window>({windowWidth: 0, windowHeight: 0 });

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

    const handleClickTakeScreenShot = () => {
        const CaptureFunction  = {
          onEndCapture: onEndCapture
        };
        const cropState = {
            cropPositionTop: 0,
            cropPositionLeft: 0,
            cropWidth: windowState.windowWidth,
            cropHeight: windowState.windowHeight
        };
        drawCanvas(cropState, CaptureFunction);
    }
    const renderChild = () => {
        const props = {
          onStartCapture: handleClickTakeScreenShot
        };

        console.log(typeof children);
        if (typeof children === 'function') {
          return children(props);
        }

        return children;
    };

    return (
        <div>
            {renderChild()}
        </div>
    )
});
export default FullScreenCapture;