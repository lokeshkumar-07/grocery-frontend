import React from 'react'

const Checkout2 = () => {
  return (
    <div className="checkout">
      <div className="container">
        <div className="flex gap-10">
          <div className="w-[50%] mt-[30px]">
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

          <div className="w-[50%] mt-[30px]">
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
                            <h1>Rs {cart.totalPrice}</h1>
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
  )
}

export default Checkout2
