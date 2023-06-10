import { useState } from "react";
import { contactContent } from "../../utils/content";
import profileService from "../../services/profile/profile.service";
import "./style.scss";
import { Form } from "react-bootstrap";
import { emailRegex, phoneRegex } from "../../utils/utils";
import { toast } from "react-toastify";
const Contact = ({ siteContent }) => {
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [textArea, setTextArea] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const contactContentWithLineBreaks = siteContent?.contactContent.replace(
    /\. /g,
    ".<br/> "
  );
  const formSumbit = (e) => {
    e.preventDefault();
    if (phoneRegex.test(phone) && emailRegex.test(email)) {
      setErrMsg("");
      const formData = { name, phone, email, textArea };
      profileService
        .contactRequest(formData)
        .then((res) => toast(res.data.message))
        .finally(() =>
          setTimeout(() => {
            window.location.reload();
          }, 1100)
        );
    } else {
      setErrMsg(`One of fields are not correct`);
    }
  };
  return (
    <div className="div_of_contact">
      <div className="w-100 text-center bg-danger text-white rounded mb-1 mt-1">
        {errMsg}
      </div>
      <div className="justify-content-center d-flex flex-column align-items-center">
        <h4 className="h4 contact_h4">Contact</h4>
        <p
          dangerouslySetInnerHTML={{ __html: contactContentWithLineBreaks }}
          className="contact-content"
        ></p>
      </div>
      <Form
        onSubmit={(e) => formSumbit(e)}
        className=" d-flex flex-column justify-content-center align-items center text-center"
      >
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="Name" className="form-label contact_form_label">
              Name
            </label>
          </div>
          <div className="col-md-10">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              className="form-control"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label
              htmlFor="Phone"
              className="form-label mt-2 contact_form_label"
            >
              Phone
            </label>
          </div>
          <div className="col-md-10">
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="form-control"
              placeholder="Enter your phone number [Optional]"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label
              htmlFor="Email"
              className="form-label mt-2 contact_form_label"
            >
              Email
            </label>
          </div>
          <div className="col-md-10">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="col-md-2">
            <label
              htmlFor="Meesage"
              className="form-label mt-2 contact_form_label"
            >
              Meesage
            </label>
          </div>
          <div className="col-md-10">
            <textarea
              onChange={(e) => setTextArea(e.target.value)}
              type="text"
              style={{ height: `100%` }}
              className="form-control"
              placeholder="Enter your message content [Optional]"
            />
          </div>
        </div>
        <div className="text-center ">
          <button
            className="text-center contact_form_submit mt-1"
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Contact;
