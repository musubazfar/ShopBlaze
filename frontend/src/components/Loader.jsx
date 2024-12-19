import React from 'react'
import { Spinner } from "react-bootstrap";

const Loader = ({full, height, width}) => {
  return (
    <div style={{height: full ? '70vh' : '', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Spinner
    animation='border'
    role='status'
    style={{
        height: height,
        width: width,
        margin: 'auto',
        display: 'block'
    }}
    ></Spinner>
    </div>
  )
}

export default Loader