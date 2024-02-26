import React from 'react'
import SelectCity from './SelectCity'

const Header = ({cities,onChange, currentCity}) => {
  return (
    <div className='flex md:justify-between py-10 space-x-4'>
        <div className='text-base md:text-2xl lg:text-2xl text-lime-700'>
            Weather App      
        </div>
        <SelectCity currentCity={currentCity} onChange={onChange} cities={cities}/>
    </div>
  )
}

export default Header
