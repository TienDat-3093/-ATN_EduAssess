import SideBar from "../SideBar";
import { NavLink } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import React, { useEffect, useState } from "react";
import { fetchCreateQuestion } from "../../../services/UserServices";
import { v4 as uuidv4 } from "uuid";
export default function CreateQuestion() {
  const user = JSON.parse(localStorage.getItem("user"));
  const selects = localStorage.getItem("selects");
  const selectData = JSON.parse(selects);
  const [selectType, setSelectType] = useState(null);
  const [answers, setAnswers] = useState([
    { id: uuidv4(), value: "", image: null, correct: false },
  ]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const navigate = useNavigate();
  console.log("selectType", selectType);
  console.log("answer", answers);
  const handleClickType = (e) => {
    setSelectType(e.target.value);
    if (e.target.value === "3") {
      setAnswers([
        { id: uuidv4(), value: "", image: null, correct: false },
        { id: uuidv4(), value: "", image: null, correct: false },
      ]);
    } else {
      setAnswers([{ id: uuidv4(), value: "", image: null, correct: false }]);
    }
  };

  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      { id: uuidv4(), value: "", image: null, correct: false },
    ]);
  };

  const handleRemoveAnswer = (index, e) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((answer, i) => i !== index);
      return updatedAnswers;
    });
  };
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };
  const handleUploadImageAnswer = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((ans, i) =>
          i === index ? { ...ans, image: file } : ans
        )
      );
    }
  };
  const handleCreateQuestion = async () => {
    let message;
    if (!questionText) {
      message = "Please enter the name question";
    } else if (answers.length === 0) {
      message = "No answer yet";
    } else if (answers.some((answer) => !answer.value)) {
      message = "There are answers that have not been entered";
    }else if(!answers.some((answer) => answer.correct === true)){
      message = "The correct answer has not been selected";
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
      return;
    }
    const questionData = {
      user: user.id,
      adminRole: user.admin_role,
      questionText: questionText,
      questionImage: uploadedImage,
      topic: document.querySelector('input[name="topic"]:checked').value,
      level: document.querySelector('input[name="level"]:checked').value,
      type: selectType,
      answers: answers.map((answer) => ({
        answerText: answer.value,
        answerImage: answer.image,
        answerCorrect: answer.correct,
      })),
    };
    console.log("formdata", questionData);
    try {
      const response = await fetchCreateQuestion(questionData);
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
          title: "Thêm câu hỏi thành công",
        });
        
        navigate("/dashboard/questions");
      }
      console.log("res", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setSelectType(1);
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
                      <h3 className="mb-2">Add question</h3>
                      <button className="btn btn-secondary mb-2">
                        <NavLink
                          className="text-white"
                          to="/dashboard/questions"
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
                        <form method="post">
                          <div className="mb-3">
                            <label htmlFor="examName" className="form-label">
                              Name <span className="text-danger">*</span>
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
                                  onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setQuestionText(data);
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
                          {uploadedImage && (
                            <div className="mb-3">
                              <label className="form-label">
                                Ảnh đã tải lên:
                              </label>
                              <div>
                                <img
                                  src={URL.createObjectURL(uploadedImage)}
                                  alt="Uploaded"
                                  style={{ maxWidth: "100%", height: "auto" }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="topic" className="form-label">
                                Topics <span className="text-danger">*</span>
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
                                  {selectData && selectData.topics
                                    ? selectData.topics.map((topic, index) => (
                                        <li className="list-inline-item">
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              id={`topic_${topic.id}`}
                                              name="topic"
                                              value={topic.id}
                                              defaultChecked={index === 0}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`topic_${topic.id}`}
                                            >
                                              {topic.name}
                                            </label>
                                          </div>
                                        </li>
                                      ))
                                    : ""}
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="level" className="form-label">
                                Levels<span className="text-danger">*</span>
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
                                  {selectData && selectData.levels
                                    ? selectData.levels.map((level, index) => (
                                        <li className="list-inline-item">
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              id={`level_${level.id}`}
                                              name="level"
                                              value={level.id}
                                              defaultChecked={index === 0}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`level_${level.id}`}
                                            >
                                              {level.name}
                                            </label>
                                          </div>
                                        </li>
                                      ))
                                    : ""}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="type" className="form-label">
                                Type Question{" "}
                                <span className="text-danger">*</span>
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
                                  {selectData && selectData.types
                                    ? selectData.types.map((type, index) => (
                                        <li className="list-inline-item">
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              id={`type_${type.id}`}
                                              value={type.id}
                                              name="type"
                                              defaultChecked={index === 0}
                                              onChange={handleClickType}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`type_${type.id}`}
                                            >
                                              {type.name}
                                            </label>
                                          </div>
                                        </li>
                                      ))
                                    : ""}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="answers" className="form-label">
                              Answers <span className="text-danger">*</span>
                            </label>
                            <ul className="list-unstyled">
                              {answers.map((answer, index) => (
                                <li
                                  className="mb-2"
                                  key={answer.id}
                                  count={index}
                                >
                                  <div className="row align-items-center ml-4">
                                    <div className="col-md-10">
                                      <div className="row align-items-center">
                                        <div className="col-md-1 pr-0">
                                          {selectType == 1 ? (
                                            <input
                                              type="checkbox"
                                              checked={answer.correct}
                                              onChange={(e) =>
                                                setAnswers((prevAnswers) =>
                                                  prevAnswers.map((ans, i) =>
                                                    i === index
                                                      ? {
                                                          ...ans,
                                                          correct:
                                                            e.target.checked,
                                                        }
                                                      : ans
                                                  )
                                                )
                                              }
                                              name="check_correct"
                                            />
                                          ) : (
                                            <input
                                              type="radio"
                                              checked={answer.correct}
                                              onChange={(e) =>
                                                setAnswers((prevAnswers) =>
                                                  prevAnswers.map((ans, i) => ({
                                                    ...ans,
                                                    correct: i === index,
                                                  }))
                                                )
                                              }
                                              name="check_correct"
                                            />
                                          )}
                                        </div>
                                        <div className="col-md-9 p-0">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="examName"
                                            onChange={(e) =>
                                              setAnswers((prevAnswers) =>
                                                prevAnswers.map((ans, i) =>
                                                  i === index
                                                    ? {
                                                        ...ans,
                                                        value: e.target.value,
                                                      }
                                                    : ans
                                                )
                                              )
                                            }
                                          />
                                        </div>
                                        <div className=" d-flex align-items-stretch p-0">
                                          <label
                                            className="btn btn-outline-secondary mb-0"
                                            htmlFor={`inputAnswer${index}`}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              className="bi bi-upload"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                            </svg>
                                          </label>
                                          <input
                                            type="file"
                                            id={`inputAnswer${index}`}
                                            name="answerImg"
                                            className="form-control d-none ml-2"
                                            onChange={(e) =>
                                              handleUploadImageAnswer(index, e)
                                            }
                                          />
                                        </div>
                                        {answer.image && (
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Photo Uploaded:
                                            </label>
                                            <div>
                                              <img
                                                src={URL.createObjectURL(
                                                  answer.image
                                                )}
                                                alt="Uploaded"
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "100px",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-1 text-center p-0">
                                      {selectType !== "3" && <button
                                        type="button"
                                        key={index}
                                        className="btn btn-sm"
                                        onClick={(e) =>
                                          handleRemoveAnswer(index, e)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-dash-circle"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                        </svg>
                                      </button>}
                                      
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </form>
                        {selectType !== "3" && (
                          <button
                            onClick={handleAddAnswer}
                            class="btn btn-outline-primary"
                          >
                            Add
                          </button>
                        )}
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
                        onClick={handleCreateQuestion}
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
