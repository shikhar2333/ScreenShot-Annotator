import html2canvas from 'html2canvas';

export interface CropProps {
    cropPositionTop: number;
    cropPositionLeft: number;
    cropWidth: number;
    cropHeight: number;
}
export interface EndCapture {
    onEndCapture: (url: string) => void;
}

export interface Window {
    windowWidth: number;
    windowHeight: number;
}

export const drawCanvas = (cropState: CropProps, CaptureFunction: EndCapture) => {
    const {
      cropPositionTop,
      cropPositionLeft,
      cropWidth,
      cropHeight,
    } = cropState;
    const { onEndCapture } = CaptureFunction;
    const body = document.querySelector('body');

    if (body) {
      html2canvas(body).then(canvas => {
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
        
        if (croppedCanvasContext) {
          croppedCanvasContext.drawImage(
            canvas,
            cropPositionLeft,
            cropPositionTop,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight,
          );
        }
        
        if (croppedCanvas) {
          onEndCapture(croppedCanvas.toDataURL());
        }
      });
    }
};