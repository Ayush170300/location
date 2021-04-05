

import {React,useEffect, useState}from 'react'
import axios from "axios"
import {Row,Col,ListGroup,ListGroupItem} from "react-bootstrap"

const Currency = ({currency}) => {
     
const [usdeq,setUsdeq]=useState()
const [eueq,setEueq]=useState()
const [c1,setC1]=useState()
const [c2,setC2]=useState()

     
  useEffect(() => {
    const getRate=async()=>{
        try {
            const USD=await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_${currency}&compact=ultra&apiKey=283ab3f45120204d2300`)
        const EUR=await axios.get(`https://free.currconv.com/api/v7/convert?q=EUR_${currency}&compact=ultra&apiKey=283ab3f45120204d2300`)

        const d = new Date();
        d.setMonth(d.getMonth()-1)
        
         
        const prv1= await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_${currency}&compact=ultra&date=${d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()}&apiKey=283ab3f45120204d2300`)
        const prv2= await axios.get(`https://free.currconv.com/api/v7/convert?q=EUR_${currency}&compact=ultra&date=${d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()}&apiKey=283ab3f45120204d2300`)
        

        var v1=Object.values(prv1.data)[0]
        var v2=Object.values(prv2.data)[0]

        var p1=Object.values(v1)[0]
        var p2=Object.values(v2)[0]
        
        var d1=Object.values(USD.data)[0]
        var d2=Object.values(EUR.data)[0]

        
        setUsdeq(Object.values(USD.data)[0])
        setEueq(Object.values(EUR.data)[0])
        var t1=((d1-p1)/p1).toFixed(4)*100
        var t2=((d2-p2)/p2).toFixed(4)*100
        setC1(t1>0?"+"+t1.toString():t1.toString())
        setC2(t2>0?"+"+t2.toString():t2.toString())
            
        } catch (error) {
            console.log(error.message)
            
        }
        
        
     }
      
      getRate()
      
  }, [currency])
    return (
        <div style={{height:"300px",width:"400px" ,margin:"2% 25%"}}>
           <ListGroup>
            <ListGroupItem>
            <Row>
                <Col ><p style={{fontSize:"18px"}}>Currency</p></Col>
                <Col ><p style={{fontSize:"18px"}}>Price</p></Col>
                <Col ><p style={{fontSize:"18px"}}>%Change</p></Col>
                
            </Row>
            </ListGroupItem>
            <ListGroupItem>
            <Row>
                <Col ><p style={{fontSize:"18px"}}>{"USD"+currency}</p></Col>
                <Col ><p style={{fontSize:"18px"}}>{usdeq}</p></Col>
                <Col ><p style={Number(c1)>=0?{fontSize:"18px",color:"green"}:{fontSize:"18px",color:"red"}}>{c1}%</p></Col>
                
            </Row>
            </ListGroupItem>
            
            <ListGroupItem>
            <Row>
                <Col ><p style={{fontSize:"18px"}}>{"EUR"+currency}</p></Col>
                <Col ><p style={{fontSize:"18px"}}>{eueq}</p></Col>
                <Col ><p style={Number(c2)>=0?{fontSize:"18px",color:"green"}:{fontSize:"18px",color:"red"}}>{c2}%</p></Col>
                
            </Row>
            </ListGroupItem>
            </ListGroup>
        </div>
    )
}

export default Currency
