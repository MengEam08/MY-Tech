import React, { useState } from 'react';
import Layout from '../../common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';

const Create = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveCategory = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Response from backend:", result);

      setDisable(false);

      if (res.ok) {
        toast.success(result?.message || 'Category created!');
        navigate('/admin/brands');
      } else {
        toast.error(result?.message || 'Something went wrong.');
        console.log('Server response:', result);
      }

    } catch (error) {
      console.error('Fetch error: ', error);
      toast.error('Network error while creating category.');
      setDisable(false);
    }
  };

  return (
    <Layout>
      <div className="container-md">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h-4 pb-0 mb-0">Brands / Create</h4>
            <Link to="/admin/brands" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveCategory)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  {/* Name Field */}
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

                  {/* Status Field */}
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
                {disable ? 'Creating...' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
