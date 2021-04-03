import axios from 'axios'
import React from 'react'
import {Row,Col} from "react-bootstrap"
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
            const {data}=await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=82a4674269ac8f84ea2f4e73ddb3f99e&units=metric`)
            setWeather1(String((data.list[0].main.temp).toFixed(0))+"/"+String((data.list[2].main.temp).toFixed(0)))
            setWeather2(String((data.list[3].main.temp).toFixed(0))+"/"+String((data.list[10].main.temp).toFixed(0)))
            setWeather3(String((data.list[11].main.temp).toFixed(0))+"/"+String((data.list[18].main.temp).toFixed(0)))
            setIcon([data.list[0].weather[0].icon,data.list[3].weather[0].icon,data.list[11].weather[0].icon])
            setDesc([data.list[0].weather[0].description,data.list[3].weather[0].description,data.list[11].weather[0].description])
            setdate([data.list[0].dt_txt,data.list[3].dt_txt,data.list[11].dt_txt])
            // console.log(icon[0])
        
            
        }
       getForecast()
    },[lat,long])
    return (
        <div>
            <Row>
                <Col md={4}><p style={{fontSize:"14px"}}>{date[0]}</p></Col>
                <Col md={5}><p style={{fontSize:"14px"}}><img  src={"http://openweathermap.org/img/w/"+icon[0]+".png"} alt=""></img>{weather1}&#8451;</p></Col>
                <Col md={3}><p style={{fontSize:"12px",lineHeight:"45px"}}>{desc[0]}</p></Col>
            </Row>
            <Row>
                <Col  md={4} ><p style={{fontSize:"14px"}}>{date[1]}</p></Col>
                <Col md={5} ><p style={{fontSize:"14px"}}><img  src={"http://openweathermap.org/img/w/"+icon[1]+".png"} alt=""></img>{weather2}&#8451;</p></Col>
                <Col md={3}><p style={{fontSize:"12px",lineHeight:"40px"}}>{desc[1]}</p></Col>
            </Row>
            <Row>
                <Col  md={4} ><p style={{fontSize:"14px"}}>{date[2]}</p></Col>
                <Col md={5}><p style={{fontSize:"14px"}}><img  src={"http://openweathermap.org/img/w/"+icon[2]+".png"} alt=""></img>{weather3}&#8451;</p></Col>
                <Col md={3}><p style={{fontSize:"12px",lineHeight:"40px"}}>{desc[2]}</p></Col>
            </Row>
        </div>
    )
}

export default Forecast
