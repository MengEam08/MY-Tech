// import React, { useState } from 'react';
// import Layout from '../../common/Layout';
// import { Link, useNavigate } from 'react-router-dom';
// import Sidebar from '../../common/Sidebar';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { adminToken, apiUrl } from '../../common/http';

// const Create = () => {
//     const [disable, setDisable] = useState(false);
//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//       } = useForm();
//     const saveCategory = async (data) => {
//         console.log(data);
//         setDisable(true);
//            try {
//              const res = await fetch(`${apiUrl}/categories`, {
//                method: 'POST',
//                headers: {
//                  'Content-Type': 'application/json',
//                  'Accept': 'application/json',
//                  'Authorization': `Bearer ${adminToken()}`
//                },
//                body: JSON.stringify(data)
//              });
//              const result = await res.json();
//              setDisable(false)
       
//              if (result.status === 200) {
//                toast.success(result.status);
//                navigate('/admin/categories')
//              } else {
//                console.log("Something went wrong!!");
//              }
       
//            } catch (error) {
//              console.error("Fetch error: ", error);
//              setDisable(false)
//            }
//     }
//   return (
//     <Layout>
//       <div className="container-md">
//         <div className="row">
//           <div className="d-flex justify-content-between mt-5 pb-3">
//             <h4 className="h-4 pb-0 mb-0">Categories / Create</h4>
//             <Link to="/admin/categories" className='btn btn-primary'>Back</Link>
//           </div>
//           <div className="col-md-3">
//             <Sidebar />
//           </div>
//           <div className="col-md-9">
//             <form onSubmit={handleSubmit(saveCategory)}>
//                 <div className="card shadow">
//                     <div className="card-body p-4">
//                         <div className='mb-3'>
//                             <label htmlFor="" className='form-label'>
//                                 Name
//                             </label>
//                             <input 
//                                 {
//                                     ...register('name', {
//                                         required: 'The name field is required.'
//                                     })
//                                 }
//                                 type="text" 
//                                 className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                                 placeholder='Name' name="" id="" />
//                                 {errors.name && <p className='invalid-feedback'>{errors.name.message}</p>}
//                         </div>

//                         <div className='mb-3'>
//                             <label htmlFor="" className='form-label'>
//                                 Status
//                             </label>
//                             <select  
//                                 {
//                                     ...register('status', {
//                                     required: 'Please select status.'
//                                     })
//                                 }
//                                 className={`form-control ${errors.status ? 'is-invalid' : ''}`}
//                                 name="" id="">
//                                 <option value="">Select Status</option>
//                                 <option value="1">Active</option>
//                                 <option value="0">Block</option>
//                             </select>
//                             {errors.status && <p className='invalid-feedback'>{errors.status.message}</p>}

//                         </div>
//                     </div>
//                 </div>
//                 <button 
//                     disabled={disable}
//                     type='submit' 
//                     className='btn btn-primary mt-3'>Create
//                 </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Create;
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
      const res = await fetch(`${apiUrl}/categories`, {
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

        if (res.ok)  { // ← Loose equality fix
        toast.success(result.message);
        navigate('/admin/categories');
        } else {
            toast.error(result.message);
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
            <h4 className="h-4 pb-0 mb-0">Categories / Create</h4>
            <Link to="/admin/categories" className="btn btn-primary">
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
