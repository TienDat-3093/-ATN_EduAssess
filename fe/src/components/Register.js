import React, { useState, useEffect } from "react";
import { fetchRegister } from "../services/UserServices";
import Swal from "sweetalert2";
export default function Register({ onLoginClick }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setBirthDay] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setShowError(false);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setShowError(true);
      return;
    }
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !date_of_birth
    ) {
      setError("Missing input fields");
      setShowError(true);
      return;
    }

    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      setError("Email is invalid \nEx: abc@gmail.com");
      setShowError(true);
      return;
    }

    const passRegex = /^.{6,}$/;
    if (!passRegex.test(password)) {
      setError("Password must be at least 6 characters");
      setShowError(true);
      return;
    }
    const formData = {
      "displayname":username,
      "email": email,
      "date_of_birth": date_of_birth,
      "password": password,
     
    };
    
    console.log("formdata", formData);
    try {
      const response = await fetchRegister(formData);
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
      console.log("register", response.data);
      onLoginClick();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setShowError(true);
    }
  };
  return (
    <>
      <section className="ftco-section ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row">
            <div className="col-md-7" />
            <div className="col-md-5 order-md-last">
              <div className="login-wrap p-4 p-md-5">
                <h3 className="mb-4">Register Now</h3>
                <form
                  action="POST"
                  className="signup-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label className="label" htmlFor="username">
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
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
                    <label className="label" htmlFor="date_of_birth">
                      Birth Day
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={date_of_birth}
                      onChange={(e) => setBirthDay(e.target.value)}
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
                  <div className="form-group">
                    <label className="label" htmlFor="password">
                      Confirm Password
                    </label>
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                {/*   <div className="form-group">
                    <label className="form-label " htmlFor="img">
                      Avatar
                    </label>
                    <br />
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(e) => setAvatar(e.target.files[0])}
                    />
                  </div> */}
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
                  Already have an account?
                  <button className="btn btn-link" onClick={onLoginClick}>
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
