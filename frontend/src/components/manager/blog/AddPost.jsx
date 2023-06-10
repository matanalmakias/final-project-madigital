import { useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import blogService from "../../../services/blog/blog.service";
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
    blogService.addPost(formData).then((res) => toast(res.data.message));
  };

  return (
    <Form
      className="background2 p-4 text-center  gap-1"
      onSubmit={(e) => formSubmit(e)}
    >
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
        type="text"
        required
        placeholder="Enter title"
      />
      <input
        onChange={(e) => setDesc(e.target.value)}
        className="form-control"
        type="text"
        required
        placeholder="Enter description"
      />

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
      <input
        onChange={(e) => setTags(e.target.value)}
        className="form-control"
        type="text"
        required
        placeholder="Enter tags [make a space between each tag]"
      />
      <ReactQuill
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
