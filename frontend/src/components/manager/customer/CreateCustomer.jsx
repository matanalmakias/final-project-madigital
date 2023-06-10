import { useState } from "react";
import { Form } from "react-bootstrap";
import customerService from "../../../services/customers/customer.service";
const CreateCustomer = ({ siteContent }) => {
  const [nameInput, setNameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [phoneInput, setPhoneInput] = useState();
  const [websiteInput, setWebsiteInput] = useState();
  const [imgInput, setImgInput] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const createCustomer = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nameInput", nameInput);
    formData.append("emailInput", emailInput);
    formData.append("phoneInput", phoneInput);
    formData.append("websiteInput", websiteInput);
    formData.append("file", imgInput);

    customerService
      .createCustomer(formData)
      .then((res) => toast(res.data.message));
  };

  return (
    <div className="mb-1">
      <button className="btn3" onClick={() => setShowForm((s) => !s)}>
        Create customer +
      </button>
      <div className={showForm ? "" : "hide_class"}>
        <Form onSubmit={(e) => createCustomer(e)}>
          <label htmlFor="name">Name of Customer</label>
          <input
            onChange={(e) => setNameInput(e.target.value)}
            type="text"
            placeholder="Enter name of customer"
            className="form-control"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            placeholder="Enter email"
            className="form-control"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            onChange={(e) => setPhoneInput(e.target.value)}
            type="tel"
            placeholder="Enter phone number"
            className="form-control"
            required
          />

          <label htmlFor="website">Website</label>
          <input
            onChange={(e) => setWebsiteInput(e.target.value)}
            type="text"
            placeholder="Enter website URL"
            className="form-control"
            required
          />

          <label htmlFor="image">Image Upload</label>
          <input
            id="imgInput"
            onChange={(e) => setImgInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="form-control"
            required
          />

          <button className="btn4" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};
export default CreateCustomer;
