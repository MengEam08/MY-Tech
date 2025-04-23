import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiUrl, adminToken } from '../../common/http';

const Edit = () => {
  const [disable, setDisable] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${apiUrl}/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${adminToken()}`,
            Accept: 'application/json',
          },
        });
        const result = await res.json();

        if (res.ok) {
          reset({
            name: result.data.name,
            status: result.data.status.toString(),
          });
        } else {
          toast.error('Failed to fetch category.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Network error while fetching category.');
      }
    };

    fetchCategory();
  }, [id, reset]);

  const updateCategory = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/brands/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log('Update response:', result);

      setDisable(false);

      if (res.ok) {
        toast.success(result.message || 'Category updated successfully.');
        navigate('/admin/brands');
      } else {
        toast.error(result.message || 'Something went wrong while updating.');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Network error while updating category.');
      setDisable(false);
    }
  };

  return (
    <Layout>
      <div className="container-md">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h-4 pb-0 mb-0">Brands / Edit</h4>
            <Link to="/admin/brands" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(updateCategory)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      {...register('name', {
                        required: 'The name field is required.',
                      })}
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      id="status"
                      className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                      {...register('status', {
                        required: 'Please select status.',
                      })}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                    {errors.status && (
                      <p className="invalid-feedback">{errors.status.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                {disable ? 'Updating...' : 'Update'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
