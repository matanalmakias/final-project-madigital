import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SiteContentContext } from "../../../context/SiteContentContext";
import { Col, Container, Row } from "react-bootstrap";
import { serverUrl } from "./../../../utils/utils";
import UpdateCustomer from "./UpdateCustomer";

export const CustomerDetails = () => {
  const [updateName, setUpdateName] = useState();
  const [updateEmail, setUpdateEmail] = useState();
  const [updatePhone, setUpdatePhone] = useState();
  const [updateWebsite, setUpdateWebsite] = useState();
  const [updateImage, setUpdateImage] = useState();
  const { id } = useParams();
  const { customerList } = useContext(SiteContentContext);
  const customer = customerList?.find((item) => item._id === id);

  return (
    <Container className=" p-3 div_style">
      <Row>
        <Col>
          <p onClick={() => setUpdateName((s) => !s)} className="btn5">
            {customer?.name}
          </p>
          {updateName && (
            <UpdateCustomer customer={customer} section={`name`} />
          )}
        </Col>
        <Col>
          <p onClick={() => setUpdateEmail((s) => !s)} className="btn5">
            {customer?.email}
          </p>
          {updateEmail && (
            <UpdateCustomer customer={customer} section={`email`} />
          )}
        </Col>
        <Col>
          <p onClick={() => setUpdatePhone((s) => !s)} className="btn5">
            {customer?.phone}
          </p>
          {updatePhone && (
            <UpdateCustomer customer={customer} section={`phone`} />
          )}
        </Col>
        <Col>
          <p onClick={() => setUpdateWebsite((s) => !s)} className="btn5">
            {customer?.website}
          </p>
          {updateWebsite && (
            <UpdateCustomer customer={customer} section={`website`} />
          )}
        </Col>
        <div className="d-flex justify-content-center ">
          <img
            onClick={() => setUpdateImage((s) => !s)}
            className="my_img"
            src={`${serverUrl}/${customer?.image}`}
            alt=""
          />
          {updateImage && (
            <UpdateCustomer customer={customer} section={`image`} />
          )}
        </div>
      </Row>
    </Container>
  );
};
export default CustomerDetails;
