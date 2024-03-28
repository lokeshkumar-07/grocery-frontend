import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getAllOrders } from "../features/orderSlice";
import UpdateOrder from "../components/UpdateOrder";
import { getAllProduct, getProduct } from "../features/productSlice";
import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings } from "react-icons/md";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const { products, total } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState("orders");

  const [count, setCount] = useState(0);

  const countIncrement = () => {
    setCount(count + 1);
  };



  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState({ sort: "price", order: "default" });

  const [orderStatus, setOrderStatus]= useState([])
  const [paymentModeStatus, setPaymentModeStatus] = useState([])

  const allOrders = () => {
    const data = {
      paymentMode: paymentModeStatus,
      orderStatus: orderStatus
    };
    dispatch(getAllOrders(data));
  };

  useEffect(() => {
    console.log("kfljdsklafjlaksdjfkl")
    allOrders();
  }, [count, orderStatus, paymentModeStatus]);


  const items = [
    {
      name: "Fruits",
      value: "Fruits",
    },
    {
      name: "Vegatibles",
      value: "Vegatibles",
    },
    {
      name: "Meat",
      value: "Meat",
    },
    {
      name: "Milk & Diary",
      value: "Milk and Diary",
    },
    {
      name: "Dry Fruits",
      value: "Dry Fruits",
    },
    {
      name: "Oil & Masala",
      value: "Oil and Masala",
    },
  ];

  const items2 = [
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "Shipped",
      value: "shipped",
    },

    {
      name: "Delivered",
      value: "delivered",
    },
  ]

  const items3 = [
    {
      name: "Online",
      value: "online",
    },
    {
      name: "Cash",
      value: "cash",
    },
  ]

  const totalPages = Math.ceil(total / limit);

  const onPageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const onChange = (e) => {
    if (e.target.checked) {
      const state = [...category, e.target.value];
      setCategory(state);
      setPage(1);
    } else {
      const state = category.filter((val) => val !== e.target.value);
      setCategory(state);
      setPage(1);
    }
  };

  const onChange2 = (e) => {
    if (e.target.checked) {
      const state = [...orderStatus, e.target.value];
      setOrderStatus(state);
    } else {
      const state = orderStatus.filter((val) => val !== e.target.value);
      setOrderStatus(state);
    }
  };

  const onChange3 = (e) => {
    if (e.target.checked) {
      const state = [...paymentModeStatus, e.target.value];
      setPaymentModeStatus(state);
    } else {
      const state = paymentModeStatus.filter((val) => val !== e.target.value);
      setPaymentModeStatus(state);
    }
  };

  const getAllProducts = async () => {
    const data = {
      limit: limit,
      search: search,
      minPrice: minPrice,
      maxPrice: maxPrice,
      category: category,
      sort: sort,
      page: page,
    };
    dispatch(getAllProduct(data));
  };

  const updatePrice = (e) => {
    setMaxPrice(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    getAllProducts();
  }, [limit, page, search, minPrice, maxPrice, category, sort]);

 

  const handleUpdate = async (productId) => {
    await dispatch(getProduct({ productId: productId }));
    navigate(`/productupdate/${productId}`);
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center mx-auto">
        <div className="flex items-center gap-2 mt-5">
          <MdAdminPanelSettings className="text-[40px] text-red-500" />
          <h1 className="text-gray-700 font-bold text-[32px]">Admin Panel</h1>
        </div>
        <h1 className="text-gray-500 text-[18px] font-[600] mt-1">Hello {currentUser.name} you are Admin</h1>
      </div>

      <div className="flex items-center justify-between  w-[750px] mx-auto">
        <div className="flex">
          <div
            onClick={() => setActiveTab("products")}
            className={`${
              activeTab === "products" &&
              "text-[18px] font-bold border-b-4 border-blue-500"
            } hover:cursor-pointer px-5 py-5 `}
          >
            Products
          </div>

          <div
            onClick={() => setActiveTab("orders")}
            className={`${
              activeTab === "orders" &&
              "text-[18px] font-bold border-b-4 border-blue-500"
            } hover:cursor-pointer px-5 py-5 `}
          >
            Orders
          </div>
        </div>

        <div className="flex">
          <button
            className="flex items-center bg-yellow-500 h-[40px] px-5 py-2 gap-2 text-white"
            onClick={() => navigate("/create")}
          >
            <span className="text-white">
              <MdAdd />
            </span>
            <h1>Add Product</h1>
          </button>
        </div>
      </div>

      <div>
        {activeTab === "products" ? (
          <div className="flex mt-[50px]">
            <div className="flex flex-col w-[20%] h-[100vh] border-r border-slate-200 ">
              <div>
                <div className="py-[20px] border-t border-slate-400">
                  <div className="border flex items-center border-slate-500 rounded-[5px] w-[80%]">
                    <Search />
                    <input
                      placeholder="Search item...."
                      type="text"
                      value={search}
                      onChange={handleSearch}
                      className="p-2 border-none outline-none w-[50%]"
                    />
                  </div>
                </div>

                <div className="py-[22px] gap-2">
                  <h1 className="font-[800] text-[18px]">Select Category</h1>

                  {items.map((item, index) => (
                    <div className="flex items-center gap-1" key={index}>
                      <input
                        type="checkbox"
                        value={item.value}
                        onChange={onChange}
                      />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>

                <div className="py-[20px] gap-2">
                  <h1 className="font-[800]">Price range</h1>
                  <h1>₹ {maxPrice}</h1>
                  <input
                    type="range"
                    min={0}
                    max={1500}
                    value={maxPrice}
                    onChange={updatePrice}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-[70%] px-[100px]">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
                {products !== "" &&
                  products.map((product, index) => (
                    <div key={index}>
                      <img
                        className="w-[100px] h-[100px]"
                        src={product.images[0].url}
                      />
                      <h1>{product.name}</h1>
                      <span>{product.unit}</span>

                      <div className="flex flex-col gap-2">
                        <h1>₹ {product.price}</h1>

                        <button
                          onClick={() => handleUpdate(product._id)}
                          className="bg-blue-500 px-5 py-2 text-white rounded-md w-[80%]"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="pagination flex  justify-center my-4 mt-[30px]">
                <div className="border border-slate-400 rounded-sm">
                  {totalPages > 1 && (
                    <>
                      <IconButton onClick={prevPage} disabled={page === 1}>
                        <BiSkipPrevious className="w-[32px] h-[32px] text-blue-500" />
                      </IconButton>
                      {/* {[...Array(totalPages)].map((val, index) => (
                        <button  onClick={() => onPageChange(index)} key={index}>{index + 1}</button>
                      ))} */}
                      {page}
                      <IconButton
                        disabled={page === totalPages}
                        onClick={nextPage}
                        className="bg-blue-500"
                      >
                        <BiSkipNext className="w-[32px] h-[32px] text-blue-500" />
                      </IconButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            
            <div className="flex mt-[50px]">
              <div className="flex flex-col w-[20%] h-[100vh] border-r border-t border-slate-250 ">
                <div>
                
                  <div className="py-[22px] gap-2">
                    <h1 className="font-[800] text-[18px]">
                      Select Order Status
                    </h1>

                    {items2.map((item, index) => (
                      <div className="flex items-center gap-1" key={index}>
                        <input
                          type="checkbox"
                          value={item.value}
                          onChange={onChange2}
                        />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>

                  <div className="py-[22px] gap-2">
                    <h1 className="font-[800] text-[18px]">
                      Filer By Payment Mode
                    </h1>

                    {items3.map((item, index) => (
                      <div className="flex items-center gap-1" key={index}>
                        <input
                          type="checkbox"
                          value={item.value}
                          onChange={onChange3}
                        />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>

          
                </div>
              </div>

              <div className="flex flex-col gap-5 my-[25px] mx-auto w-[650px]  ">
                {
                  orders.length > 0 ? (
                    <>
                      <table>
                        <thead className="mt-[50px]">
                          <tr className="border-b border-slate-400">
                            <th className="mt-10">ORDERID</th>
                            <th>Status</th>
                            <th>Payment Mode</th>
                            <th>Amount</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="border-b border-slate-400 mt-[20px]">
                          {orders.map((item, index) => (
                            <UpdateOrder
                              onCountChange={countIncrement}
                              key={index}
                              item={item}
                            />
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <>
                      <h1>No Orderse found with this Fileriation</h1>
                    </>
                  )
                }
                
              </div>
            </div>
             
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
