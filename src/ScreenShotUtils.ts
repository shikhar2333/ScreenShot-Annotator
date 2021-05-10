import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';

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

export const drawCanvas = async(cropState: CropProps, CaptureFunction: EndCapture) => {
    const { cropPositionTop, cropPositionLeft, cropWidth, cropHeight} = cropState;
    const { onEndCapture } = CaptureFunction;
    const body = document.querySelector('body');
    // const body = document.getElementById('root');
    if (body){
      try { 
        /* get image src url through html-to-image library */
        const canvas = await htmlToImage.toCanvas(body, {backgroundColor: 'white'});
        // const canvas = await html2canvas(body);
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
        // console.log("Image url: ", canvas.toDataURL());
        if(croppedCanvas){
          onEndCapture(croppedCanvas.toDataURL());
        } 
      } catch(error){
        console.log("Error drawing : ", error);
      }
    }
};