import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { Buffer } from "buffer";
import axios from "axios";
import { useEffect } from "react";

const EditContent = ({ item }) => {
  const [contentInput, setContentInput] = useState(item.content);
  useEffect(() => {
    console.log(contentInput);
  }, [contentInput]);
  const formSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Form
      onSubmit={formSubmit}
      className="d-flex flex-column card p-2 gap-1 mb-2"
    >
      <ReactQuill
        required
        value={contentInput}
        onChange={setContentInput}
        placeholder="Enter HTML content"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "link",
          "image",
          "video",
        ]}
      />
      <button type="submit" className="btn5 w-100">
        Submit
      </button>
    </Form>
  );
};

export default EditContent;
