// helpers.js
export function dataURItoFile(dataURI: any, fileName: any) {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: "image/png" });

  // Create a File object from the Blob
  return new File([blob], fileName, { type: "image/png" });
}
