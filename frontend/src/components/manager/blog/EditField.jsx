import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { AuthContext } from "../../../context/AuthContext";
import blogService from "../../../services/blog/blog.service";
import axios from "axios";
import Buffer from "buffer";
import EditContent from "./EditContent";

const EditField = ({ sign, item }) => {
  const [titleInput, setTitleInput] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState(null);
  const [contentInput, setContentInput] = useState(null);
  const { isManager, isModerator, selfUser } = useContext(AuthContext);

  const isAuthorOfPost = selfUser?._id === item?.authorUserId;

  const formSubmit = (e, sign, body) => {
    e.preventDefault();
    blogService.editField(item?._id, sign, body);
  };
  if (!isManager && !isModerator && !isAuthorOfPost) return;
  if (sign === `title`) {
    return (
      <Form
        onSubmit={(e) => formSubmit(e, `title`, { input: titleInput })}
        className="d-flex gap-1"
      >
        <input
          type="text"
          required
          className="form-control"
          placeholder="Enter new title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <button type="submit" className="btn5 w-100">
          Submit
        </button>
      </Form>
    );
  } else if (sign === `desc`) {
    return (
      <Form
        onSubmit={(e) => formSubmit(e, `desc`, { input: descriptionInput })}
        className="d-flex gap-1"
      >
        <textarea
          type="text"
          required
          style={{ height: `30%` }}
          className="form-control"
          placeholder="Enter new description"
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
        <button type="submit" className="btn5 w-100">
          Submit
        </button>
      </Form>
    );
  } else if (sign === `content`) {
    return <EditContent item={item} />;
  }
};

export default EditField;
