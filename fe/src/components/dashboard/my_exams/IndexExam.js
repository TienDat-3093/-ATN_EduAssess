import { NavLink } from "react-router-dom";
import SideBar from "../SideBar";
import Moment from "react-moment";
import moment from "moment";
import {
  fetchExamsToUser,
  fetchDeleteExam,
  fetchExamToSearch,
  fetchExamToFilter,
} from "../../../services/UserServices";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
export default function IndexExam() {
  /* const [nameExam, setNameExam] = useState(""); */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const handleCopyLink = (url) => {
    const linkToCopy = "http://localhost:3000" + url;

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {})
      .catch((err) => {
        console.error("Không thể sao chép link: ", err);
      });
  };
  const generateSlug = (name) => {
    return name
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };
  //user login
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState("");
  const [keyword, setKeyWord] = useState("");
  const [news, setNews] = useState("");
  const [outstanding, setOutstanding] = useState("");
  console.log("news", news, "outstanding", outstanding);

  const getExamsToUser = async () => {
    console.log("id", user.id);
    try {
      const response = await fetchExamsToUser(
        user.id,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        console.log("res", response);
      }
      console.log("resl", response);
    } catch (err) {
      console.log("erre", err);
    }
  };
  const handleInputSearch = (e) => {
    const keyword = e.target.value;

    setKeyWord(keyword);
  };
  const getExamToSearch = async () => {
    try {
      const response = await fetchExamToSearch(
        user.id,
        keyword,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      }
      console.log("ress", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleClickNew = (e) => {
    const news = e.target.checked;
    setNews(news);
  };
  const handleClickOutstanding = (e) => {
    const outstanding = e.target.checked;
    setOutstanding(outstanding);
  };
  const getExamToFilter = async () => {
    try {
      const response = await fetchExamToFilter(
        user.id,
        news,
        outstanding,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      }
      console.log("redf", response);
    } catch (error) {}
  };
  console.log("data", data);
  const handleDeleteExam = async (id) => {
    console.log("id", id);
    const formData = {
      examId: id,
    };
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mr-2",
          cancelButton: "btn btn-danger mr-2",
        },
        buttonsStyling: false,
      });
      let mess = "Are you sure you want to delete?";

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
        const response = await fetchDeleteExam(formData);
        getExamsToUser();
        swalWithBootstrapButtons.fire({
          title: response.data.message,

          icon: "success",
        });
        /* triggerReload(); */
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
  const isValidImageUrl = (url) => {
    const regex = /^http:\/\/localhost:8000\/.*\.(jpg|jpeg|png|gif)$/i;
    return regex.test(url);
  };
  useEffect(() => {
    getExamsToUser();
  }, [currentPage]);
  useEffect(() => {
    getExamToFilter();
    console.log(+1);
  }, [news, outstanding, currentPage]);
  useEffect(() => {
    getExamToSearch();
  }, [keyword, currentPage]);
  return (
    <>
      <section className="ftco-section bg-light pt-5">
        <div className="container">
          <div className="row">
            <SideBar />

            <div className="col-lg-9">
              <div className="row mb-4">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search exam..."
                    onChange={handleInputSearch}
                  />
                </div>
                <div className="col-md-8 d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div className="form-check form-check-inline me-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="new"
                        id="latest"
                        onChange={handleClickNew}
                      />
                      <label className="form-check-label" htmlFor="latest">
                        New
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="outstanding"
                        id="featured"
                        onChange={handleClickOutstanding}
                      />
                      <label className="form-check-label" htmlFor="featured">
                        Outstanding
                      </label>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-success">
                      <NavLink
                        className="text-white"
                        to="/dashboard/my-exams/create"
                      >
                        Create
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                {data && data.length > 0 ? (
                  data.map((exam, index) => (
                    <div className="col-md-4 d-flex align-items-stretch ftco-animate fadeInUp ftco-animated">
                      <div className="project-wrap">
                        <NavLink
                          to={`/exams/${exam.id}-${generateSlug(
                            exam.name.replace(/<\/?(p|strong|i)[^>]*>/gi, "")
                          )}`}
                          className="img"
                          style={{
                            backgroundImage:
                              exam.test_img && isValidImageUrl(exam.test_url)
                                ? `url('${exam.test_url}')`
                                : "url(../images/work-2.jpg)",
                            height: "200px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <span className="price">Start</span>
                        </NavLink>

                        <div className="text p-4">
                          <div>
                            <h3
                              className="fs-4"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(exam.name),
                              }}
                            />
                          </div>

                          <p className="advisor m-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-clock"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                            </svg>
                            {"  "}
                            <Moment format="DD-MM-YYYY">
                              {exam.created_at}
                            </Moment>
                            <span style={{ float: "right" }}>
                              👁️ {exam && exam.done_count} plays
                            </span>
                          </p>
                          <NavLink
                            className="btn text-primary"
                            to={`/dashboard/my-exams/edit/${exam.id}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                          </NavLink>
                          <button
                            className="btn text-muted"
                            onClick={() =>
                              handleCopyLink(
                                `/exams/${exam.id}-${generateSlug(
                                  exam.name.replace(
                                    /<\/?(p|strong|i)[^>]*>/gi,
                                    ""
                                  )
                                )}`
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-copy"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                              />
                            </svg>
                          </button>
                          <NavLink
                            className="btn text-warning"
                            to={`/dashboard/my-exams/user-stats/${exam.id}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-clock-history"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </NavLink>
                          <button
                            className="btn text-danger"
                            onClick={() => handleDeleteExam(exam.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </button>

                          <ul className="d-flex flex-wrap list-unstyled">
                            {exam.tags
                              ? exam.tags.map((tag, index) => (
                                  <li
                                    key={index}
                                    className="topic-item badge text-black m-1"
                                    style={{
                                      display: "inline-block",
                                      maxWidth: "100px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {tag.name}
                                  </li>
                                ))
                              : ""}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="empty-result-section text-center"
                    style={{ marginLeft: 150 }}
                  >
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png"
                      alt="Empty Result Icon"
                      className="img-fluid"
                    />
                    <div className="empty-result-section__title">
                      No result is found
                    </div>
                  </div>
                )}
              </div>
              {totalPages === 2 && (
                <div className="row mt-5">
                  <div className="col">
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
    </>
  );
}
