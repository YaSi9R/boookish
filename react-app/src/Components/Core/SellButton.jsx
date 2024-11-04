import React from 'react'
import { Link } from 'react-router-dom'

const SellButton = () => {
  return (
    
      <Link to= "sellBooks">
      <div className="w-[175px] text-sm h-[70px] bg-[#E74C3C] py-[14px] px-[35px] hover:bg-[#b52417] duration-[75] " >
        <div className="text-center text-[white] py-[10px] font-semibold ">
          <i className="fa fa-plus pr-[2px]  "></i>
          SELL BOOKS
        </div>
      </div>

    </Link>
      
    
  )
}

export default SellButton
