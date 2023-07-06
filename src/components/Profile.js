import React from 'react'
import "../Css/all.css"

import About from './About'
import Products from './products/Products'
const Profile = ({islogin}) => {

  return (
    <div className='profilemain'>
        <Products/>
        <About islogin={islogin}/>
    </div>
  )
}

export default Profile
