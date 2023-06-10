import React, { useContext, useState } from "react";
import { user } from "../../utils/utils";
import "./style.scss";
import { serverUrl } from "./../../utils/utils";

import Address from "./Address";
import { Row, Col, Container, Form } from "react-bootstrap";
import Contact from "./Contact";
import { AuthContext } from "../../context/AuthContext";
import profileService from "../../services/profile/profile.service.js";
import FinishDetails from "./FinishDetails";
import EditField from "./EditField";
const Profile = () => {
  const [showEditWebsite, setShowEditWebsite] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [userPicture, setUserPicture] = useState(null);
  const { selfUser } = useContext(AuthContext);
  if (selfUser?.finishDetails === false) {
    return <FinishDetails />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center text-center">
      <div className="div_of_profile p-3 d-flex flex-column justify-content-center align-items-center">
        {userPicture && (
          <img
            className="profile-img"
            src={`${serverUrl}/${selfUser?.image}`}
            alt=""
          />
        )}
        <div className="col">------------------------</div>

        <h1 className="h4 contact_h4">Profile</h1>
        <p>Click one of fields to edit </p>
        {/* Name */}
        <Container>
          <Row onClick={() => setShowEditName((s) => !s)} className="gap-1">
            <Col>
              <p className="mb-1 contact_form_label">Name:</p>
            </Col>
            <Col>
              <p className="mb-1 contact_form_label">{selfUser?.name}</p>
            </Col>
          </Row>

          <div className={showEditName ? "" : "hide_class"}>
            <EditField selfUser={selfUser} sign={`name`} />
          </div>
          {/* Email */}
          <Row onClick={() => setShowEditEmail((s) => !s)} className="gap-1">
            <Col>
              <p className="mb-1 contact_form_label">Email:</p>
            </Col>
            <Col>
              <p className="mb-1 contact_form_label">{selfUser?.email}</p>
            </Col>
          </Row>
          <div className={showEditEmail ? "" : "hide_class"}>
            <EditField selfUser={selfUser} sign={`email`} />
          </div>
          {/* Phone */}
          <Row onClick={() => setShowEditPhone((s) => !s)} className="gap-1">
            <Col>
              <p className="mb-1 contact_form_label">Phone:</p>
            </Col>
            <Col>
              <p className="mb-1 contact_form_label">{selfUser?.phone}</p>
            </Col>
          </Row>
          <div className={showEditPhone ? "" : "hide_class"}>
            <EditField selfUser={selfUser} sign={`phone`} />
          </div>
          {/* Website */}
          <Row onClick={() => setShowEditWebsite((s) => !s)} className="gap-1">
            <Col>
              <p className="mb-1 contact_form_label">Web:</p>
            </Col>
            <Col>
              <p className="mb-1 contact_form_label">{selfUser?.website}</p>
            </Col>
          </Row>
          <div className={showEditWebsite ? "" : "hide_class"}>
            <EditField selfUser={selfUser} sign={`website`} />
          </div>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <Contact
                showContact={showContact}
                setShowContact={setShowContact}
              />
            </Col>

            <Col>
              <Address
                selfUser={selfUser}
                showAddress={showAddress}
                setShowAddress={setShowAddress}
              />
            </Col>
          </Row>{" "}
        </Container>
      </div>
    </div>
  );
};

export default Profile;
