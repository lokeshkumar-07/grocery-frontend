import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCartItem,
  getCart,
  getCartItems,
  incrementCartItem,
  removeCartItem,
} from "../features/cartSlice";
import { createOrder } from "../features/orderSlice";
import {
  MdOutlineCancel,
  MdAddShoppingCart,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import em from "../assets/empty_cart.png";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Carts = () => {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, cart } = useSelector((state) => state.carts);
  const { currentUser } = useSelector((state) => state.auth);

  const cartItemsUpdates = () => {
    dispatch(getCartItems({ cartId: cart._id }));
  };

  console.log(cartItems);
  const cartUpdates = () => {
    dispatch(getCart());
  };

  useEffect(() => {
    cartItemsUpdates();
    cartUpdates();
  }, [count]);

  const increamentItem = async (cartId, productId) => {
    await dispatch(incrementCartItem({ cartId: cartId, productId: productId }));
    setCount(count + 1);
  };

  const decrementItem = async (cartId, productId) => {
    await dispatch(decrementCartItem({ cartId: cartId, productId: productId }));
    setCount(count + 1);
  };

  const removeItemFromCart = async (cartId, productId, id) => {
    await dispatch(
      removeCartItem({ cartId: cartId, productId: productId, id: id })
    );

    setCount(count + 1);
  };

  return (
    <div className="container">
      {cartItems.length > 0 ? (
        <div>
          <h1 className="flex justify-center mt-[50px] text-slate-700 font-bold text-[20px]">Items in Your Cart</h1>
          <div className="flex flex-col gap-5 my-[25px] mx-auto w-[650px]  ">
            <table>
              <thead className="mt-[500px]">
                <tr className="border-b  border-slate-400">
                  <th className="mt-[100px]">Image</th>
                  <th>Product Name</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody className="border-b border-slate-400 mt-[20px]">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-[20px]">
                      <div className="flex items-start">
                        <div className="flex items-center gap-2 justify-center">
                          <img
                            src={item.images[0].url}
                            className="w-[100px] h-[100px]"
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col gap-1">
                          <h1 className="text-gray-800 font-[700] text-[18px]">
                            {item.productName}
                          </h1>
                          <h1 className="text-gray-600 text-[14px]">{item.category}</h1>
                          <h1 className="text-gray-600 text-[14px]">{item.unit}</h1>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center">
                        <h1 className="text-gray-600 text-[18px]">
                          Rs {item.price}
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-1 justify-center">
                        <div className=" px-2 ">
                          
                          <button 
                            disabled={item.quantity === 1}  onClick={() =>
                              decrementItem(item.cartId, item.productId)
                            }>
                            <CiCircleMinus className="hover:cursor-pointer text-[28px] hover:text-blue-500"  />
                          </button>
                          
                          
                        </div>
                        <div>
                          <h1 className="text-gray-600 text-[18px]">
                            {item.quantity}
                          </h1>
                        </div>
                        <div className="px-2 ">
                          <button disabled={item.quantity === item.totalStock} onClick={() =>
                            increamentItem(item.cartId, item.productId)
                          } >
                          <CiCirclePlus className="hover:cursor-pointer text-[28px] hover:text-blue-500"
                          />
                          </button>
                          
                          
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center">
                        <h1 className="text-gray-600 text-[18px]">
                          Rs {item.price * item.quantity}
                        </h1>
                      </div>
                    </td>

                    <td>
                      <div className="flex hover:cursor-pointer justify-center">
                        <RiDeleteBin5Fill
                          className="text-red-600 text-[24px]"
                          onClick={() =>
                            removeItemFromCart(
                              item.cartId,
                              item.productId,
                              item._id
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center gap-10">
              <div>
                <h1 className="font-[500] text-[18px]">Total Price</h1>
                <h1 className="text-gray-700 font-[600] text-[18px]">
                  Rs {cart.totalPrice}
                </h1>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-2 bg-blue-500 hover:bg-purple-500 text-white py-2 px-5"
              >
                <span>
                  <MdShoppingCartCheckout className="w-[20px] h-[20px]" />
                </span>
                <h1 className="text-[16px]">CHECK OUT</h1>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-[100px]">
          <img src={em} className="w-[500px] h-[300px]" />
          <h1>Your Cart is Empty</h1>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 px-5 py-2 rounded-md text-white mt-5"
          >
            Go To Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Carts;
