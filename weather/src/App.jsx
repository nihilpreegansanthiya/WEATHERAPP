import { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { TiWeatherWindy } from "react-icons/ti";
import { FaWind } from "react-icons/fa6";
import proptypes from "prop-types"

import './App.css'

 import c from './assets/c.png'

import r from './assets/r.png'
import ss from './assets/ss.png'
 

 import show from './assets/show.png'

const Weatherdetails = ({icon,temp,city,country,lat,log ,humidity,wind})=>{
  return(
  <>
  <div className='ima'> 
    <img src={icon} alt="ima"/>

  </div>
  <div className="tem">{temp}°C</div>
  <div className="location"> {city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longtitude</span>
      <span>{log}</span>
    </div>

  </div>
  <div className="data-con">
    <div className="element">
     
      <TiWeatherWindy  className=' icon'/>
      <div className="data">
        <div className="humidity-percent">{humidity}%</div>
        <div className="text">humidity</div>
      </div>
    </div>
    <div className="element">
     
     <FaWind   className=' icon'/>
     <div className="data">
       <div className="wind-percent">{wind} kh/h</div>
       <div className="text">wind spedd</div>
     </div>
   </div>
  
  </div>
  <p className='copyright'>
    Design by  <span> Nihil preegan</span>
   </p>
  </>)
}
 let apikey=  "f540211825bf3529001c018107b074b6"

 Weatherdetails.proptypes ={
  icon:proptypes.string.isRequired,
  temp:proptypes.number.isRequired,
  city:proptypes.string.isRequired,
  coundry:proptypes.string.isRequired,
  humidity:proptypes.number.isRequired,
  wind:proptypes.number.isRequired,
  lat:proptypes.number.isRequired,
  log:proptypes.number.isRequired,
}



 
function App() {
  const [text,setText]= useState("madurai");
  const [icon,seticon] = useState(show)
  const [temp,settemp] = useState(0)
  const [city,setcity] = useState("")
  const [coundry,setcoundry] = useState("")
  const [lat,setlat] = useState(0)
  const [log,setlog] = useState(0)
  const [humidity,sethumidity] = useState(0)
  const [wind,setwind] = useState(0)
  const [citynotfound,setcitynotfound] = useState(false)
  const [loading,setloading] = useState(false)
  const [error,seterror] = useState(null)
  
  const weathericonmap ={
    "01d":c,
    "01n":c,
    "02d":c,
    "02n":c,
    "03d":ss,
    "03n":ss,
    "04d":ss,
    "04n":ss,
    "09d":r,
    "09n":r,
    "10d":r,
    "10n":r,
    "13d":show,
    "13n":show,
    
  }

  const search =async ()=>{
    setloading(true)
  
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`
    try{

      let res =await fetch(url)
      let data = await res.json()
      if(data.cod === "404"){
        console.log("city not found")
        setcitynotfound(true)
        setloading(false)
        return
      }
      sethumidity(data.main.humidity)
      setwind(data.wind.speed)
      settemp(data.main.temp)
      setcity(data.name)
      setcoundry(data.sys.coundry)
      setlat(data.coord.lat)
      setlog(data.coord.lon)
      const weathericoncode =data.weather[0].icon
      seticon(weathericonmap[weathericoncode] || c)
      setcitynotfound(false)
    }catch(error){
      console.log("error",error.message);
      seterror("while fetching data")

    }finally{
      setloading(false)

    }
  }
  
const HandleCity =(value)=>{
  setText(value)

}
const handleKeyDown =(e)=>{
  if(e.key === "Enter"){
    search()
  }
}




  return (
    <>
      <div className='con'>
        <div className='i-con'>
          <input type={'text'} className='cityinput'
          placeholder='search city' onChange= { (e)=>HandleCity(e.target.value)}
           value = {text}  onKeyDown={handleKeyDown}/>

         <div className='ff'>
          <IoIosSearch  onClick={()=>search()}/>
          </div>
         
        
          
        </div>
       
    

       
       {loading && <div className='loading-message'> loading...
        
   </div>}
    { error && <div className='error-message'> {error}
        
        </div>}
       {citynotfound && <div className='city-not-found'> city not found
        
        </div>}

       {!loading &&  ! citynotfound && <Weatherdetails icon={icon} temp={temp} city={city} coundry={coundry} lat={lat} log={log} humidity={humidity} 
        wind={wind}/>}
   
   
     </div>
    </>
  )
}

export default App
