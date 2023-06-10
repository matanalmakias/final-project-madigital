import React from "react";
import { Form } from "react-bootstrap";

const Contact = ({ setShowContact, showContact }) => {
  return (
    <div>
      <p
        onClick={() => setShowContact((state) => !state)}
        className="btn1  shadow"
      >
        Contact
      </p>
      <div className={showContact ? "" : "hide_class"}>
        <Form className="w-100">
          <label htmlFor="Text-Area">Message</label>
          <textarea
            placeholder="Enter your message"
            required
            className="w-100 mb-1 form-control"
          />
          <button className=" w-100 contact_form_submit" type="submit">
            Send
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
