import React, { useContext } from "react";
import Button from "@mui/material/Button";

import ImageUploading from "react-images-uploading";
import { FormContext } from "../Form";

function Img({ src }) {
  return <img src={src} width="200" />;
}
export default function UploadImage({ name }) {
  let formData = new FormData();

  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;
  const [images, setImages] = React.useState([]);
  const maxNumber = 1; // Can update to reflect more than one later
  async function uploadFile(formData) {
    let options = {
      method: "POST",
      body: formData,
    };

    try {
      let response = await fetch("/api/files", options);
      if (response.ok) {
        // Server responds with updated array of files
        let data = await response.json();
        console.warn("data", data);
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  const onChange = (imageList, addUpdateIndex) => {
    if (imageList.length) {
      // This updates users

      formData.append("clientfile", imageList[0].file, imageList[0].file.name);
      handleFormChange(
        {},
        {
          name: name,
          value: `http://localhost:5002/clientfiles/${imageList[0].file.name}`,
        }
      );

      // This updates file table
      uploadFile(formData);
    }
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
            color="secondary"
            size="small"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </Button>
          &nbsp;
          {/* <Button onClick={onImageRemoveAll}>Remove all images</Button> */}
          {!imageList.length && !form.avatarURL && (
            <Img src="https://s3.amazonaws.com/FringeBucket/default-user.png" />
          )}
          {form.avatarURL && <Img src={form.avatarURL} />}
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
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
