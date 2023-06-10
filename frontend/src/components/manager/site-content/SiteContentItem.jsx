import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import siteContentService from "../../../services/site-content/site-content";
import { toast } from "react-toastify";

const SiteContentItem = ({ siteContent }) => {
  const [portfolioContent, setPortfolioContent] = useState(null);
  const [contactContent, setContactContent] = useState(null);
  const [blogContent, setBlogContent] = useState(null);
  const [homePageContent, setHomePageContent] = useState(null);
  const [servicesContent, setServicesContent] = useState(null);
  const [name, setName] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [pointsContent, setPointsContent] = useState(null);
  const [pointsValues, setPointsValues] = useState(siteContent?.points || []);
  const [objectToSend, setObjectToSend] = useState({
    portfolioContent,
    contactContent,
    blogContent,
    homePageContent,
    name,
    servicesContent,
  });

  useEffect(() => {
    setObjectToSend({
      portfolioContent,
      contactContent,
      blogContent,
      homePageContent,
      name,
      servicesContent,
    });
  }, [
    portfolioContent,
    contactContent,
    blogContent,
    homePageContent,
    name,
    pointsContent,
    servicesContent,
  ]);
  const pointsToShow = showMore
    ? siteContent?.points
    : siteContent?.points?.slice(0, 4);

  const handlePointChange = (index, content) => {
    setPointsValues((prevPointsValues) => {
      const newPointsValues = [...prevPointsValues];
      newPointsValues[index] = content;
      return newPointsValues;
    });
  };
  const contentSubmit = async (e, param) => {
    e.preventDefault();
    siteContentService
      .updateContent(objectToSend, siteContent._id, param)
      .then((res) => toast(res.data.message));
  };
  const pointSubmit = async (body, index) => {
    siteContentService
      .updatePoint(body, index, siteContent._id)
      .then((res) => toast(res.data.message));
  };
  return (
    <div className="background2">
      <Form
        onSubmit={(e) => contentSubmit(e, `name`)}
        className=" p-1 text-center"
      >
        <Form.Group className="text-center">
          <Form.Label className="label1">Name</Form.Label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            required
            placeholder={`Current -- ${siteContent?.name}`}
          />
        </Form.Group>
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
      <Form
        onSubmit={(e) => contentSubmit(e, `homePage`)}
        className=" p-1 text-center"
      >
        <Form.Group
          className="text-center"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label className="label1">Home page content</Form.Label>
          <Form.Control
            onChange={(e) => setHomePageContent(e.target.value)}
            as="textarea"
            rows={4}
            placeholder={`Current -- ${siteContent?.homePageContent}`}
            required
          />
        </Form.Group>
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
      <Form
        onSubmit={(e) => contentSubmit(e, `services`)}
        className=" p-1 text-center"
      >
        <Form.Group
          className="text-center"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label className="label1">Services content</Form.Label>
          <Form.Control
            onChange={(e) => setServicesContent(e.target.value)}
            as="textarea"
            rows={4}
            placeholder={`Current -- ${siteContent?.servicesContent}`}
            required
          />
        </Form.Group>
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
      <Form
        onSubmit={(e) => contentSubmit(e, `blog`)}
        className=" p-1 text-center"
      >
        <Form.Group
          className="text-center"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label className="label1">Blog content</Form.Label>
          <Form.Control
            onChange={(e) => setBlogContent(e.target.value)}
            as="textarea"
            rows={3}
            placeholder={`Current -- ${siteContent?.blogContent}`}
            required
          />
        </Form.Group>
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
      <Form
        onSubmit={(e) => contentSubmit(e, `contact`)}
        className=" p-1 text-center"
      >
        <Form.Group
          className="text-center"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label className="label1">Contact content</Form.Label>
          <Form.Control
            onChange={(e) => setContactContent(e.target.value)}
            as="textarea"
            rows={3}
            placeholder={`Current -- ${siteContent?.contactContent}`}
            required
          />
        </Form.Group>
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>
      <Form
        onSubmit={(e) => contentSubmit(e, `portfolio`)}
        className="text-center"
      >
        <Form.Group
          className=" p-1 text-center"
          controlId="exampleForm.ControlText1"
        >
          <Form.Label className="label1">Portfolio content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setPortfolioContent(e.target.value)}
            placeholder={`Current -- ${siteContent?.portfolioContent}`}
            required
          />
        </Form.Group>
        <button className="btn4" type="submit">
          Submit
        </button>
      </Form>

      <Form.Group className="text-center" controlId="exampleForm.ControlText1">
        <Form.Label className="label1">Points content</Form.Label>
        {pointsToShow?.map((point, index) => (
          <div key={index}>
            <p className="label1">{`Point ${index + 1}`}</p>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => handlePointChange(index, e.target.value)}
              value={pointsValues[index]}
              placeholder={point}
              required
            />
            <button
              onClick={() => pointSubmit({ value: pointsValues[index] }, index)}
              className="btn4"
            >
              Submit
            </button>
          </div>
        ))}
        {siteContent?.points.length > 4 && (
          <button className="btn4" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </Form.Group>
    </div>
  );
};

export default SiteContentItem;
