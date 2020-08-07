import React from 'react'
import logo from '../assets/images/logo.png';
import Image from 'react-bootstrap/Image';

function AppHeader() {
    return (
        <div style={{backgroundColor:"#3d083e"}}>
            <Image src={logo} fluid className="img-responsive" style={{height:"10%",width:"10%",padding:"5px"}}/>
        </div>
    )
}

export default AppHeader
