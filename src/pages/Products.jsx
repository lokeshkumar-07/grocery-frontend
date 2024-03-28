import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/productSlice";
import { createCartItem, getCart, getCartItems } from "../features/cartSlice";
import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import em from '../assets/nproduct.png'
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Products = () => {
  const disptach = useDispatch();
  const navigate = useNavigate()

  const {currentUser} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)

  const { products, total } = useSelector((state) => state.products);
  const { cart, cartItems } = useSelector((state) => state.carts);
  console.log(cart)

  const productIdinCarts = cartItems.map((cart) => cart.productId);

  const GetCart = async () => {
    disptach(getCart());
  };

  const GetCartItems = async () => {
    disptach(getCartItems({ cartId: cart._id }));
  };

  useEffect(() => {
    GetCart();
    GetCartItems();
  }, []);

  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState({ sort: "price", order: "default" });

  

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

  const getAllProducts = async () => {
    setLoading(true)
    const data = {
      limit: limit,
      search: search,
      minPrice: minPrice,
      maxPrice: maxPrice,
      category: category,
      sort: sort,
      page: page,
    };
    await disptach(getAllProduct(data));
    setLoading(false)
  };

  const createCartItemMethod = (productId, cartId) => {
    console.log(productId, cartId);
    disptach(createCartItem({ productId: productId, cartId: cartId }));
  };

  const updatePrice = (e) => {
    setMaxPrice(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    console.log("getting all products");
    getAllProducts();
  }, [limit, page, search, minPrice, maxPrice, category, sort]);


  const sortValue = [
    {
      "name" : "Default",
      "value" : "default"
    },
    {
      "name" : "Asc",
      "value" : "asc"
    },
    {
      "name": "Desc",
      "value": "desc"
    }
  ]

  return (
    <div className="border-b border-slate-300">
  <div className="container flex flex-col md:flex-row">
    {/* Sidebar */}
    <div className="flex flex-col md:flex-row md:w-[20%] w-full md:h-[100vh] md:border-r border-slate-300 pt-7">
      <div className="w-full md:w-[70%]">
        <div className="py-[20px]">
          <div className="flex items-center border border-slate-500 rounded-[5px] px-1 py-0.5 w-full md:w-[100%]">
            <Search />
            <input
              placeholder="Search item...."
              type="text"
              value={search}
              onChange={handleSearch}
              className="p-2 border-none outline-none w-full"
            />
          </div>
        </div>

        <div className="py-[22px] flex flex-col gap-2">
          <div>
            <h1 className="font-[700] text-[18px]">Select Category</h1>
          </div>

          {items.map((item, index) => (
            <div className="flex items-center gap-1" key={index}>
              <input
                type="checkbox"
                value={item.value}
                onChange={onChange}
              />
              <p className="text-[15px] leading-7">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="py-[20px] gap-2">
          <h1 className="font-[700] text-[18px]">Price range</h1>
          <h1 className="text-[15px] leading-8">₹ {maxPrice}</h1>
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

    {/* Main Content */}
    <div className="flex flex-col gap-3 w-full md:w-[80%] px-4 pt-10">
      <div className="filter flex items-center">
        <h1 className="text-slate-500 font-[500]">Sort By : Price</h1>
        <select
          className="ml-4 outline-none border font-[500] border-gray-400"
          value={sort.order}
          onChange={(e) =>
            setSort((prev) => ({ ...prev, order: e.target.value }))
          }
        >
          {sortValue.map((item, index) => (
            <option className="" key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-10">
        {loading && <Loading />}
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <img
                className="max-w h-[250px] object-cover"
                src={product.images[0].url}
                alt={product.name}
              />
              <h1 className="text-[16px] font-[500]">{product.name}</h1>
              <span className="text-[14px] text-gray-500">{product.unit}</span>
              <div className="flex items-center justify-between">
                <h1>₹ {product.price}</h1>
                {currentUser ? (
                  <>
                    {!productIdinCarts.includes(product._id) ? (
                      <button
                        disabled={product.stock <= 0}
                        onClick={() =>
                          createCartItemMethod(product._id, cart._id)
                        }
                        className={
                          product.stock <= 0
                            ? "flex items-center gap-2 bg-gray-500 px-5 py-2 text-white"
                            : "flex items-center gap-2 bg-blue-500 px-5 py-2 text-white"
                        }
                      >
                        <span>
                          <AiOutlineShoppingCart />
                        </span>{" "}
                        <h1 className="text-[14px]">
                          {product.stock <= 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                        </h1>
                      </button>
                    ) : (
                      <button onClick={() => navigate('/carts')} className="flex items-center gap-2 bg-slate-500 px-5 py-2 text-white">
                        <span>
                          <AiOutlineShoppingCart />
                        </span>{" "}
                        <h1 className="text-[14px]">Go to Cart</h1>
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-blue-500 px-5 py-2 text-white"
                    onClick={() => navigate('/auth')}
                  >
                    <span>
                      <AiOutlineShoppingCart />
                    </span>{" "}
                    <h1 className="text-[14px]">Log In</h1>
                  </button>
                )}
              </div>
              {product.stock <= 10 && (
                <h1 className="text-red-500 font-[500]">
                  {product.stock === 0
                    ? "Item is Out of Stock!"
                    : `Hurry only ${product.stock} is left`}
                </h1>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-between mx-auto mt-10 w-full">
            <img src={em} alt="Empty Image" />
          </div>
        )}
      </div>

      <div className="pagination flex justify-center my-4 mt-10">
        <div className="border border-slate-400 rounded-sm">
          {totalPages > 1 && (
            <>
              <IconButton onClick={prevPage} disabled={page === 1}>
                <BiSkipPrevious className="w-6 h-6 text-blue-500" />
              </IconButton>
              {page}
              <IconButton
                disabled={page === totalPages}
                onClick={nextPage}
                className="bg-blue-500"
              >
                <BiSkipNext className="w-6 h-6 text-blue-500" />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Products;
