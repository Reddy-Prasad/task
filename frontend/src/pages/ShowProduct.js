import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function ShowProduct() {
 var [product, setProduct] = useState({})
 var [loading, setLoading] = useState(false)
  var { id } = useParams()
  console.log(id)
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        console.log(res.data)
        setProduct(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      });
 }, [])

  return (
    <div className='my-5 '>
      <div className='text-start ms-4'>
      <BackButton/>
      </div>
      <h4 className='mt-4'>Products details</h4>
      {loading ? <Spinner /> :
        <div className='d-flex justify-content-center'>
          <div className='bg-warning w-50 p-3 fw-bold'>
            <div className='py-1'>
              <span>Name :</span>
              <span>{product.name}</span>
            </div>
            <div className='py-1'>
              <span>Price :</span>
              <span>{product.price}</span>
            </div>
            <div className='py-1'>
              <span>Quantity :</span>
              <span>{product.quantity}</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default ShowProduct