import React, { useEffect, useState } from "react";
import { fetchPasswordReset } from "../services/UserServices";
import Swal from "sweetalert2";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  console.log("email", email);
  const handleInputChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handleResetPassword = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
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
            icon: "warning",
            title: "Invalid email. Please re-enter.",
          });
    }
    try {
       
      const response = await fetchPasswordReset(email);
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
            title: response.data.message,
          });
      }
      console.log('resemal',response)
    } catch (error) {}
  };
  const isEmail = () => {
    return !email;
  };
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      {/* <h3 className="mb-4">Forgot Password</h3> */}
                      <form
                        method="POST"
                        id="contactForm"
                        name="contactForm"
                        className="contactForm"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="email">
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <button
                                type="button"
                                onClick={handleResetPassword}
                                className="btn btn-primary"
                                disabled={isEmail()}
                              >Submit</button>
                              <div className="submitting" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 d-flex align-items-stretch">
                    <div className="info-wrap bg-primary w-100 p-md-5 p-4">
                      <h3>Forgot Password</h3>
                      <p className="mb-4">
                        Forgot your password? No need to worry. Tell us your
                        email and we'll send you your password.
                      </p>
                      <img
                        src="../../images/Forgot Password.png"
                        className="img-fluid"
                        alt="Forgot Password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
