import React, { useEffect, useState, useRef } from "react";
import { Tab, Nav } from "react-bootstrap";
import Swal from "sweetalert2";
import { fetchGetUser,fetchEditAccount, fetchEditPassword } from "../services/UserServices";
export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [myUser,setMyUser] = useState('');
  console.log("user", token);
  const [account, setAccount] = useState([
    { image: null, displayName: null, birthDay: null },
  ]);
  const [password, setPassword] = useState([
    { currentPassword: null, newPassword: null, confirmPassword: null },
  ]);
  const handleGetUser = async () => {
    if (token) {
      try {
        const response = await fetchGetUser(token);
        setMyUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    }
  };

  

  const handleEditAccount = async () => {
    if (!account[0].displayName || !account[0].birthDay) {
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
        title: "Can't empty",
      });
    }
    try {
      const formData = {
        image: account[0].image,
        displayName: account[0].displayName,
        birthDay: account[0].birthDay,
      };
      console.log("formData", formData);
      const response = await fetchEditAccount(formData, token);
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
        handleGetUser();
      }
      console.log("ress", response);
    } catch (error) {}
  };
  const handleChangePassword = async () => {
    if (password[0].newPassword !== password[0].confirmPassword) {
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
        title: "The new password and confirmation password do not match",
      });

      handleGetUser();
      return;
    }
    try {
      const formData = {
        currentPassword: password[0].currentPassword,
        newPassword: password[0].newPassword,
      };
      console.log("formDta", formData);
      const response = await fetchEditPassword(formData, token);
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
          icon: response.data.success?"success":"warning",
          title: response.data.message,
        });
        handleGetUser();
      }
      console.log("ressP", response);
    } catch (error) {}
  };
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAccount((prev) => {
        const updateAccount = [...prev];
        updateAccount[0].image = file;
        return updateAccount;
      });
    }
  };
  const isValidImageUrl = (url) => {
    const regex = /^img\/users\/.*\.(jpg|jpeg|png|gif)$/i;
    return regex.test(url);
  };
  const handleInputPassword = (e) => {
    const { id, value } = e.target;
    setPassword((prev) => {
      const updatePassword = [...prev];
      updatePassword[0][id] = value;
      return updatePassword;
    });
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAccount((prev) => {
      const updateAccount = [...prev];
      updateAccount[0][id] = value;
      return updateAccount;
    });
  };

  console.log("account", account);
  console.log("password", password);
  useEffect(() => {
    handleGetUser();
    setAccount([
      {
        image: user.image,
        displayName: user.displayname,
        birthDay: user.date_of_birth,
      },
    ]);
  }, []);
  const isDisabled = () => {
    return (
      !password[0].currentPassword ||
      !password[0].newPassword ||
      !password[0].confirmPassword
    );
  };
  const isAccount = () => {
    return (
      account[0].image === user.image &&
      account[0].displayName === user.displayname &&
      account[0].birthDay === user.date_of_birth
    );
  };
  return (
    <>
      <section className="ftco-section bg-light pt-5">
        <div className="container">
          <div className="row">
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey="personal-info"
            >
              <div className="col-lg-3 sidebar">
                <div className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated">
                  <h3 className="heading-sidebar">My Account</h3>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="personal-info">
                        Personal Information
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="change-password">
                        Change Password
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>

              <div className="col-lg-9">
                <Tab.Content>
                  <Tab.Pane eventKey="personal-info">
                    <div className="row">
                      <div className="col-md-12 d-flex align-items-stretch ftco-animate fadeInUp ftco-animated">
                        <div className="project-wrap">
                          <div className="text p-4">
                            <div>
                              <h3 className="fs-4">Personal Information</h3>
                            </div>
                            <form>
                              <div className="row mb-4">
                                <div className="col-lg-3 text-center">
                                  <img
                                    alt="Profile Image"
                                    className="rounded-circle img-fluid mb-3"
                                    src={
                                      account[0].image === null
                                        ? "../../images/avatar.png"
                                        : account[0].image !== null &&
                                          !isValidImageUrl(account[0].image)
                                        ? URL.createObjectURL(account[0].image)
                                        : "http://localhost:8000/" +
                                          account[0].image
                                    }
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div className="col-md-2 align-items-stretch pl-0">
                                  <label
                                    className="btn btn-outline-secondary mb-0"
                                    htmlFor="image"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-upload"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                    </svg>
                                  </label>
                                  <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control d-none"
                                    onChange={handleUploadImage}
                                  />
                                </div>
                              </div>

                              <div className="row mb-3">
                                <div className="col">
                                  <label htmlFor="displayName">
                                    Display Name
                                  </label>
                                  <input
                                    className="form-control"
                                    defaultValue={account[0].displayName}
                                    id="displayName"
                                    type="text"
                                    onChange={handleInputChange}
                                  />
                                </div>
                                {/*  <div className="col">
                                  <label htmlFor="lastName">Tên</label>
                                  <input
                                    className="form-control"
                                    defaultValue="Đạt"
                                    id="lastName"
                                    type="text"
                                  />
                                </div> */}
                              </div>
                              <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                  className="form-control"
                                  defaultValue={user.email}
                                  disabled
                                  id="email"
                                  type="email"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="mb-3">
                                <label htmlFor="birthDay">Ngày sinh</label>
                                <input
                                  className="form-control"
                                  id="birthDay"
                                  placeholder="dd/mm/yyyy"
                                  defaultValue={account[0].birthDay}
                                  type="date"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <button
                                onClick={handleEditAccount}
                                className="btn btn-primary"
                                type="button"
                                disabled={isAccount()}
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="change-password">
                    <div className="row">
                      <div className="col-md-12 d-flex align-items-stretch ftco-animate fadeInUp ftco-animated">
                        <div className="project-wrap">
                          <div className="text p-4">
                            <div>
                              <h3 className="fs-4">Change Password</h3>
                            </div>
                            <form>
                              <div className="mb-3">
                                <label htmlFor="currentPassword">
                                  Current Password
                                </label>
                                <input
                                  className="form-control"
                                  id="currentPassword"
                                  type="password"
                                  onChange={handleInputPassword}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="newPassword">
                                  New Password
                                </label>
                                <input
                                  className="form-control"
                                  id="newPassword"
                                  type="password"
                                  onChange={handleInputPassword}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="confirmPassword">
                                  Confirm Password
                                </label>
                                <input
                                  className="form-control"
                                  id="confirmPassword"
                                  type="password"
                                  onChange={handleInputPassword}
                                />
                              </div>

                              <button
                                onClick={handleChangePassword}
                                className="btn btn-primary"
                                type="button"
                                disabled={isDisabled()}
                              >
                                Change Password
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      </section>
    </>
  );
}
