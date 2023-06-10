import React, { useEffect, useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import siteContentService from "../../services/site-content/site-content";
import { toast } from "react-toastify";
const CreateSiteContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [points, setPoints] = useState([]);
  const [name, setName] = useState();
  const [homePageContent, setHomePageContent] = useState();
  const [titleContent, setTitleContent] = useState();
  const [portfolioContent, setPortfolioContent] = useState();
  const [blogContent, setBlogContent] = useState();
  const [contactContent, setContactContent] = useState();
  const [objectToSend, setObjectToSend] = useState({});
  useEffect(() => {
    setObjectToSend({
      name,
      points,
      homePageContent,
      titleContent,
      portfolioContent,
      blogContent,
      contactContent,
    });
  }, [
    points,
    homePageContent,
    titleContent,
    portfolioContent,
    blogContent,
    contactContent,
  ]);

  const handleAddPoint = () => {
    setPoints([...points, ""]);
  };
  const handlePointChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    siteContentService
      .createNewSiteContent(objectToSend)
      .then((res) => toast(res.data.message));
  };
  return (
    <div>
      <p onClick={() => setShowForm((state) => !state)} className="btn2">
        Create Site Content
      </p>
      <div className={showForm ? "" : "hide_class"}>
        <div className="card">
          <Form
            onSubmit={(e) => formSubmit(e)}
            className="d-flex flex-column p-2 gap-3 justify-content-center align-items-center text-center"
          >
            <div className="w-100">
              <FormGroup>
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Enter name of the version"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="home-page-content">Home page content</label>
                <textarea
                  onChange={(e) => setHomePageContent(e.target.value)}
                  className="form-control p-1"
                  type="text"
                  required
                  placeholder="Enter your home page content"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="services-content">Services content</label>
                <div className="d-flex flex-column">
                  <input
                    onChange={(e) => setTitleContent(e.target.value)}
                    type="text"
                    className="form-control p-1"
                    placeholder="Enter your title"
                    required
                  />
                  {points.map((point, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center gap-3"
                    >
                      <label className="form-label" htmlFor={`point-${index}`}>
                        Point {index + 1}
                      </label>
                      <input
                        type="text"
                        id={`point-${index}`}
                        value={point}
                        className="form-control"
                        onChange={(e) =>
                          handlePointChange(index, e.target.value)
                        }
                        placeholder="Enter your point"
                      />
                      <button
                        type="button"
                        className="btn btn-light p-2"
                        onClick={() => handleRemovePoint(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-light p-2"
                    onClick={() => handleAddPoint()}
                  >
                    Add point
                  </button>
                </div>
              </FormGroup>

              <FormGroup>
                <label htmlFor="portfolio-content">Portfolio content</label>
                <textarea
                  onChange={(e) => setPortfolioContent(e.target.value)}
                  type="text"
                  required
                  className="w-100 form-control"
                  placeholder="Enter your portfolio content"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="blog-content">Blog content</label>
                <textarea
                  onChange={(e) => setBlogContent(e.target.value)}
                  type="text"
                  required
                  className="w-100 form-control"
                  placeholder="Enter your blog content"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="contact-content">Contact content</label>
                <textarea
                  onChange={(e) => setContactContent(e.target.value)}
                  type="text"
                  required
                  className="w-100 form-control"
                  placeholder="Enter your contact content"
                />
              </FormGroup>

              <button className="btn btn-light mt-2" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateSiteContent;
