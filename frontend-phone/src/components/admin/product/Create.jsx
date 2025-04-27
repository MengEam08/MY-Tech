import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../common/Layout";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/http";
import JoditEditor from "jodit-react";


const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]); // State for brands
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Description...",
    }),
    [placeholder]
  );

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await res.json();
      console.log("Categories from backend:", result);

      if (res.ok) {
        setCategories(result.data); // Assuming the response has a 'data' field containing the categories
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Network error while fetching categories.");
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const result = await res.json();
      console.log("Brands from backend:", result);

      if (res.ok) {
        setBrands(result.data); // Assuming the response has a 'data' field containing the brands
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Network error while fetching brands.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []); // Run once when the component mounts

  const saveProduct = async (data) => {
    const formData = { ...data, "description":content,"gallery":gallery};
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
      console.log("Response from backend:", result);
  
      setDisable(false);
  
      if (res.ok) {
        toast.success(result.message);
        navigate("/admin/products");
      } else {
        // Improved error handling
        if (result.error && result.error.sku) {
          toast.error(`${result.error.sku[0]}`);
        
        }
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Network error while creating category.");
      setDisable(false);
    }
  };

 

  const hanleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append("image", file);

  
    setDisable(true);
  
    try {
      const res = await fetch(`${apiUrl}/temp-images`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData, // Do not set Content-Type for FormData, the browser will handle it
      });
  
      const result = await res.json();
      console.log("Response from backend:", result);
  
      if (res.ok) {
        gallery.push(result.data.id); // Add the image ID to your gallery array
        setGallery([...gallery]); 
        galleryImages.push(result.data.image_url);
        setGalleryImages(galleryImages)
        setDisable(false);
        e.target.value=""
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Network error while uploading the image.");
      setDisable(false);
    }
  };
  const deleteImage =(image)=>{
    const newGallery=galleryImages.filter(gallery=>gallery !=image)
    setGalleryImages(newGallery)
   }
  
  
  

  return (
    <Layout>
      <div className="container-md">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h-4 pb-0 mb-0">Products / Create</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  {/* Name Field */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Title
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      {...register("title", {
                        required: "The title field is required.",
                      })}
                    />
                    {errors.title && (
                      <p className="invalid-feedback">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <select
                          className={`form-control ${
                            errors.category ? "is-invalid" : ""
                          }`}
                          {...register("category", {
                            required: "Please select a category",
                          })}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="brand" className="form-label">
                          Brand
                        </label>
                        <select
                          className="form-control"
                          {...register('brand')}
                        >
                          <option value="">Select Brand</option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                        {errors.brand && (
                          <p className="invalid-feedback">
                            {errors.brand.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                    {...register('short_description')}
                      className="form-control"
                      id=""
                      placeholder="Short Description"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          type="text"
                          id=""
                          placeholder="Price"
                          className={`form-control ${
                            errors.price ? "is-invalid" : ""
                          }`}
                          {...register("price", {
                            required: "Please input a price",
                          })}
                          
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                        {...register('compare_price')}
                          type="text"
                          id=""
                          className="form-control"
                          placeholder="Discount Price"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          type="text"
                          id=""
                          placeholder="SKU "
                          className={`form-control ${
                            errors.sku ? "is-invalid" : ""
                          }`}
                          {...register("sku", {
                            required: "Please input a sku",
                          })}
                          
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          {" "}
                          Barcode
                        </label>
                        <input
                        {...register('barcode')}
                          type="text"
                          id=""
                          className="form-control"
                          placeholder="Barcode"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          QTY
                        </label>
                        <input
                        {...register('qty')}
                          type="text"
                          id=""
                          className="form-control"
                          placeholder="QTY "
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* Status Field */}
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          Status
                        </label>
                        <select
                          id="status"
                          className={`form-control ${
                            errors.status ? "is-invalid" : ""
                          }`}
                          {...register("status", {
                            required: "Please select status.",
                          })}
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {errors.status.message}
                          </p>
                        )}
                      </div>
                      
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          Featured
                        </label>
                        <select
                          id="is_featured"
                          className={`form-control ${
                            errors.is_featured ? "is-invalid" : ""
                          }`}
                          {...register("is_featured", {
                            required: "This field is required.",
                          })}
                        >
                          
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
                        {errors.is_featured && (
                          <p className="invalid-feedback">
                            {errors.is_featured.message}
                          </p>
                        )}
                      </div>

                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Image</label>
                        <input 
                            onChange={hanleFile}
                            type="file" 
                            className="form-control"
                            
                        />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                           
                           {
                                galleryImages && galleryImages.map((image,index)=>{
                                    return (
                                        <div className="col-md-3" key={`image-${index}`}>
                                            <div className="card shadow">
                                                <img src={image} alt="" className="w-100" />
                                                <button className="btn btn-danger" onClick={()=>deleteImage(image)}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                                
                            }
                            
                           
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 my-3"
              >
                {disable ? "Creating..." : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
