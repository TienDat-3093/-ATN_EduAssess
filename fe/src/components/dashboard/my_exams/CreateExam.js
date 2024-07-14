import { NavLink } from "react-router-dom";
import SideBar from "../SideBar";
import Swal from "sweetalert2";

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
  fetchShowQuestion,
  fetchGetQuestion,
  fetchCreateExam,
  fetchShowExamCreate
} from "../../../services/UserServices";
export default function CreateExam() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState(0);
  const [loadQuestions, setLoadQuestions] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [privacy, setPrivacy] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [password, setPassword] = useState("");
  const [examText, setExamText] = useState("");
  const [listQuesReturn, setListQuesReturn] = useState("");
  const [quesReturnId, setQuesReturnId] = useState([]);
  console.log("selectedTopics", selectedTopics,selectedLevels,selectedTags);

  console.log("load", loadQuestions);
  console.log("listQuesReturn", listQuesReturn);
  console.log("data", data);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };
  const handleQuestionId = (id) => {
    const questionId = id;
    setQuestionId(questionId);
  };
  const handleLevelSelect = (e) => {
    const levelId = e.target.value;
    setSelectedLevels((prev) =>
      e.target.checked
        ? [...prev, levelId]
        : prev.filter((id) => id !== levelId)
    );
  };
  const handleTopicSelect = (e) => {
    const topicId = e.target.value;
    setSelectedTopics((prev) =>
      e.target.checked
        ? [...prev, topicId]
        : prev.filter((id) => id !== topicId)
    );
  };
  const handleTagsSelect = (e) => {
    const tagId = e.target.value;
    setSelectedTags((prev) =>
      e.target.checked ? [...prev, tagId] : prev.filter((id) => id !== tagId)
    );
  };
  const handleQuantityQuestion = (event) => {
    const value = event.target.value;
    console.log("val", value);
    if (!isNaN(value) && value > "0") {
      setQuantity(value);
    } else {
      setQuantity("");
    }
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePrivacy = (e) => {
    setPrivacy(Number(e.target.value));
  };
  const handleDeleteQuestion = (id) => {
    console.log(id);
    const updateLoad = listQuesReturn.filter((question) => question.id !== id);
    console.log("br", updateLoad);
    setListQuesReturn(updateLoad);
  };
  const getShowQuestion = async () => {
    try {
      const response = await fetchShowQuestion(
        user.id,
        user.admin_role,
        questionId
      );
      if (response) {
        setQuestion(response.data.data);
        console.log("ress", response);
      }
    } catch (error) {}
  };

  const getShowExamCreate = async () => {
    try {
      const response = await fetchShowExamCreate();
      if (response) {
        setData(response.data.data[0]);
        
      }
      console.log("resQ", response);
    } catch (error) {}
  };
  const getQuestions = async () => {
    let message;
    if (!selectedLevels || selectedLevels.length === 0) {
      message = "Please select a level";
    } else if (!selectedTopics || selectedTopics.length === 0) {
      message = "Please select a topic";
    } else if (!quantity || quantity === "") {
      message = "Please enter the number of questions";
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

    try {
      const response = await fetchGetQuestion(
        selectedLevels.join(","),
        selectedTopics.join(","),
        user.id,
        quantity,
        quesReturnId
      );
      if (response) {
        setLoadQuestions(response.data.data[0]);
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
      
    } catch (error) {
      console.log("err", error);
    }
  };
  console.log('listQuesReturn',listQuesReturn)
  const handleCreateExam = async () => {
    let message;
    if (!examText) {
      message = "Please enter the name of the test";
    } else if (!selectedTags || selectedTags.length === 0) {
      message = "Please select tags";
    } else if (!selectedLevels || selectedLevels.length === 0) {
      message = "Please select levels";
    } else if (!selectedTopics || selectedTopics.length === 0) {
      message = "Please select topics";
    } else if (!quantity || quantity === "") {
      message = "Please enter the quantity questions";
    } else if (!listQuesReturn || listQuesReturn.length === 0) {
      message = "Please create question";
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
        examImg: uploadedImage,
        tags: selectedTags,
        privacy: privacy,
        password: password,
        questionLevels: selectedLevels,
        questionTopics: selectedTopics,
        quantityQuestion: quantity,
        questions: listQuesReturn.map((question) => ({
          questionId: question.id,
        })),
        userId: user.id,
      };
      console.log("foemDra", formData);
      const response = await fetchCreateExam(formData);
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

        navigate("/dashboard/my-exams");
      }
      console.log("ressss", response);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getShowExamCreate();
  }, []);
  useEffect(() => {
    getShowQuestion();
  }, [questionId]);
  useEffect(() => {
    if (loadQuestions && loadQuestions.questions) {
      if (loadQuestions && loadQuestions.questions) {
        setListQuesReturn((prevList) => [
          ...prevList,
          ...loadQuestions.questions,
        ]);
      }
    }
  }, [loadQuestions]);
  useEffect(() => {
    if (listQuesReturn) {
      const val = listQuesReturn.map((question) => question.id);
      setQuesReturnId(val);
    }
  }, [listQuesReturn]);

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
                      <h3 className="mb-2">Add exam</h3>
                      <button
                        onClick="{onBacktoIndex}"
                        className="btn btn-secondary mb-2"
                      >
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
                          {uploadedImage && (
                            <div className="mb-3">
                              <label className="form-label">
                              Photo uploaded:
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
                            <div className="col-md-12 mb-3">
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
                                  {data && data.tags
                                    ? data.tags.map((tag, index) => (
                                        <li className="list-inline-item">
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id={`tag_${tag.id}`}
                                              name="tag"
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
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="password"
                                disabled=""
                                value={password}
                                onChange={handelPassword}
                              />
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
                                  defaultChecked
                                  value={0}
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
                          <h4 className="form-label test-dark">Question</h4>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="level" className="form-label">
                               Levels
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
                                  {data && data.levels
                                    ? data.levels.map((level, index) => (
                                        <li className="list-inline-item">
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id={`level_${level.id}`}
                                              value={level.id}
                                              name="level"
                                              onChange={handleLevelSelect}
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
                            <div className="col-md-6 mb-3">
                              <label htmlFor="level" className="form-label">
                                Topics
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
                                  {data &&
                                    data.topics &&
                                    data.topics.map((topic, index) => (
                                      <li className="list-inline-item">
                                        <div className="form-check form-check-inline">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`topic_${topic.id}`}
                                            value={topic.id}
                                            name="topic"
                                            onChange={handleTopicSelect}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={`topic_${topic.id}`}
                                          >
                                            {topic.name}
                                          </label>
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="quantity" className="form-label">
                                Quantity Question{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="quantity"
                                  placeholder="Nhập số lượng"
                                  value={quantity}
                                  onChange={handleQuantityQuestion}
                                />
                                <a
                                  onClick={getQuestions}
                                  className="btn btn-secondary btn-sm ml-2"
                                >
                                  Create
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                              List Question{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <table class="table table-hover text-center">
                              <thead>
                                <tr>
                                  <th scope="col">Image</th>
                                  <th scope="col">Question</th>
                                  <th scope="col">Type Question</th>
                                  <th scope="col">Level</th>
                                  <th scope="col">Function</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listQuesReturn
                                  ? listQuesReturn.map((question, index) => (
                                      <tr key={index}>
                                        <td>
                                          {question.question_img && (
                                            <img
                                              src={question.question_url}
                                              alt="Ảnh câu hỏi"
                                              className="img-fluid rounded"
                                              style={{
                                                maxWidth: "100px",
                                                height: "auto",
                                              }}
                                            />
                                          )}
                                        </td>
                                        <td
                                          className="text-nowrap"
                                          style={{
                                            maxWidth: "200px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                              question.question_text
                                            ),
                                          }}
                                        />
                                        <td>{question.type.name}</td>
                                        <td>{question.level.name}</td>
                                        <td>
                                          <div className="btn-group">
                                            <button
                                              type="button"
                                              className="btn btn-outline-secondary"
                                              data-toggle="modal"
                                              data-target="#detail"
                                              onClick={() =>
                                                handleQuestionId(question.id)
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-card-list"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                              </svg>
                                            </button>

                                            <button
                                              type="button"
                                              className="btn btn-outline-secondary"
                                              onClick={() =>
                                                handleDeleteQuestion(
                                                  question.id
                                                )
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="bi bi-trash3"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                              </svg>
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
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
                        onClick={handleCreateExam}
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
      {/* Show detail answer */}
      <div
        className="modal fade"
        id="detail"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="detailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="detailLabel">
                Answers
              </h5>
              <button
                type="button"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered text-center">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Answer</th>
                        <th scope="col">Right sentence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {question && question.answers
                        ? question.answers.map((answer, index) => (
                            <tr key={index}>
                              <td>
                                {answer.img && (
                                  <img
                                    src={answer.answer_url}
                                    alt="Ảnh câu hỏi"
                                    className="img-fluid rounded"
                                    style={{
                                      maxWidth: "100px",
                                      height: "auto",
                                    }}
                                  />
                                )}
                              </td>
                              <td
                                className="text-nowrap"
                                style={{
                                  maxWidth: "200px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {answer.text}
                              </td>
                              <td>
                                {answer.is_correct === 1 ? (
                                  <div className="text-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-check2-circle"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                    </svg>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End show detail answer */}
    </>
  );
}
