import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Strong } from "@radix-ui/themes";

const ImageUploader: React.FC = () => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [cropperHide, setCropperHide] = useState<boolean>(true);
  const [croppedImageHide, setCroppedImageHide] = useState<boolean>(true);
  const [croppedImage, setCroppedImage] = useState<string>("");

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedImage(URL.createObjectURL(event.target.files[0]));
      if (cropperHide) {
        setCropperHide(false);
      }
    }
  };
  const onCrop = () => {
    const cropper: any = cropperRef.current?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    if (croppedImage) {
      setCroppedImageHide(false); // Menampilkan Hasil Crop
      setCropperHide(true); // Menutup Cropper
      console.log(croppedImage);
    }
  };

  return (
    <div>
      {/* Upload Image Button */}
      <div>
        <input
          type="file"
          className="formControl"
          id="formFile"
          onChange={handleUploadChange}
        />
      </div>

      {/* Cropper */}
      <div hidden={cropperHide} className="border px-2 py-2 items-center">
        <Cropper
          src={uploadedImage}
          style={{ height: 250, width: "100%", margin: "auto" }}
          // Cropper.js options

          aspectRatio={1 / 1}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
        />

        <Button onClick={onCrop}>Crop Image</Button>
      </div>

      {/* Hasil Crop */}
      <div hidden={croppedImageHide}>
        <Strong>Cropped Image</Strong>
        <img src={croppedImage} alt="cropped image" width={500} height={500} />
        <Button
          onClick={() => {
            setCropperHide(false);
            setCroppedImageHide(true);
          }}
        >
          Crop Ulang
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;