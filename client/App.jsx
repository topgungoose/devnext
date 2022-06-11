import React, { useState } from 'react';


export default function App() {

  const [data,setData] = useState('')


  function handleClick() {
    fetch('http://localhost:8080/api/')
    .then((res) => res.json())
    .then((data) => {
        setData(data)
      // console.log(data);
    }).catch((err) => {
      console.log(err);
    })
  }


  return (
      <>
        <h1>Hello World From Client Front End.</h1>
      <button onClick={handleClick}>Send to the server</button>
      {data && <h2>{data}</h2>}
    </>
    )
}