import React from 'react'
import logo from '../assets/images/logo.png';
import Image from 'react-bootstrap/Image';

function AppHeader() {
    return (
        <div style={{backgroundColor:"#3d083e"}}>
            <Image src={logo} fluid style={{width:"20em"}}/>
        </div>
    )
}

export default AppHeader
