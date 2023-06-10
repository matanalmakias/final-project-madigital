import { useState } from "react";
import { Form } from "react-bootstrap";
import customerService from "./../../../services/customers/customer.service";
import { toast } from "react-toastify";

const UpdateCustomer = ({ customer, section }) => {
  const [nameInput, setNameInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [phoneInput, setPhoneInput] = useState(null);
  const [websiteInput, setWebsiteInput] = useState(null);
  const [imageInput, setImageInput] = useState(null);
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nameInput,
      emailInput,
      phoneInput,
      websiteInput,
      imageInput,
    };
    customerService
      .updateCustomer(formData, customer._id)
      .then((res) => toast(res.data.message));
  };
  if (section === `name`) {
    return (
      <Form className="form-style " onSubmit={(e) => formSubmit(e)}>
        <label className="form-label mb-1" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setNameInput(e.target.value)}
          type="text"
          className="form-control text_input"
          required
          placeholder="Enter new name"
        />
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
    );
  } else if (section === `email`) {
    return (
      <Form className="form-style " onSubmit={(e) => formSubmit(e)}>
        <label className="form-label mb-1" htmlFor="EMAIL">
          Email
        </label>
        <input
          onChange={(e) => setEmailInput(e.target.value)}
          type="email"
          className="form-control text_input"
          required
          placeholder="Enter new email"
        />
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
    );
  } else if (section === `phone`) {
    return (
      <Form className="form-style " onSubmit={(e) => formSubmit(e)}>
        <label className="form-label mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          onChange={(e) => setPhoneInput(e.target.value)}
          type="tel"
          className="form-control text_input"
          required
          placeholder="Enter new phone"
        />
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
    );
  } else if (section === `website`) {
    return (
      <Form className="form-style " onSubmit={(e) => formSubmit(e)}>
        <label className="form-label mb-1" htmlFor="Website">
          Website
        </label>
        <input
          type="text"
          onChange={(e) => setWebsiteInput(e.target.value)}
          className="form-control text_input"
          required
          placeholder="Enter new website"
        />
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
    );
  } else if (section === `image`) {
    return (
      <Form className="form-style " onSubmit={(e) => formSubmit(e)}>
        <label className="form-label mb-1" htmlFor="Image">
          Image
        </label>
        <input
          onChange={(e) => setImageInput(e.target.files[0])}
          id="imgInput"
          type="file"
          accept="image/*"
          className="form-control text_input"
          required
        />
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
    );
  }
};
export default UpdateCustomer;
