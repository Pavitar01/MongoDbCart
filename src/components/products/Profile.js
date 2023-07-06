import React from 'react'
import "../Css/all.css"
import Products from '../Products'
import About from './About'
const Profile = ({islogin}) => {

  return (
    <div className='profilemain'>
        <Products/>
        <About islogin={islogin}/>
    </div>
  )
}

export default Profile
