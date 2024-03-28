import { AccountTree, Spellcheck } from '@mui/icons-material'
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup'
import { createProduct } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])

  const categories = [
    {
      "name": "Fruits",
      "value": "Fruits"
    },
    {
      "name": "Vegatibles",
      "value": "Vegatibles"
    },
    {
      "name": "Meat",
      "value": "Meat"
    },
    {
      "name": "Milk & Diary",
      "value": "Milk and Diary"
    },
    {
      "name": "Dry Fruits",
      "value": "Dry Fruits"
    },
    {
      "name": "Oil & Masala",
      "value": "Oil and Masala"
    },

  ]

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
    
  ]

  const initialValues = {
    name: "",
    price: 5,
    category: "",
    stock: 1,
    unit: ""
  }


  const schema = yup.object().shape({
    name: yup.string().required('Required'),
    price: yup.number().required('Required'),
    category: yup.string().required('Required'),
    stock: yup.string().required('Required'),
    unit: yup.string().required("Required")
  })

  const productImageChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload= () => {
        if (reader.readyState === 2){
          setImagesPreview((old) => [...old, reader.result] )
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }
  
  const handleFormSubmit = (values, onSubmitProps) => {
    
    const formData = new FormData()

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("stock", values.stock);
    formData.append("unit", values.unit)

    images.forEach((image) => {
      formData.append("images", image)
    })

    dispatch(createProduct(formData))
    navigate('/products')
  }

  return (
    <div className="container">
        <div className="flex items-center flex-col">
          <div className='mx-auto'>
            <h1 className='my-5 text-center text-[32px] text-gray-600 text font-[600]'>Add a Product</h1>

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
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-3'>
                    <div>
                        <TextField 
                            name="name" className='w-[400px]'
                            label="Product Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.name) && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                    </div>

                    <div>
                        <TextField
                            className='w-[400px]'
                            name="category"
                            select
                            label="Categery"
                            defaultValue=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.category) && Boolean(errors.category)}
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
                          className='w-[400px]'
                          name="unit"
                          select
                          label="Unit"
                          defaultValue=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.unit) && Boolean(errors.unit)}
                          helperText={touched.unit && errors.unit}
                        >
                          {unit.map((item,index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                    </div>

                    <div>
                        <TextField className='w-[400px]'
                            name="price"
                            label="Product Price"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                            }}
                            defaultValue={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.price) && Boolean(errors.price)}
                            helperText={touched.price && errors.price}
                        />
                    </div>

                    <div className='w-[400px]'>
                        <label htmlFor="">Stock</label>
                        <TextField
                            inputProps={{ step: 1 }}
                            type="number"
                            name="stock"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="stock"
                            defaultValue={1}
                            fullWidth
                            error={Boolean(touched.stock) && Boolean(errors.stock)}
                            helperText={touched.stock && errors.stock}
                        />
                    </div>

                    <div>
                      <input 
                        type="file"
                        name="productImages"
                        accept='image/*'
                        onChange={productImageChange}
                        multiple
                      />
                    </div>

                    <div className='flex items-center gap-2'>
                      {imagesPreview.map((image, index) => (
                        <img key={index} src={image} height="40px" width="40px" />
                      ))}
                    </div>
                    
                    <div className='mx-auto'>
                      <button type='submit' className='bg-blue-500 px-5 py-2 rounded-md text-white w-[400px] h-[50px] hover:bg-pink-500 text-[18px] font-[600]' >ADD PRODUCT</button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          
        
      </div>
    </div>
  )
}

export default CreateProduct
