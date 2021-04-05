import axios from 'axios'
import React from 'react'
import {Row,Col,ListGroup,ListGroupItem} from "react-bootstrap"
import {useEffect,useState} from "react"
    

const Forecast = ({lat,long}) => {

    const [weather1,setWeather1]=useState("")
    const [weather2,setWeather2]=useState("")
    const [weather3,setWeather3]=useState("")
    const [icon,setIcon]=useState([])
    const [desc,setDesc]=useState([])
    const [date,setdate]=useState([])

 
      
   
    useEffect(() => {
        const getForecast=async()=>{
            const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=82a4674269ac8f84ea2f4e73ddb3f99e&units=metric`)
            setWeather1(String((data.list[8].main.temp).toFixed(0))+"/"+String((data.list[9].main.temp).toFixed(0)))
            setWeather2(String((data.list[16].main.temp).toFixed(0))+"/"+String((data.list[17].main.temp).toFixed(0)))
            setWeather3(String((data.list[24].main.temp).toFixed(0))+"/"+String((data.list[25].main.temp).toFixed(0)))
            setIcon([data.list[8].weather[0].icon,data.list[16].weather[0].icon,data.list[24].weather[0].icon])
            setDesc([data.list[8].weather[0].description,data.list[16].weather[0].description,data.list[24].weather[0].description])
            setdate([data.list[8].dt_txt,data.list[16].dt_txt,data.list[24].dt_txt])
            // console.log(icon[0])
            console.log(data)
        
            
        }
       getForecast()
    },[lat,long])
    return (
        <ListGroup>
          <ListGroupItem>
            <Row >
                <Col><p style={{fontSize:"14px"}}>{date[0]}</p></Col>
                <Col ><p style={{fontSize:"14px"}}><img  src={"https://openweathermap.org/img/w/"+icon[0]+".png"} alt=""></img>{weather1}&#8451;</p></Col>
                <Col ><p style={{fontSize:"12px",lineHeight:"45px"}}>{desc[0]}</p></Col>
            </Row>
            </ListGroupItem>
            <ListGroupItem>
            <Row >
                <Col  ><p style={{fontSize:"14px"}}>{date[1]}</p></Col>
                <Col  ><p style={{fontSize:"14px"}}><img  src={"https://openweathermap.org/img/w/"+icon[1]+".png"} alt=""></img>{weather2}&#8451;</p></Col>
                <Col ><p style={{fontSize:"12px",lineHeight:"40px"}}>{desc[1]}</p></Col>
            </Row>
            </ListGroupItem>
            <ListGroupItem>
            <Row >
                <Col  ><p style={{fontSize:"14px"}}>{date[2]}</p></Col>
                <Col ><p style={{fontSize:"14px"}}><img  src={"https://openweathermap.org/img/w/"+icon[2]+".png"} alt=""></img>{weather3}&#8451;</p></Col>
                <Col ><p style={{fontSize:"12px",lineHeight:"40px"}}>{desc[2]}</p></Col>
            </Row>
            </ListGroupItem>
        </ListGroup>
    )
}

export default Forecast
