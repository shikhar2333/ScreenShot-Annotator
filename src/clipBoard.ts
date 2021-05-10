export async function copyToClipboard(blob: Blob | null) {
    if (blob) {
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      console.log("Clipboard: ", clipboardItem);
      await navigator.clipboard.write([clipboardItem]);
    }
}
  
// function convertToPngAndCopyToClipboard(imgBlob: any) {
//     const imageUrl = window.URL.createObjectURL(imgBlob);
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     if (ctx) {
//         const imageEl = document.createElement('img');
//         imageEl.src = imageUrl;
//         imageEl.crossOrigin = 'anonymous';

//         imageEl.onload = ({ target }: any) => {
//             const { width, height } = target;

//             canvas.width = width;
//             canvas.height = height;
//             ctx.drawImage(target, 0, 0, width, height);
//             canvas.toBlob(copyToClipboard, 'image/png', 1);
//         }
//     }
// }
  
async function copyImg(imgSrc: string) {
    const response = await fetch(`${imgSrc}`);
    const blob = await response.blob();
    copyToClipboard(blob)
}
export default copyImg;