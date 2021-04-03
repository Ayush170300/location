import React from 'react'
import {Row,Col} from "react-bootstrap"
const Currency = () => {
    return (
        <div style={{height:"300px",width:"400px" ,margin:"2% 25%"}}>
            <Row>
                <Col ><p style={{fontSize:"18px"}}>Currency</p></Col>
                <Col ><p style={{fontSize:"18px"}}>Price</p></Col>
                <Col ><p style={{fontSize:"18px"}}>%Change</p></Col>
                
            </Row>
        </div>
    )
}

export default Currency
