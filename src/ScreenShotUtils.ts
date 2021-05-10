// import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';

// export interface CropProps {
//     cropPositionTop: number;
//     cropPositionLeft: number;
//     cropWidth: number;
//     cropHeight: number;
// }

export interface EndCapture {
    onEndCapture: (url: string) => void;
}

export interface Window {
    windowWidth: number;
    windowHeight: number;
}

export const drawCanvas = async(CaptureFunction: EndCapture) => {
    const { onEndCapture } = CaptureFunction;
    const body = document.querySelector('body');
    if (body){
      try { 
        /* get image src url through html-to-image library */
        const pngImageUrl = await htmlToImage.toPng(body, {backgroundColor: 'white'});
        console.log("PNG url is: ", pngImageUrl);
        if(pngImageUrl){
          onEndCapture(pngImageUrl);
        }    
      } catch(error){
        console.log("Error drawing : ", error);
      }
    }
};