import SideBar from "../SideBar";
import { NavLink } from "react-router-dom";
import {
  fetchQuestionsToUser,
  fetchQuestionsToFilter,
  fetchQuestionsToSearch,
  fetchShowQuestion,
  fetchDeleteQuestion,
} from "../../../services/UserServices";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

export default function IndexQuestion() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [question, setQuestion] = useState("");
  /* const [questionId, setQuestionId] = useState(0); */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [reload, setReload] = useState(false);
  const jsonData = JSON.stringify(data);
  localStorage.setItem("selects", jsonData);
  console.log("data", data);
  console.log(
    "selectedTopics",
    selectedTopics,
    "selectedLevels",
    selectedLevels
  );
  console.log("re", reload);
  const getQuestionsToUser = async () => {
    try {
      const response = await fetchQuestionsToUser(
        user.id,
        currentPage,
        itemsPerPage
      );
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const data = response.data.data[0];
        setData(data);
        setTotalPages(response.data.totalPages);
        console.log("ress", response);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const triggerReload = () => {
    setReload((prev) => !prev);
  };
  const getQuestionsToFilter = async () => {
    try {
      const response = await fetchQuestionsToFilter(
        user.id,
        user.admin_role,
        selectedLevels.join(","),
        selectedTopics.join(","),
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data[0]);
        setTotalPages(response.data.totalPages);
        console.log("filter", response);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  const getQuestionsToSearch = async () => {
    try {
      const response = await fetchQuestionsToSearch(
        user.id,
        user.admin_role,
        keyword,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data[0]);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {}
  };
  const getShowQuestion = async (id) => {
    try {
      const response = await fetchShowQuestion(user.id, user.admin_role, id);
      if (response) {
        setQuestion(response.data.data);
        console.log("resp", response);
      }
    } catch (error) {}
  };
  const handleDeleteQuestion = async (id, val) => {
    console.log(val);

    console.log("id", id);
    const formData = {
      questionId: id,
    };
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mr-2",
          cancelButton: "btn btn-danger mr-2",
        },
        buttonsStyling: false,
      });
      let mess;
      if (val === 1) {
        mess = "Are you sure you want to delete?";
      } else {
        mess = "Are you sure you want to restore?";
      }
      console.log(mess);
      const result = await swalWithBootstrapButtons.fire({
        title: mess,
        /* text: "You won't be able to revert this!", */
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok",
        cancelButtonText: "No",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await fetchDeleteQuestion(formData);
        console.log("resss", response);
        /* setReload(!reload); */
        swalWithBootstrapButtons.fire({
          title: response.data.message,

          icon: "success",
        });
        triggerReload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",

          icon: "error",
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  const handleEditClick = (id, deleted, event) => {
    event.preventDefault();
    if (deleted !== null) {
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
        title: "Questions that have been deleted cannot be updated",
      });
      return;
    }
    navigate(`/dashboard/questions/edit/${id}`);
  };
  /* useEffect(() => {
    getShowQuestion();
  }, [questionId]); */
  useEffect(() => {
    getQuestionsToSearch();
  }, [keyword, reload, currentPage]);
  useEffect(() => {
    getQuestionsToFilter();
  }, [selectedTopics, selectedLevels, reload]);
  useEffect(() => {
    getQuestionsToUser();
  }, [currentPage]);
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
  console.log("key", keyword);
  const handleInputSearch = (event) => {
    const keyword = event.target.value;
    if (event.key === "Enter") {
      event.preventDefault();
      const keyword = event.target.value;
      setKeyWord(keyword);
    }
    setKeyWord(keyword);
  };
  /* const handleQuestionId = (id) => {
    const questionId = id;
    setQuestionId(questionId);
  }; */

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
                      <h3 className="mb-2">List question</h3>
                      <button className="btn btn-secondary mb-2">
                        <NavLink
                          className="text-white"
                          to="/dashboard/questions/create"
                        >
                          Create
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
                            <label htmlFor="search_1" className="form-label">
                              Search question
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="search_1"
                              placeholder="Search question"
                              onChange={(event) => handleInputSearch(event)}
                              onKeyDown={(event) => handleInputSearch(event)}
                            />
                          </div>
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
                                  {data &&
                                    data.levels &&
                                    data.levels.map((level, index) => (
                                      <li className="list-inline-item">
                                        <div className="form-check form-check-inline">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`level_${level.id}`}
                                            name="level"
                                            value={level.id}
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
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="topic" className="form-label">
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
                                            name="topic"
                                            value={topic.id}
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

                          <div className="mb-3">
                            <label htmlFor="answers" className="form-label">
                              List question{" "}
                              <span className="text-danger">*</span>
                            </label>
                            {data && data.questions ? (
                              <div className="container">
                                <div className="table-responsive">
                                  <table className="table table-hover">
                                    <thead>
                                      <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Question</th>
                                        <th scope="col">Type question</th>
                                        <th scope="col">Level</th>
                                        <th scope="col">Function</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data.questions.map((question, index) => (
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
                                            aria-label ={DOMPurify.sanitize(
                                              question.question_text
                                            )}
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
                                                onClick={(event) =>
                                                  getShowQuestion(
                                                    question.id,
                                                    question.deleted_at,
                                                    event
                                                  )
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
                                                onClick={(event) =>
                                                  handleEditClick(
                                                    question.id,
                                                    question.deleted_at,
                                                    event
                                                  )
                                                }
                                                className="btn btn-outline-secondary"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width={16}
                                                  height={16}
                                                  fill="currentColor"
                                                  className="bi bi-pencil-square"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                  />
                                                </svg>
                                              </button>
                                              {question.deleted_at ? (
                                                <button
                                                  type="button"
                                                  className="btn btn-outline-secondary"
                                                  onClick={() =>
                                                    handleDeleteQuestion(
                                                      question.id,
                                                      0
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-bootstrap-reboot"
                                                    viewBox="0 0 16 16"
                                                  >
                                                    <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z" />
                                                    <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z" />
                                                  </svg>
                                                </button>
                                              ) : (
                                                <button
                                                  type="button"
                                                  className="btn btn-outline-secondary"
                                                  onClick={() =>
                                                    handleDeleteQuestion(
                                                      question.id,
                                                      1
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
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
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
                    {/* <div className="d-flex justify-content-end">
                      <button className="btn btn-secondary">Trở về</button>
                    </div> */}
                  </div>
                </div>
              </div>
              {totalPages >= 2 && (
                <div className="row mt-5 justify-content-center align-items-center ">
                  <div className="col-auto">
                    <div className="block-27">
                      <ul>
                        <li
                          className={currentPage === 1 ? "disabled" : ""}
                          onClick={() => {
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                        >
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            &lt;
                          </a>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index}
                            className={
                              currentPage === index + 1 ? "active" : ""
                            }
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {index + 1}
                            </a>
                          </li>
                        ))}
                        <li
                          className={
                            currentPage === totalPages ? "disabled" : ""
                          }
                          onClick={() => {
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                        >
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            &gt;
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
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
                        <th scope="col">Answers</th>
                        <th scope="col">Correct</th>
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
