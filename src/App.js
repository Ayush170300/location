import { Loader } from "@googlemaps/js-api-loader"
import {useEffect,useState} from 'react'
import './App.css';
import {Row,Col,Button} from 'react-bootstrap'
import Forecast from "./components/Forecast"
import {getAllInfoByISO} from "iso-country-currency"
import Currency from "./components/Currency"
import axios from "axios";
function App() {
  
  const [cityName,setName]= useState("")
  const [temp,setTemp]=useState(0);
  const [lat,setLat]=useState(0)
  const [long,setLong]=useState(0)
  const [show,setshow]=useState(false)
  const [iconf,setIcon]= useState("10d")
  const [currency,setCurrency]= useState("")
  const [showcur,setshowcur]=useState(false)
  
  
  
    useEffect(() => {
      
  const Maps=async(latitude,longitude)=>{
      const loader = new Loader({
        apiKey: "AIzaSyDlUbN769qMWRpTifCLPFNXld-9BDjDrsY",
        version: "weekly",
        
      });
      loader.load().then(() => {
        let map=new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: latitude, lng: longitude },
          zoom: 10,
        });
        var coords= new window.google.maps.LatLng(latitude,longitude)
        new window.google.maps.Marker({map:map,position:coords})
      });
      
    }
  
  
    
   
 
      
      const getLocation=()=> {
       
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
      
      const showPosition=async(position)=> {
        console.log(position)
        
        Maps(Number(position.coords.latitude),Number(position.coords.longitude))
        getWeatherData(Number(position.coords.latitude),Number(position.coords.longitude))
        setLat(Number(position.coords.latitude))
        setLong(Number(position.coords.longitude))
      }
      const getWeatherData=async(latitude,longitude)=>{
        const {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=82a4674269ac8f84ea2f4e73ddb3f99e`)
        setName(data.name)
        setIcon(data.weather[0].icon)
        setTemp(data.main.temp-273.15)
        console.log(data.weather[0].icon)
        setCurrency(getAllInfoByISO(data.sys.country).currency)
        
        
        
       
      }
    
      getLocation()
      
    
    },[])
    
    

    
  
    
  return (
    
    <div className="App">
    
    <Row>
      <Col>
      <div className="weatherdiv">
      
      <span style={{color:'red'}}>{new Date().toLocaleString()}</span>
      <h2>{cityName}</h2>
      <p style={{fontSize:"40px",margin:"3% 10%"}}><img  src={"http://openweathermap.org/img/w/"+iconf+".png"} alt=""></img>{temp} &#8451;</p>
      <Button variant="outline-success" style={{fontSize:"25px",color:"black"}} onClick={()=>{show===false?setshow(true):setshow(false)}}>Next 3 Days Forecast</Button>
      {show&&<Forecast lat={lat} long={long} />}
      
    </div>
      </Col>
      <Col>
      <div style={{margin:"weatherdiv"}}>
      <div id="map" className="map" style={{height:"300px",width:"400px",margin:"2% 25%" }}></div>
      <Button variant="outline-success" style={{fontSize:"25px",color:"black",margin:"2% 25%"}} onClick={()=>{showcur===false?setshowcur(true):setshowcur(false)}}>Currency Exchange</Button>
      {showcur&&<Currency currency={currency} />}
      </div>
      
      </Col>
    </Row>
    
    
      
    </div>
  );
}

export default App;
