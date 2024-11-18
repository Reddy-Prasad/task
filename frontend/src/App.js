import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import ShowProduct from "./pages/ShowProduct";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import LoginScreen from "./pages/LoginScreen";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/showDetails/:id" element={<ShowProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/delete/:id" element={<DeleteProduct />} />
      </Routes>
    </div>
  );
}

export default App;
