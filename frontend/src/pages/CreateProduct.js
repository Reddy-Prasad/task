import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";

function CreateProduct() {
  var navigate = useNavigate();
  var { enqueueSnackbar } = useSnackbar();

  var [firstName, setName] = useState("");
  var [lastName, setPrice] = useState("");
  var [email, setQuantity] = useState("");
  var [profileImageLink, setProfileImageLink] = useState("");

  var [loading, setLoading] = useState(false);

  var submitHandler = (e) => {
    var data = {
      firstName,
      lastName,
      email,
      profileImageLink,
    };
    console.log(data);
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/users", data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        enqueueSnackbar("Product created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error", {
          variant: "error",
        });
      });
  };
  return (
    <div>
      <div className="text-start ms-4 mt-4">
        <BackButton />
      </div>
      <div className="w-50 m-auto">
        <div className="row my-5 border border-2 border-info p-4 bg-light text-dark">
          {loading ? <Spinner /> : ""}
          <div className="col-6 m-auto">
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={firstName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={lastName}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={email}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">ProfileImageLink</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={profileImageLink}
                  onChange={(e) => setProfileImageLink(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3 fw-bold">
                Save User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
