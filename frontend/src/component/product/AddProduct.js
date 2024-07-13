import axios from "axios";
import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import Layout from "../Layout/Layout";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/v1/product/create-product", {
      name,
      price,
    });

    if (data.success) {
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Create New Product</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Product Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Price Of Product."
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" style={{ margin: "10px" }}>
              Add Products
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
