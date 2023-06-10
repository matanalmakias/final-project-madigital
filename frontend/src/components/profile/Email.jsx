import React from "react";
import { Form } from "react-bootstrap";
import profileService from "../../services/profile/profile.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { emailRegex, emailRegexValidationMsg } from "../../utils/utils";

const Email = ({ formSubmit }) => {
  const [submitEmailInput, setSubmitEmailInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [errMsg, setErrMsg] = useState(``);
  const [showSubmitEmail, setShowSubmitEmail] = useState(false);
  const [showFirstStep, setShowFirstStep] = useState(true);
  const submitEmail = (e) => {
    e.preventDefault();
    profileService.submitEmail(emailInput, submitEmailInput).then((res) => {
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
    if (!emailRegex.test(emailInput)) {
      return setErrMsg(emailRegexValidationMsg);
    }
    setErrMsg(``);
    formSubmit(e, `email`, emailInput);
    setShowFirstStep((s) => !s);
    setShowSubmitEmail((s) => !s);
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
            type="email"
            required
            placeholder="Enter new email"
            className="form-control"
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button type="submit" className="btn5 w-50">
            Submit
          </button>
        </Form>
      )}
      {showSubmitEmail && (
        <Form
          className="d-flex flex-column gap-1  rounded"
          onSubmit={(e) => submitEmail(e)}
        >
          <input
            className="form-control"
            onChange={(e) => setSubmitEmailInput(e.target.value)}
            type="number"
            required
            placeholder="Enter your code from the the email"
          />
          <button className="btn5" type="submit">
            Submit
          </button>
          <button
            className="btn4 mb-2"
            onClick={(e) => formSubmit(e, `email`, emailInput)}
          >
            I didnt recive a code, send again
          </button>
        </Form>
      )}
    </>
  );
};

export default Email;
