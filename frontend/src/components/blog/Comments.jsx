import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";

const Comments = () => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [commentTextInput, setCommentTextInput] = useState(null);
  const formSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <button
        onClick={() => setShowAddComment((s) => !s)}
        className="btn4 mb-1"
      >
        Add comment
      </button>
      {showAddComment && (
        <Form
          onSubmit={(e) => formSubmit(e)}
          className="text-center row gap-2 p-3 "
        >
          <label htmlFor="comment" className="label3 w-100">
            Comment text
          </label>
          <textarea
            type="text"
            onChange={(e) => setCommentTextInput(e.target.value)}
            required
            className="form-control"
            placeholder="Enter a comment"
          />
          <button type="submit" className="btn7">
            Submit
          </button>
        </Form>
      )}
    </div>
  );
};

export default Comments;
