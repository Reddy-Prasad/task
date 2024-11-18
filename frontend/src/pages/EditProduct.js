import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";

function EditProduct() {
  var { id } = useParams();
  var navigate = useNavigate();
  var { enqueueSnackbar } = useSnackbar();

  var [firstName, setfirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [email, setEmail] = useState("");
  var [profileImageLink, setProfileImageLink] = useState("");

  var [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/${id}`)
      .then((res) => {
        console.log(res);
        setfirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setProfileImageLink(res.data.profileImageLink);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  var submitHandler = (e) => {
    var data = {
      firstName,
      lastName,
      email,
      profileImageLink,
    };
    e.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:5000/${id}`, data)
      .then((res) => {
        console.log(res);
        setfirstName(res.data);
        setLastName(res.data);
        setEmail(res.data);
        setProfileImageLink(res.data);

        setLoading(false);
        enqueueSnackbar("Product updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
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
                <label htmlFor="">FirstName</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">LastName</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Profile Image Link</label>
                <input
                  type="text"
                  className="form-control border border-2 border-dark"
                  value={profileImageLink}
                  onChange={(e) => setProfileImageLink(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3 fw-bold">
                Save product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
