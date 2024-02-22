import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreatePost = () => {
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
            />
            <Button type="button" color="blue" size="sm" outline>
              Upload Image
            </Button>
          </div>
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
