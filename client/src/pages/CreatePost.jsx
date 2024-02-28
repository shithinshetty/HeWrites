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
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [postStatus, setPostStatus] = useState(null);
  const [publisherror, setPublishError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
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
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image Upload Failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setPublishError(null);
        setPostStatus("Post Creation Successful");
        setTimeout(() => navigate(`/post/${data.slug}`), 9000);
      } else {
        setPublishError(data.message);

        return;
      }
    } catch (error) {
      setPublishError("Something Went Wrong");
      setPostStatus(null);
    }
  };
  {
    setTimeout(() => {
      setPublishError(null);
      setPostStatus(null);
    }, 9000);
  }
  return (
    <div className="min-h-screen p-3 max-auto ">
      <div className="min-h-screen p-3 max-w-3xl mx-auto  ">
        <h1 className="text-center text-3xl my-7 font-semibold ">
          Create A Post
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title "
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
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
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write....."
            className="w-full h-96 mb-4 "
            style={{ overflowY: "hidden" }}
            required
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <Button type="submit" color="blue" outline onClick={handleSubmit}>
            Publish
          </Button>
          {publisherror && (
            <Alert className="mt-5" color="failure">
              {publisherror}{" "}
            </Alert>
          )}
          {postStatus && (
            <Alert className="mt-5" color="success">
              {postStatus}{" "}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
