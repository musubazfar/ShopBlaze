import React from 'react'
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{height: '70vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Spinner
    animation='border'
    role='status'
    style={{
        height: '100px',
        width: '100px',
        margin: 'auto',
        display: 'block'
    }}
    ></Spinner>
    </div>
  )
}

export default Loader