import React, { useContext } from "react";
import Button from "@mui/material/Button";

import ImageUploading from "react-images-uploading";
import { FormContext } from "../Form";

export default function UploadImage({ name }) {
  const formContext = useContext(FormContext);
  const { handleFormChange } = formContext;
  const [images, setImages] = React.useState([]);
  const maxNumber = 1; // Can update to reflect more than one later

  const onChange = (imageList, addUpdateIndex) => {
    handleFormChange({}, { name: name, value: imageList[0].file.name });
    setImages(imageList);
  };
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <Button
            variant="outlined"
            size="small"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </Button>
          &nbsp;
          <Button onClick={onImageRemoveAll}>Remove all images</Button>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image["data_url"]} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onImageUpdate(index)}
                >
                  Update
                </Button>
                &nbsp;
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => onImageRemove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
