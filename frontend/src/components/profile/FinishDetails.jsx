import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { phoneRegex, webSiteRegex } from "../../utils/utils";
import profileService from "../../services/profile/profile.service";
import { toast } from "react-toastify";

const FinishDetails = () => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [website, setWebsite] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!phoneRegex.test(phone)) {
      setErrMsg(`Phone number must be a 10-digit number starting with 05`);
      return;
    } else if (website !== null && !webSiteRegex.test(website)) {
      setErrMsg(
        `Website must be a valid URL with one of the following extensions: .co.il, .com, .net, .org, .edu, .gov, .mil, .info, .biz, .me, .io, .tv, or .cc`
      );
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("file", image);

    profileService
      .finishDetails(formData)
      .then((res) => toast(res.data.message));
  };

  return (
    <>
      <div className="text-center card bg-danger text-white"> {errMsg}</div>
      <Form
        onSubmit={(e) => formSubmit(e)}
        className="text-center d-flex flex-column gap-1"
      >
        <label className="label2" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Enter your name"
          className="form-control"
          title="Please enter your full name"
        />
        <label className="label2" htmlFor="name">
          Phone
        </label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          required
          placeholder="Enter your phone number"
          className="form-control"
          title="Please enter your phone number"
        />
        <label className="label2" htmlFor="name">
          Website
        </label>
        <input
          onChange={(e) => setWebsite(e.target.value)}
          type="text"
          placeholder="Enter your website url"
          className="form-control"
          title="Please enter your website url"
        />
        <label className="label2" htmlFor="name">
          Address
        </label>
        <label className="card" htmlFor="name">
          City
        </label>
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Enter your city"
          className="form-control"
          title="Please enter your city"
        />
        <label className="card" htmlFor="name">
          Street
        </label>
        <input
          title="Please enter your street"
          type="text"
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Enter your street"
          className="form-control"
        />
        <label className="label2" htmlFor="name">
          Image/Logo
        </label>

        <input
          title="Please upload your image"
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
        />

        <button className="btn6 mb-1" type="submit">
          Submit
        </button>
      </Form>
    </>
  );
};
export default FinishDetails;
