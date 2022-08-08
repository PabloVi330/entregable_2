import { useState, useEffect } from 'react'
import './App.css'
import { CardsWheather } from './components/CardsWheather'


function App() {
const [coords, setCoords] = useState()

  useEffect(() => {
    const success = pos =>{
      const location = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(location)
    }
    
    navigator.geolocation.getCurrentPosition(success)
  }, [])
   

  return (
    <div className="App" >
      <CardsWheather lat={coords?.lat} lon={coords?.lon}/>
      
    </div>
  )
}

export default App
