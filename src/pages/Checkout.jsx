import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/orderSlice";
import axios from "axios";
import { ApiUrl } from "../../config";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { InputAdornment, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [PhoPre, setPhonePre] = useState("+91");

  const { cartItems, cart } = useSelector((state) => state.carts);
  const { currentUser } = useSelector((state) => state.auth);
  const { latestOrder } = useSelector((state) => state.orders);
  console.log(cartItems)

  const [count,setCount] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mode, setMode] = useState("cash");
  const [clientSecret, setClientSecret] = useState("");

  console.log(clientSecret);

  const fetchClientSecret = async () => {
    await axios({
      url: `${ApiUrl}/payment/process`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": currentUser.token,
      },
      data: { amount: cart.totalPrice },
    })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  };

  

  useEffect(() => {

  },[])

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const initialValues = {
    address: currentUser.address,
    phone: "",
    email: currentUser.email,
    name: ""
  };

  const schema = yup.object().shape({
    address: yup.string().required("Required"),
    phone: yup.number().test("len", "Must be exactly 10 characters", (val) => {
      if (val) return val.toString().length === 10;
    }),
    email: yup.string().required("Required").email("Invalid Email"),
    name: yup.string().required("Required")
  });

  const handleOrder = async (values, onSubmitProps) => {
    
    if (mode === "online") {
  
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then((res) => {
          console.log(`Payment successFul...`);

          let items = [];
          cartItems.forEach((item) =>
            items.push({
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              images: item.images,
              quantity: item.quantity,
            })
          );

          dispatch(
            createOrder({
              cartId: cart._id,
              totalPrice: cart.totalPrice,
              items: items,
              address: values.address,
              email: values.email,
              phone: values.phone,
              name: values.name,
              mode: mode,
            })
          );
        })
        .then((res) => {
          navigate(`/orderplaced`)
        })
        .catch((err) => console.log(err));
    } else {
      let items = [];
      cartItems.forEach((item) =>
        items.push({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          images: item.images,
          quantity: item.quantity,
        })
      );

      await dispatch(
        createOrder({
          cartId: cart._id,
          totalPrice: cart.totalPrice,
          items: items,
          address: values.address,
          phone: values.phone,
          email: values.email,
          name: values.name,
          mode: mode,
        })
      );
      console.log('hello')
      navigate(`/orderplaced`)
    }
  };

  return (
    <div className="checkout">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[50%] md:mt-[30px]">
            <div className="mt-[20px] mb-[50px] leading-10">
              <h1 className="font-[800] text-[24px] text-gray-900">
                Order Summary
              </h1>
              <h1 className="font-[500] text-[18px] text-gray-600">
                Check your items. And select a suitable shipping method.
              </h1>
            </div>

            <div className="border border-slate-200 rounded-md ">
              {cartItems.map((item, index) => (
                <div
                  className="flex item-center gap-10  px-10 py-5"
                  key={index}
                >
                  <div className="image">
                    <div className="border border-gray-300 rounded-[5px] p-5">
                      <img
                        src={item.images[0].url}
                        className="w-[80px] h-[80px]"
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="font-[800] text-[18px] text-gray-900">
                      {item.productName}
                    </h1>
                    <h1 className="text-gray-700 font-[500] text-[16px]">Quantity {item.quantity}</h1>
                    <h1 className="text-gray-500 text-[14px]">{item.unit}</h1>
                    <h1 className="font-[800] text-[18px] text-gray-700">
                      Rs {item.price * item.quantity}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[50%] md:mt-[30px]">
            <div className="mt-[20px] mb-[50px] leading-10">
              <h1 className="font-[800] text-[24px] text-gray-900">
                Payment Details
              </h1>
              <h1 className="font-[500] text-[18px] text-gray-600">
                Complete your order by providing your payment details.
              </h1>
            </div>

            <div className="address my-[14px]">
              <h1 className="font-[550]  my-[20px]">Delivered To</h1>
              <div>
                <Formik
                  onSubmit={handleOrder}
                  initialValues={initialValues}
                  validationSchema={schema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    resetForm,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-3">
                        <div>
                          <TextField
                            name="email"
                            className="w-[500px]"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              Boolean(touched.email) && Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                          />
                        </div>

                        <div>
                          <TextField
                            name="name"
                            className="w-[500px]"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              Boolean(touched.name) && Boolean(errors.name)
                            }
                            helperText={touched.name && errors.name}
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="">Phone</label>
                          <div className="flex gap-[10px]">
                            <TextField value={PhoPre} className="w-[90px]" />
                            <TextField
                              name="phone"
                              className="w-[400px]"
                              label="Mobile No."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                Boolean(touched.phone) && Boolean(errors.phone)
                              }
                              helperText={touched.phone && errors.phone}
                            />
                          </div>
                        </div>

                        <div>
                          <TextField
                            name="address"
                            className="w-[500px]"
                            label="Address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              Boolean(touched.address) &&
                              Boolean(errors.address)
                            }
                            helperText={touched.address && errors.address}
                          />
                        </div>
                      </div>

                      <div className="below-section mt-[40px]">
                        <div className="address my-[14px]">
                          {mode === "online" && (
                            <div className="flex flex-col gap-2">
                              <h1 className="font-[550]">Card Details</h1>
                              <CardElement className="border w-[500px] border-slate-400 p-5 rounded-md" />
                              {error && <span>Card Element is Empty!</span>}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-10">
                          <div className="leading-7">
                            <h1 className="font-[550] text-[18px]">
                              Total Price
                            </h1>
                            <h1 className="text-lg md:text-xl">Rs {cart.totalPrice}</h1>
                          </div>

                          <div className="leading-7">
                            <h1 className="font-[550] text-[18px]">
                              Payment Mode
                            </h1>
                            <div className="flex gap-5">
                              <label className="flex text-gray-600 gap-1">
                                <input
                                  type="radio"
                                  value="cash"
                                  checked={mode === "cash"}
                                  onChange={handleModeChange}
                                />
                                Cash
                              </label>
                              <label className="flex text-gray-600 gap-1">
                                <input
                                  type="radio"
                                  value="online"
                                  checked={mode === "online"}
                                  onChange={handleModeChange}
                                />
                                Online
                              </label>
                            </div>
                          </div>

                          <button
                            className="bg-blue-500 text-white py-2 px-5 rounded-md"
                          >
                            {mode === "online" ? "PAY" : "ORDER"}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
