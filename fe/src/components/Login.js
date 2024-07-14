import { NavLink } from "react-bootstrap";
import { fetchLogin } from "../services/UserServices";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Login({ onLoginSuccess, onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setShowError(false);
    try {
      const response = await fetchLogin(email, password);
      if (response) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login successful",
        });
        /* navigate("/"); */
       
      }
      const expirationTime = new Date().getTime() + response.data.expires_in* 1000;
      onLoginSuccess();
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem('tokenExpiration', expirationTime);
      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login failed:", err);
      setShowError(true);
      setError("Login failed. Please check your credentials and try again.");
    }
  };
  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showError]);
  return (
    <>
      <section className="ftco-section ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row">
            <div className="col-md-7" />
            <div className="col-md-5 order-md-last">
              <div className="login-wrap p-4 p-md-5">
                <h3 className="mb-4">Login Now</h3>
                <form
                  action="#"
                  className="signup-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label className="label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {showError && (
                    <div className="alert alert-danger">{error}</div>
                  )}

                  <div className="form-group d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary submit">
                      <span className="fa fa-paper-plane" />
                    </button>
                  </div>
                </form>
                <p className="text-center">
                  Do not have an account?{" "}
                  <button className="btn btn-link" onClick={onRegisterClick}>
                    Register
                  </button>
                </p>
                <p className="text-center">
                  <a href="/forgot-password" className="btn btn-link">
                    Forgot password
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
