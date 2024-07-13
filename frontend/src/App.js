import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import AddProduct from "./component/product/AddProduct";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/product/create-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
