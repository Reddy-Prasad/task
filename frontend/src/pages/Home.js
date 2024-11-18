import React, { useEffect, useState } from "react";
import axois from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  var [products, setProducts] = useState([]);
  var [loading, setLoading] = useState(false);
  console.log("render");

  useEffect(() => {
    console.log("effect runs");
    setLoading(true);
    axois
      .get("http://localhost:5000/")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <Link to={`/products/create`}>
          <button class="btn btn-primary">Create User</button>
        </Link>
      </div>

      <div class="mb-3">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search users" />
          <button class="btn btn-outline-secondary">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product.profileImageLink}
                  className="rounded-circle"
                  alt="User"
                  style={{ height: "50px", width: "50px" }}
                />
              </td>
              <td>{product.email}</td>
              <td>{product.firstName}</td>
              <td>{product.lastName}</td>
              <td>
                <Link to={`/products/edit/${product._id}`}>
                  <button className="btn btn-primary btn-sm">Edit</button>
                </Link>
                <Link to={`/products/delete/${product._id}`}>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
