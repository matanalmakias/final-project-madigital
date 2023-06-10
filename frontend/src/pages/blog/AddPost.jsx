import { useState } from "react";
import blogService from "../../services/blog/blog.service";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";

const categoryList = [
  "Productivity",
  "Time Management",
  "Goal Setting",
  "Personal Development",
];

const AddPost = () => {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);

  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (value === "other") {
      setNewCategory("");
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tags.split(",");
    const correctCategory = category === `other` ? newCategory : category;
    const formData = {
      title,
      desc,
      category,
      tagsArray,
      category: correctCategory,
      content: htmlContent,
    };
    blogService
      .userAddPost(formData)
      .then((res) => toast(res.data.message))
      .finally(() =>
        setTimeout(() => {
          window.location.reload();
        }, 1200)
      );
  };

  return (
    <Form
      className="background2 p-4 d-flex justify-content-center align-items-center flex-column text-center  gap-1"
      onSubmit={(e) => formSubmit(e)}
    >
      <label htmlFor="Title" className="label2">
        Title
      </label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
        type="text"
        required
        placeholder="Enter title"
      />
      <label htmlFor="Description" className="label2">
        Description
      </label>
      <input
        onChange={(e) => setDesc(e.target.value)}
        className="form-control"
        type="text"
        required
        placeholder="Enter description"
      />
      <label htmlFor="Category" className="label2">
        Category
      </label>
      <select onChange={handleCategoryChange} className="form-control" required>
        <option value="">Select a category</option>
        {categoryList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value="other">Other</option>
      </select>
      {category === "other" && (
        <input
          type="text"
          className="form-control"
          placeholder="Enter new category"
          value={newCategory}
          onChange={handleNewCategoryChange}
        />
      )}
      <label htmlFor="Tags" className="label2">
        Tags
      </label>
      <input
        onChange={(e) => setTags(e.target.value)}
        className="form-control"
        type="text"
        required
        placeholder="Enter tags [make a space between each tag]"
      />
      <label htmlFor="Content" className="label2">
        Content
      </label>
      <ReactQuill
        className="background2 p-2 w-100"
        value={htmlContent}
        onChange={setHtmlContent}
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
      <button type="submit" className="btn5 w-50 mt-1">
        Submit
      </button>
    </Form>
  );
};

export default AddPost;
