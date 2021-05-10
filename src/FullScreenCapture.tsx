import React, { ReactNode } from 'react';
import { drawCanvas } from './ScreenShotUtils';

interface FullScreenShotProps {
  children?: ReactNode;
  onEndCapture: (url: string) => void;
}

const FullScreenCapture: React.FC<FullScreenShotProps> = ( ({children, ...props}: FullScreenShotProps) => {
    const {
        onEndCapture
    } = props;

    const handleClickTakeScreenShot = () => {
        const CaptureFunction  = {
          onEndCapture: onEndCapture
        };
        drawCanvas(CaptureFunction);
    };

    const renderChild = () => {
        const props = {
          onStartCapture: handleClickTakeScreenShot
        };

        // console.log(typeof children);
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