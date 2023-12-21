import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Strong } from "@radix-ui/themes";
import axios from "axios";

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
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    if (croppedImage) {
      setCroppedImageHide(false); // Menampilkan Hasil Crop
      setCropperHide(true); // Menutup Cropper
    }
  };

  const onSave = () => {
    if (croppedImage) {
      const formData = new FormData();
      formData.append("image", croppedImage);
      axios.post("/api/image", formData).then((res) => {
        console.log(res.data);
      });
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
      <div hidden={cropperHide} className="border  my-2 ">
        <Cropper
          src={uploadedImage}
          style={{ height: 250, width: "100%", margin: "auto" }}
          // Cropper.js options

          aspectRatio={1 / 1}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
        />

        <Button style={{ marginTop: "10px" }} onClick={onCrop}>
          Crop Image
        </Button>
      </div>

      {/* Hasil Crop */}
      <div hidden={croppedImageHide} className="border my-2 m-auto">
        <Strong>Cropped Image</Strong>
        <img
          src={croppedImage}
          alt="cropped image"
          width={250}
          height={250}
          style={{ margin: "auto" }}
        />
        <Button
          style={{ marginTop: "10px" }}
          onClick={() => {
            setCropperHide(false);
            setCroppedImageHide(true);
          }}
        >
          Crop Ulang
        </Button>
        <Button style={{ marginTop: "10px" }} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
