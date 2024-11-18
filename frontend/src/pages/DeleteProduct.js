import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";

function DeleteProduct() {
  var [loading, setLoading] = useState(false);
  var { id } = useParams();
  var navigate = useNavigate();
  var { enqueueSnackbar } = useSnackbar();

  var handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Product deleted successfully", { variant: "success" });
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
      <div className="my-5 border border-2 border-dark w-50 p-4 m-auto bg-light">
        <h4>Are you sure to delete ?</h4>
        {loading ? <Spinner /> : ""}
        <div className="my-4">
          <button className="btn btn-danger w-50" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
