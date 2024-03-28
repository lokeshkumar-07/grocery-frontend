import React from 'react'
import { useSelector } from 'react-redux'
import {BsCheckCircleFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const OrderPlaced = () => {

  const {latestOrder} = useSelector((state) => state.orders)
  const navigate = useNavigate()
  return (
    <div className='container my-[40px] h-[200px]'>
      <div className='flex'>
        <div className='flex flex-col mx-auto justify-center gap-2'>
          <BsCheckCircleFill className='flex mx-auto w-[100px] h-[100px] text-blue-500' />
          <h1 className="text-[24px] font-[800] text-center">Thank You for Order</h1>
          <h1 className='text-center text-gray-600'>Your Order Id is: {latestOrder._id}</h1>
          <h1 onClick={() => navigate(`/order/${latestOrder._id}`)} className='text-[20px] flex justify-center hover:cursor-pointer hover:text-blue-500'>Order Details</h1>
          <button className='bg-blue-500 py-2 px-5 rounded-md text-white hover:cursor-pointer' onClick={() => navigate('/products')}>Continue Shooping</button>
        </div>
        
      </div>
    </div>
  )
}

export default OrderPlaced
