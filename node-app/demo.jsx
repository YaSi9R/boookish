import React, { useState } from 'react'

function demo() {
    const[value,setValue]=useState(0);
  return (
    <div>
        <button onClick={setValue(value+1)}></button>
<p id="result">{value}</p>
<button onClick={}></button>


    </div>
  )
}

export default demo