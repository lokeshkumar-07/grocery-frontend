import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getProduct, updateProduct } from "../features/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { productId } = useParams();
  const { product } = useSelector((state) => state.products);

  const getProductMethod = () => {
    dispatch(getProduct({ productId: productId }));
  };

  useEffect(() => {
    getProductMethod();
  }, [productId]);

  const categories = [
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

  const unit = [
    "250 g",
    "500 g",
    "1 kg",
    "2 kg",
    "5kg",
    "10 kg",
    "500 ml",
    "1 L",
    "1 Unit",
    "2 Unit",
    "5 Unit",
    "10 Unit",
    "20 Unit",
  ];

  const initialValues = {
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    unit: product.unit,
  };

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    price: yup.number().required("Required"),
    category: yup.string().required("Required"),
    stock: yup.string().required("Required"),
    unit: yup.string().required("Required"),
  });

  const handleFormSubmit = (values, onSubmitProps) => {
    const data = {
      name: values.name,
      price: values.price,
      category: values.category,
      stock: values.stock,
      unit: values.unit,
    };

    dispatch(updateProduct({ productId: productId, formData: data }));
    navigate('/products')
  };

  return (
    <div className="container">
      <div className="flex flex-col">
        <div className="mx-auto">
          <h1 className="my-5 text-center text-[32px] text-gray-600 text font-[600]" >Update Product</h1>

          <Formik
            onSubmit={handleFormSubmit}
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
                <div className="flex flex-col gap-5">
                  <div>
                    <TextField
                      name="name"
                      className="w-[400px]"
                      value={values.name}
                      label="Product Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </div>

                  <div>
                    <TextField
                      className="w-[400px]"
                      name="category"
                      select
                      value={values.category}
                      label="Categery"
                      defaultValue=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.category) && Boolean(errors.category)
                      }
                      helperText={touched.category && errors.category}
                    >
                      {categories.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <div>
                    <TextField
                      className="w-[400px]"
                      name="unit"
                      select
                      label="Unit"
                      value={values.unit}
                      defaultValue=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.unit) && Boolean(errors.unit)}
                      helperText={touched.unit && errors.unit}
                    >
                      {unit.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <div>
                    <TextField
                      className="w-[400px]"
                      name="price"
                      label="Product Price"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₹</InputAdornment>
                        ),
                      }}
                      value={values.price}
                      defaultValue={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.price) && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </div>

                  <div className="w-[400px]">
                    <label htmlFor="">Stock</label>
                    <TextField
                      inputProps={{ step: 1 }}
                      type="number"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="stock"
                      defaultValue={1}
                      fullWidth
                      error={Boolean(touched.stock) && Boolean(errors.stock)}
                      helperText={touched.stock && errors.stock}
                    />
                  </div>

                  <div className="mx-auto">
                    <button className="bg-blue-500 px-5 py-2 rounded-md text-white w-[400px] h-[50px] hover:bg-pink-500 text-[18px] font-[600]">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
