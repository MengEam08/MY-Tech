import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/http";
import JoditEditor from "jodit-react";

const Create = ({ placeholder }) => {
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveProduct = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Response from backend:", result);

      setDisable(false);

      if (res.ok) {
        // ← Loose equality fix
        toast.success(result.message);
        navigate("/admin/products");
      } else {
        toast.error(result.message);
        console.log("Server response:", result);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Network error while creating category.");
      setDisable(false);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });

    const result = await res.json();
    console.log("Response from backend:", result);
    setCategories(result.data);
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });

    const result = await res.json();
    console.log("Response from backend:", result);
    setBrands(result.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <Layout>
      <div className="container-md">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h-4 pb-0 mb-0">Products / Create</h4>
            <Link to="admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 mb-3">
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
                      placeholder="Title"
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
                      <div className="md-3">
                        <label htmlFor="" className="form-label">
                          Category
                        </label>
                        <select 
                          {...register("category", {
                            required: "Select category field.",
                          })}
                          name="" 
                          className={`form-control ${
                            errors.category ? "is-invalid" : ""
                          }`}>
                        {errors.category && (
                          <p className="invalid-feedback">{errors.category.message}</p>
                        )}
                          <option value="">Select a Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option
                                  key={`category-${category.id}`}
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-3">
                        <label htmlFor="" className="form-label">
                          Brands
                        </label>
                        <select name="" className="form-control" id="">
                          <option value="">Select a Brand</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option
                                  key={`category-${brand.id}`}
                                  value={brand.id}
                                >
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      name=""
                      className="form-control"
                      placeholder=" Short Description"
                      rows={3}
                      id=""
                    ></textarea>
                  </div>
                  <div className="md-3">
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
                  {/* Pricing */}
                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="md-3 ">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          type="text"
                          placeholder="Price"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                          type="text"
                          placeholder="Discounted Price"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Inventory */}
                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="md-3 ">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          type="text"
                          placeholder="sku"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                          type="text"
                          placeholder="Barcode"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="md-3 ">
                        <label htmlFor="" className="form-label">
                          Qty
                        </label>
                        <input
                          type="text"
                          placeholder="Qty"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
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
                  </div>
                  {/* Image */}
                  <h3 className="py-3 border-bottom mb-3">Image</h3>
                  <div>
                    <div className="md-3 ">
                      <label htmlFor="" className="form-label">
                      Image
                      </label>
                      <input
                        type="file"
                        placeholder="Qty"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Status Field */}
                </div>
              </div>

              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
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
