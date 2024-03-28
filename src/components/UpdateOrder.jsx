import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateOrder } from '../features/orderSlice'
import {RxUpdate} from 'react-icons/rx'

const UpdateOrder = (props) => {

    const dispatch = useDispatch()

    const item = props.item

    const allStatus = ['pending', 'shipped', 'delivered']
    
    const [currentStatus, setCurrentStatus] = useState(item.status)
    
    const handleUpdate = () => {
        dispatch(updateOrder({orderId : item._id, status: currentStatus}))
        props.onCountChange()
    }

    useEffect(() => {
        setCurrentStatus(item.status)
    },[item.status])

  return (
    <tr>
        <td className='py-[20px]'>
            <div className='flex items-start'>
            <div className='flex items-center gap-2 justify-center'>
                <h1 className='text-blue-600 hover:cursor-pointer' onClick={() => navigate(`/order/${item._id}`)}>{item._id}</h1>
        
            </div>
            
            </div>
        </td>

        <td >
            <div className='flex justify-center'>
                <select className='outline-none border border-gray-400 ' value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                    {allStatus.map((st, index) => <option value={st} key={index}>{st}</option>)}
                </select>
            </div>
            
        </td>

        <td>
            <div className='flex items-center gap-4 justify-center'>
    
            <div>{item.paymentMode}</div>
            
            </div>
        </td>

        <td>
            <div className='flex justify-center'>
            <h1>Rs {item.totalPrice}</h1>
            </div>
            
        </td>

        <td>
            <div className='flex justify-center'>
                <button onClick={handleUpdate} 
                    className='flex items-center gap-2 bg-blue-400 text-white px-5 p-2 rounded-md hover:bg-pink-500'>
                    <span className='text-white'><RxUpdate /></span><h1>Update</h1>
                </button>
            </div>
        </td>
    </tr>
  )
}

export default UpdateOrder
