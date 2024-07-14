import { NavLink } from "react-router-dom";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Link,
} from "ckeditor5";
import { SlashCommand } from "ckeditor5-premium-features";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import {
  fetchQuestionsToUser,
  fetchEditExam,
  fetchShowExamEdit,
} from "../../../services/UserServices";

export default function EditExam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loadExam, setLoadExam] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [password, setPassword] = useState("");
  const [examText, setExamText] = useState("");
  console.log("data", data);
  console.log("privacy", privacy);
  console.log("pass", password);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };
  const isValidImageUrl = (url) => {
    const regex = /^http:\/\/localhost:8000\/.*\.(jpg|jpeg|png|gif)$/i;
    return regex.test(url);
  };
  const handleTagsSelect = (e) => {
    const tagId = e.target.value;
    setSelectedTags((prev) =>
      e.target.checked ? [...prev, tagId] : prev.filter((id) => id !== tagId)
    );
  };

  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePrivacy = (e) => {
    const val = e.target.value;
    setPrivacy(Number(val));
  };

  /* const getQuestionsToUser = async () => {
    try {
      const response = await fetchQuestionsToUser(user.id, user.admin_role);
      if (response) {
        setData(response.data.data[0]);
      }
    } catch (error) {}
  }; */
  const getShowExamEdit = async () => {
    try {
      const response = await fetchShowExamEdit(user.id, user.admin_role, id);
      if (response) {
        setLoadExam(response.data.data);
        setData(response.data.listTags)
      }
      console.log('resss',response)
    } catch (error) {}
  };

  const handleEditExam = async () => {
    let message;
    if (!examText) {
      message = "Please enter the test name";
    } else if (!selectedTags || selectedTags.length === 0) {
      message = "Please select a tag";
    }

    if (message) {
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
        title: message,
      });
    }

    try {
      const formData = {
        examText: examText,
        examImg: uploadedImage ? uploadedImage : loadExam.test_url,
        tags: selectedTags,
        privacy: privacy,
        password: password,
        userId: user.id,
        examId: id,
      };
      console.log("foemDra", formData);
      const response = await fetchEditExam(formData);
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
        console.log("ress", response);
        navigate("/dashboard/my-exams");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (loadExam && loadExam.tag_data) {
      const selectTag = JSON.parse(loadExam.tag_data);
      setSelectedTags(selectTag);
    }
    setPassword(loadExam.password);
    if (loadExam && loadExam.privacy) {
      setPrivacy(loadExam.privacy);
    }
  }, [loadExam]);
  useEffect(() => {
    /* getQuestionsToUser(); */
    getShowExamEdit();
    if (loadExam && loadExam.privacy) {
      setPrivacy(loadExam.privacy);
    }
  }, []);

  return (
    <>
      <section className="ftco-section bg-light pt-5">
        <div className="container">
          <div className="row">
            <SideBar />

            <div className="col-lg-9">
              <div className="container mt-4">
                <div className="row">
                  <div className="col">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-2">Update Exam</h3>
                      <button className="btn btn-secondary mb-2">
                        <NavLink
                          className="text-white"
                          to="/dashboard/my-exams"
                        >
                          Return
                        </NavLink>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="tab-content" id="examTabContent">
                      {/* Tab pane for basic information */}
                      <div
                        className="tab-pane fade show active"
                        id="simple-tabpanel-info"
                        role="tabpanel"
                        aria-labelledby="simple-tab-info"
                      >
                        <form>
                          <div className="mb-3">
                            <label htmlFor="examName" className="form-label">
                              Name Exam <span className="text-danger">*</span>
                            </label>
                            <div className="row">
                              <div className="col-md-10 pr-0">
                                <CKEditor
                                  editor={ClassicEditor}
                                  config={{
                                    toolbar: {
                                      items: [
                                        "undo",
                                        "redo",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                      ],
                                    },
                                    plugins: [
                                      Bold,
                                      Essentials,
                                      Italic,
                                      Mention,
                                      Paragraph,
                                      SlashCommand,
                                      Undo,
                                      Link,
                                    ],
                                    licenseKey:
                                      "N2UxZmZSOTJ2L3I3VTdpNnJNQTZzc2draTgvRExSZ1dNallUbDcySThTeENFUjlzQnYrSzlXYisrR3g1bXc9PS1NakF5TkRBM01qaz0=",
                                    mention: {
                                      // Mention configuration
                                    },
                                  }}
                                  data={loadExam ? loadExam.name : ""}
                                  onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setExamText(data);
                                  }}
                                />
                              </div>
                              <div className="col-md-2 d-flex align-items-stretch pl-0">
                                <label
                                  className="btn btn-outline-secondary mb-0"
                                  htmlFor="inputQuestion"
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
                                  id="inputQuestion"
                                  name="questionImg"
                                  className="form-control d-none"
                                  onChange={handleUploadImage}
                                />
                              </div>
                            </div>
                          </div>
                          {uploadedImage ? (
                            <div className="mb-3">
                              <label className="form-label">
                                Photo Uploaded:
                              </label>
                              <div>
                                <img
                                  src={URL.createObjectURL(uploadedImage)}
                                  alt="Uploaded"
                                  style={{ maxWidth: "100%", height: "auto" }}
                                />
                              </div>
                            </div>
                          ) : loadExam &&
                            loadExam.test_img &&
                            isValidImageUrl(loadExam.test_url) ? (
                            <div className="mb-3">
                              <label className="form-label">
                              Photo Uploaded:
                              </label>
                              <div>
                                <img
                                  src={loadExam && loadExam.test_url}
                                  alt="Uploaded"
                                  style={{ maxWidth: "50%", height: "auto" }}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="major" className="form-label">
                                Tags <span className="text-danger">*</span>
                              </label>
                              <div
                                className="checkbox-container"
                                style={{
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                }}
                              >
                                <ul className="list-inline">
                                  {data 
                                    ? data.map((tag, index) => (
                                        <li className="list-inline-item">
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id={`tag_${tag.id}`}
                                              
                                              name="tag"
                                              checked={
                                                selectedTags &&
                                                selectedTags.includes(
                                                  tag.id.toString()
                                                )
                                              }
                                              value={tag.id}
                                              onChange={handleTagsSelect}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`tag_${tag.id}`}
                                            >
                                              {tag.name}
                                            </label>
                                          </div>
                                        </li>
                                      ))
                                    : ""}
                                </ul>
                              </div>
                            </div>

                            <div className="col-md-6 mb-3">
                              <label htmlFor="privacy" className="form-label">
                                Status
                              </label>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="privacy-private"
                                  name="privacy"
                                  value={1}
                                  checked={privacy === 1}
                                  onChange={handlePrivacy}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="privacy-private"
                                >
                                  Privacy
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="privacy-public"
                                  name="privacy"
                                  value= {0}
                                  checked={privacy === 0}
                                  onChange={handlePrivacy}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="privacy-public"
                                >
                                  Public
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            {/* <div className="col-md-6 mb-3">
                              <label htmlFor="exam_img" className="form-label">
                                Ảnh
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="exam_img"
                              />
                            </div> */}

                            <div className="col-md-6 mb-3">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="subject"
                                disabled=""
                                value={password}
                                onChange={handelPassword}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* End of tab pane for basic information */}

                      {/* Tab pane for questions */}
                      <div
                        className="tab-pane fade"
                        id="simple-tabpanel-question"
                        role="tabpanel"
                        aria-labelledby="simple-tab-question"
                      >
                        {/* Content for "Câu hỏi" */}
                      </div>
                      {/* End of tab pane for questions */}
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={handleEditExam}
                        className="btn btn-secondary"
                      >
                        Submit
                      </button>
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
