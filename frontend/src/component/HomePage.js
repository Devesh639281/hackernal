import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data?.product || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  const deleteProduct = async (_id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${_id}`
      );
      if (data && data.success) {
        setProducts(data?.product);
        window.location.reload();
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting product");
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/search`, {
        params: { name: searchInput },
      });
      setProducts(data?.result || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while searching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center">Product List</h1>
        <div className="row justify-content-center mb-3">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Food or Restaurant"
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-2">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <table className="table" style={{ border: "1px solid #ccc" }}>
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteProduct(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <h2>No Products Found</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default HomePage;
