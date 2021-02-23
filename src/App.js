import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading,setLoading]=useState(true);
  const [tours,setTours]=useState([]);
  
  const deleteTour=(id)=>{
    let newTours=tours.filter((tour)=> tour.id!==id)
    setTours(newTours);
  }

  const fetchTheData=async ()=>{
    try {
      const response= await fetch(url);
      const data=await response.json();
      console.log('data: ',data);
      setLoading(false);
      setTours(data);      
    } catch (error) {
      setLoading(false);
      console.log(error)      
    }
  }

  useEffect(()=>{
    fetchTheData();
  },[])
  
  if(loading)
    return <main>
      <Loading/>
    </main>
  else if(tours.length===0)
    return <main>
      <div>
        <h2>No tours left</h2>
        <button className="btn" onClick={fetchTheData}>Refresh</button>
      </div>
    </main>
  return <main>
      <Tours tours={tours} deleteTours={deleteTour}/>
    </main>
}

export default App
