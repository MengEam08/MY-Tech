import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/http";
import Loader from "../../common/Loader";
import Nostate from "../../common/Nostate";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Show = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);


  const fetchProducts = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      const result = await res.json();
      setLoader(false);
      if (result.status === 200) {
        setProducts(result.data);
      } else {
        console.log("Something went wrong!!");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      setLoader(false);
    }
  };

   const deleteProduct = async (id) => {
      if(confirm("are you sure you want to delete product")){
        const res = await fetch(`${apiUrl}/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${adminToken()}`
          },
        }).then(res => res.json())
          .then(result => {
            if (result.status == 200) {
              const newProducts = products.filter(product => product.id != id)
              setProducts(newProducts)
              toast.success(result.message)
            } else {
              toast.error(result.message)
            }
          });
      }
      
    }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container-md">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h-4 pb-0 mb-0">Products</h4>
            <Link to="/admin/products/create" className="btn btn-primary">
              Create
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loader && <Loader />}
                {!loader && products.length === 0 && (
                  <Nostate text="Products not Found" />
                )}
                {products && products.length > 0 && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>QTY</th>
                        <th>Sku</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        return (
                          <tr>
                            <td>{product.id}</td>
                            <td>
                              {product.image_url == "" ? (
                                <img src="https://placehold.co/50x50" />
                              ) : (
                                <img src={product.image_url} width={50} />
                              )}
                            </td>

                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td>{product.sku}</td>
                            <td>
                              {product.status === 1 ? (
                                <span className="badge text-bg-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge text-bg-danger">
                                  Block
                                </span>
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/admin/products/edit/${product.id}`}
                                className="text-primary"
                                title="Edit"
                              >
                                <FaEdit />
                              </Link>
                              <span
                                onClick={() => deleteProduct(product.id)}
                                className="text-danger ms-3"
                                style={{ cursor: "pointer" }}
                                title="Delete"
                              >
                                <FaTrash />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;
