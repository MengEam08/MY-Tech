import React, { useContext } from "react";
import Layout from "./common/Layout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl } from "./common/http";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError, // You forgot to import this from useForm
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        toast.error(`Server error: ${response.status}`);
        return;
      }

      const result = await response.json();
      console.log(result);

      if (result.status === 200) {
        const userInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        login(userInfo);
        navigate("/account/dashboard");
      } else if (result.errors) {
        const formErrors = result.errors;
        Object.keys(formErrors).forEach((field) => {
          setError(field, { type: "server", message: formErrors[field][0] });
        });
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container-md d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-100" style={{ maxWidth: "400px" }}>
          <div className="card shadow-0 login">
            <div className="card-body p-4">
              <h3 className="border-bottom pb-2 mb-4 text-center">Login</h3>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "The password field is required",
                  })}
                  id="password"
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              <div className="d-flex justify-content-center pt-4 pb-2">
                <small>
                  Don't have an account?&nbsp;
                  <Link to="/account/register">Register</Link>
                </small>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
