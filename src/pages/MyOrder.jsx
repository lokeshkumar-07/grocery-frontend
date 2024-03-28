import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/orderSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cod from '../assets/cod.png'
import online_pay from '../assets/online.png'
import et from '../assets/empty_cart2.png'
import Loading from "../components/Loading";

const MyOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userOrders } = useSelector((state) => state.orders);
  const { currentUser} = useSelector((state) => state.auth)

  const [loading, setLoading]  = useState(true)

  const loadMyOrders = async () => {
    setLoading(true)
    await dispatch(getUserOrders());
    setLoading(false)
  };

  useEffect(() => {
    loadMyOrders();
  }, []);

  return (
    <div className="container">
      {loading && <Loading />}
      {userOrders.length > 0 ? (
        <div>
          <h1 className="flex justify-center text-[22px] text-gray-700 font-[800]">HI, {currentUser.name} Your Orders</h1>
          <div className="flex flex-col gap-5 my-[25px] mx-auto w-[650px]  ">
            <table>
              <thead className="mt-[50px]">
                <tr className="border-b border-slate-400">
                  <th className="mt-10">ORDERID</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="border-b border-slate-400 mt-[20px]">
                {userOrders.map((item, index) => (
                  <tr key={index}>
                    <td className="py-[20px]">
                      <div className="flex items-start">
                        <div className="flex items-center gap-2 justify-center">
                          <h1
                            className="text-blue-600 hover:cursor-pointer"
                            onClick={() => navigate(`/order/${item._id}`)}
                          >
                            {item._id}
                          </h1>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center text-[20px]">
                        <h1
                          className={`${
                            item.status === "pending" ?
                            "text-pink-500" : (
                              item.status === "shipped" ? "text-blue-500" : "text-green-500"
                            )
                          }`}
                        >
                          {item.status}
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-4 justify-center">
                        <div className="flex items-center gap-1 text-gray-500 font-[500]"> 
                          {item.paymentMode == "online" ? <img src={online_pay} className="w-[18px] h-[18px]"/> :  <img src={cod} className="w-[18px] h-[18px]"/>}
                          <h1 className="text-[20px]">{item.paymentMode}</h1>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center">
                        <h1 className="text-gray-700 font-[600] text-[18px]">Rs {item.totalPrice}</h1>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center md:flex-row flex-col-reverse mt-[100px]">
          <div className="w-[50%]">
            <div className="flex mx-auto gap-3 text-center flex-col ">
              <h1 className="text-[26px] font-[700]">No orders</h1>
              <h1 className="text-[22px] text-gray-500">Go find the products you like</h1>
              <div>
                <button onClick={() => navigate('/products')} className="px-8 py-3 border-gray-400 rounded-full bg-orange-500 text-white font-[400] text-[18px]">
                  Go Shooping
                </button>
              </div>
              
            </div>
          </div>

          <div className="w-[50%]">
            <img src={et} className="w-[210px] h-[210px] md:w-[350px] md:h-[350px]"/>
          </div>

        </div>
      )}
    </div>
  );
};

export default MyOrder;
