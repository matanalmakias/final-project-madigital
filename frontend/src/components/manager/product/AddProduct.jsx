import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import productService from "../../../services/product/product.service";
import { toast } from "react-toastify";
const priceMethods = ["hour", "project"];

const AddProduct = () => {
  const [imgInput, setImgInput] = useState(null);
  const [priceMethodInput, setPriceMethodInput] = useState(priceMethods[0]);
  const [startingPriceInput, setStartingPriceInput] = useState(null);
  const [descInput, setDescInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imgInput);
    formData.append("priceMethod", priceMethodInput);
    formData.append("startingPrice", startingPriceInput);
    formData.append("desc", descInput);
    formData.append("name", nameInput);

    productService
      .createProduct(formData)
      .then((res) => toast(res.data.message));
    setTimeout(() => {
      window.location.reload();
    }, 1800);
  };

  return (
    <Form onSubmit={(e) => formSubmit(e)} className="d-flex flex-column gap-1">
      <label className="label3" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        className="form-control"
        required
        placeholder="Enter name of product"
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label className="label3" htmlFor="name">
        Description
      </label>
      <textarea
        type="text"
        className="form-control"
        required
        placeholder="Enter description of product"
        onChange={(e) => setDescInput(e.target.value)}
      />
      <label className="label3" htmlFor="name">
        Starrting price
      </label>
      <input
        type="number"
        className="form-control"
        required
        placeholder="Enter starting price of product"
        onChange={(e) => setStartingPriceInput(e.target.value)}
      />
      <label className="label3" htmlFor="name">
        Price method
      </label>
      <select
        onChange={(e) => setPriceMethodInput(e.target.value)}
        className="form-control"
        name="priceMethod"
        id="priceMethod"
        required
      >
        {priceMethods.map((item, index) => (
          <option key={index} className="form-control">
            {item}
          </option>
        ))}
      </select>
      <label className="label3" htmlFor="name">
        Picture
      </label>
      <input
        id="imgInput"
        onChange={(e) => setImgInput(e.target.files[0])}
        type="file"
        accept="image/*"
        className="form-control"
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default AddProduct;
