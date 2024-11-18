import React from 'react'
import {Link} from 'react-router-dom'

function BackButton() {
  return (
    <div>
      <Link to='/'>
        <button className='btn btn-info'>Go back</button>
      </Link>
    </div>
  )
}

export default BackButton