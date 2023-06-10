import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import profileService from "../../services/profile/profile.service";
import { toast } from "react-toastify";
import Phone from "./Phone";
import Email from "./Email";

const EditField = ({ sign, selfUser }) => {
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [website, setWebsite] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [submitPhoneInput, setSubmitPhoneInput] = useState(null);
  const [showSubmitPhone, setShowSubmitPhone] = useState(false);

  const formSubmit = (e, sign, state) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(sign, state);

    return profileService
      .editField(sign, { state })
      .then((res) => toast(res.data.message));
  };
  if (sign === `name`) {
    return (
      <Form
        onSubmit={(e) => formSubmit(e, `name`, name)}
        className="d-flex align-items-center flex-column gap-1 mb-1"
      >
        <input
          type="text"
          required
          placeholder="Enter new name"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn5 w-50">
          Submit
        </button>
      </Form>
    );
  } else if (sign === `email`) {
    return <Email formSubmit={formSubmit} />;
  } else if (sign === `phone`) {
    return (
      <Phone
        formSubmit={formSubmit}
        phone={phone}
        setPhone={setPhone}
        showSubmitPhone={showSubmitPhone}
        setSubmitPhoneInput={setSubmitPhoneInput}
        submitPhoneInput={submitPhoneInput}
        setShowSubmitPhone={setShowSubmitPhone}
      />
    );
  } else if (sign === `website`) {
    return (
      <Form
        onSubmit={(e) => formSubmit(e, `website`, website)}
        className="d-flex align-items-center flex-column gap-1 mb-1"
      >
        <input
          type="text"
          required
          placeholder="Enter new website"
          className="form-control"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button type="submit" className="btn5 w-50">
          Submit
        </button>
      </Form>
    );
  } else if (sign === `city`) {
    return (
      <Form
        onSubmit={(e) => formSubmit(e, `city`, city)}
        className="d-flex align-items-center flex-column gap-1 mb-1"
      >
        <input
          type="text"
          required
          placeholder="Enter new city"
          className="form-control"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn5 w-50">
          Submit
        </button>
      </Form>
    );
  } else if (sign === `street`) {
    return (
      <Form
        onSubmit={(e) => formSubmit(e, `street`, street)}
        className="d-flex align-items-center flex-column gap-1 mb-1"
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          required
          placeholder="Enter new street"
          className="form-control"
          onChange={(e) => setStreet(e.target.value)}
        />
        <button type="submit" className="btn5 w-50">
          Submit
        </button>
      </Form>
    );
  }
};

export default EditField;
