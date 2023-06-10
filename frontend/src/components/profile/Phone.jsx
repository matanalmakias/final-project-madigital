import React from "react";
import { Form } from "react-bootstrap";
import profileService from "../../services/profile/profile.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { phoneRegex, phoneRegexValidationMsg } from "../../utils/utils";

const Phone = ({
  formSubmit,
  phone,
  showSubmitPhone,
  setShowSubmitPhone,
  setPhone,
  setSubmitPhoneInput,
  submitPhoneInput,
}) => {
  const [errMsg, setErrMsg] = useState(``);
  const [showFirstStep, setShowFirstStep] = useState(true);
  const submitPhone = (e) => {
    e.preventDefault();
    profileService.submitPhone(phone, submitPhoneInput).then((res) => {
      if (res.status === 200) {
        toast(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
  };
  const firstStep = (e) => {
    e.preventDefault();
    if (!phoneRegex.test(phone)) {
      return setErrMsg(phoneRegexValidationMsg);
    }
    setErrMsg(``);
    formSubmit(e, `phone`, phone);
    setShowFirstStep((s) => !s);
    setShowSubmitPhone((s) => !s);
  };
  return (
    <>
      <p className="p1"> {errMsg}</p>
      {showFirstStep && (
        <Form
          onSubmit={(e) => firstStep(e)}
          className="d-flex align-items-center flex-column gap-1 mb-1"
        >
          <input
            type="tel"
            required
            placeholder="Enter new phone"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="btn5 w-50">
            Submit
          </button>
        </Form>
      )}
      {showSubmitPhone && (
        <Form onSubmit={(e) => submitPhone(e)}>
          <input
            className="form-control"
            onChange={(e) => setSubmitPhoneInput(e.target.value)}
            type="number"
            required
            placeholder="Enter your code from the sms"
          />
          <button className="btn5" type="submit">
            Submit
          </button>
        </Form>
      )}
    </>
  );
};

export default Phone;
