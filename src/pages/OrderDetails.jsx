import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import onlinePay from '../assets/online.png'
import cashPay from '../assets/cod.png'

const OrderDetails = () => {
  const { userOrders } = useSelector((state) => state.orders);

  const { orderId } = useParams();

  const order = userOrders.find((item) => item._id === orderId);
  console.log(order)

  return (
    <div className="container">
      <div className="my-10">
        <div className="mx-auto w-[800px] text-[18px] font-[700] text-gray-900">
          <h1 className="font-bold text-[24px]">Order Details</h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1>Name: {order.name}</h1>
              <h1>email: {order.email}</h1>
              <h1>Phone: +91-{order.phone}</h1>
            </div>

            <div className="flex flex-col text-[18px] font-[700] text-gray-900" > <h1>OrderId</h1><h1> #{orderId}</h1></div>
          </div>
          
          
          <div className="my-4">
            {order.items.map((item, index) => (
              <div
                className="flex items-center gap-20 border-y border-gray-500 p-2 mb-2"
                key={index}
              >
                <div className="">
                  <img src={item.images[0].url} width="100px" height="100px mb-1" />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[16px] font-[700] text-gray-700">{item.productName}</h1>
                  <span>
                    {item.quantity} X {item.price}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[16px] font-[700] text-gray-900">Quantity</h1>
                  <h1>{item.quantity}</h1>
                </div>

                
                <div className="flex flex-col">
                  <h1 className="text-[16px] font-[700] text-gray-900">Total</h1>  
                  <h1>Rs {item.price * item.quantity}</h1>
                </div>
              </div>
              
            ))}
          </div>

          <hr />

          <div className="flex flex-col gap-1 my-2">
            <h1 className="text-[18px] font-[700] text-gray-900">Payment Mode</h1>
            <div className="flex items-center gap-1">
              {order.paymentMode === "online" ? <img src={cashPay} className="w-[20px] h-[20px]" /> : <img src={onlinePay} className="w-[20px] h-[20px]" /> }
              <h1>{order.paymentMode}</h1>
            </div>
            
          </div>

          <hr />
          
          
            <div className="flex justify-end mr-5 my-1">
              <div className="flex flex-col">
                <h1 className="text-[20px] font-[700] text-gray-900">Total Amout</h1>
                <h1>Rs {order.totalPrice}</h1>
              </div>
              
            </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
