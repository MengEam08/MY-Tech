import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { apiUrl, adminToken } from "../../common/http";
import Loader from "../../common/Loader";
import Nostate from "../../common/Nostate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const Show = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);

  // Fetch all brands from the API
  const fetchCategories = async () => {
    setLoader(true);
    try {
      const token = adminToken();
      console.log("API URL:", `${apiUrl}/brands`);
      console.log("Admin Token:", token);

      const res = await fetch(`${apiUrl}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      console.log("Fetch Result:", result);

      setLoader(false);

      if (result.status === 200) {
        setCategories(result.data);
      } else {
        toast.error("Something went wrong while fetching brands.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error! Failed to fetch brands.");
      setLoader(false);
    }
  };

  // Delete a brand by ID
  const deleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      try {
        const res = await fetch(`${apiUrl}/brands/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });

        const result = await res.json();
        console.log("Delete Result:", result);

        if (result.status === 200) {
          const updatedCategories = categories.filter((cat) => cat.id !== id);
          setCategories(updatedCategories);
          toast.success(result.message);
        } else {
          toast.error("Failed to delete the brand.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Network error! Failed to delete brand.");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container-md">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h-4 pb-0 mb-0">Brands</h4>
            <Link to="/admin/brands/create" className="btn btn-primary">
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
                {!loader && categories.length === 0 && (
                  <Nostate text="Categories not Found" />
                )}
                {!loader && categories.length > 0 && (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th width="50">ID</th>
                        <th>Name</th>
                        <th width="100">Status</th>
                        <th width="100">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            {category.status === 1 ? (
                              <span className="badge text-bg-success">Active</span>
                            ) : (
                              <span className="badge text-bg-danger">Block</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <Link
                                to={`/admin/brands/edit/${category.id}`}
                                className="text-primary"
                              >
                                <FaEdit style={{ fontSize: "1.2rem" }} />
                              </Link>
                              <button
                                onClick={() => deleteCategory(category.id)}
                                className="text-danger btn p-0 border-0 bg-transparent"
                              >
                                <FaTrash style={{ fontSize: "1.2rem" }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
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
