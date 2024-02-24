import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const CreatePost = () => {
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please Select An Image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image Upload Failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, imageUrl: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image Upload Failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen p-3 max-auto ">
      <div className="min-h-screen p-3 max-w-3xl mx-auto  ">
        <h1 className="text-center text-3xl my-7 font-semibold ">
          Create A Post
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title "
              required
              id="title"
              className="flex-1"
            />
            <Select>
              <option value="uncategorized">Select A Category</option>
              <option value="Garbage Collection">Garbage Collection</option>
              <option value="Algorithms">Algorithms</option>
              <option value="FrontEnd/Backend">Frontend/Backend</option>
              <option value="Core">Core Working</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-2 border-emerald-500 border-dotted p-3">
            <FileInput
              type="file"
              helperText="SVG, PNG, JPG or GIF ."
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              color="blue"
              size="sm"
              outline
              onClick={handleUploadImage}
            >
              Upload Image
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write....."
            className="h-72 mb-12 "
            required
          />
          <Button type="submit" color="blue" outline>
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;