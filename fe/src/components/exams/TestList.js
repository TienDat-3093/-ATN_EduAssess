import {
  fetchAllExams,
  fetchExamToSearchAll,
  fetchLoadFilter,
  fetchExamToFilterAll,
} from "../../services/UserServices";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import Moment from "react-moment";
import moment from "moment";

export default function TestList() {
  const [data, setData] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loadFilter, setLoadFilter] = useState("");
  const [filter, setFilter] = useState({
    new: 0,
    outstanding: 0,
    topics: [],
    tags: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(9);
  const [isloading, setIsLoading] = useState(false);
  console.log("filter", filter);
  console.log("loadFilter", loadFilter);

  const handleInputSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setKeyword(e.target.value);
    }
    setKeyword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, id, value, checked } = e.target;

    setFilter((prevFilter) => {
      if (name === "new" || name === "outstanding") {
        return { ...prevFilter, [name]: checked ? 1 : 0 };
      } else if (name === "topics" || name === "tags") {
        const updatedItems = checked
          ? [...prevFilter[name], value]
          : prevFilter[name].filter((item) => item !== value);
        return { ...prevFilter, [name]: updatedItems };
      } else {
        return prevFilter;
      }
    });
  };

  const getAllExam = async () => {
    try {
      const response = await fetchAllExams(currentPage, itemsPerPage);
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setIsLoading(true);
      }
      console.log("all", response);
    } catch (error) {}
  };
  const getLoadFilter = async () => {
    try {
      const response = await fetchLoadFilter();
      if (response) {
        setLoadFilter(response.data.data[0]);
      }
    } catch (error) {}
  };
  const getExamToSearchAll = async () => {
    try {
      const response = await fetchExamToSearchAll(
        keyword,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      }
      console.log("ressearch", response);
    } catch (error) {}
  };
  const getExamToFilterAll = async () => {
    /* const formData ={
      'new':filter.new,
      'outstanding':filter.outstanding,
      'tags':filter.tags,
      'topics':filter.topics
    }
    console.log('formData',formData); */
    try {
      const response = await fetchExamToFilterAll(
        filter.new,
        filter.outstanding,
        filter.tags,
        filter.topics,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {}
  };
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
  const isValidImageUrl = (url) => {
    const regex = /^http:\/\/localhost:8000\/.*\.(jpg|jpeg|png|gif)$/i;
    return regex.test(url);
  };
  useEffect(() => {
    getAllExam();
    getLoadFilter();
  }, [currentPage]);
  useEffect(() => {
    getExamToSearchAll();
  }, [keyword, currentPage]);
  useEffect(() => {
    getExamToFilterAll();
  }, [filter, currentPage]);
  return (
    <>
      <section className="ftco-section bg-light pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 sidebar">
              <div className="sidebar-box bg-white ftco-animate fadeInUp ftco-animated">
                <form action="#" className="search-form">
                  <div className="form-group">
                    <span className="icon fa fa-search" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      onChange={handleInputSearch}
                      onKeyDown={handleInputSearch}
                    />
                  </div>
                </form>
              </div>

              <div
                className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated"
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <h3 className="heading-sidebar">Menu</h3>
                <form action="#" className="browse-form sidebar-scroll">
                  <label htmlFor="new">
                    <input
                      type="checkbox"
                      id="new"
                      name="new"
                      defaultValue=""
                      value="1"
                      onChange={handleCheckboxChange}
                    />{" "}
                    New
                  </label>
                  <br />
                  <label htmlFor="outstanding">
                    <input
                      type="checkbox"
                      id="outstanding"
                      name="outstanding"
                      defaultValue=""
                      value="1"
                      onChange={handleCheckboxChange}
                    />{" "}
                    Outstanding
                  </label>
                  <br />
                  <h3 className="heading-sidebar">Topics Category</h3>
                  {loadFilter &&
                    loadFilter.topics &&
                    loadFilter.topics.map((topic, index) => {
                      return (
                        <>
                          <label htmlFor={`topic_${topic.id}`}>
                            <input
                              type="checkbox"
                              id={`topic_${topic.id}`}
                              name="topics"
                              defaultValue=""
                              value={topic.id}
                              onChange={handleCheckboxChange}
                            />{" "}
                            {topic.name}
                          </label>

                          <br />
                        </>
                      );
                    })}
                  <h3 className="heading-sidebar">Tags Category</h3>
                  {loadFilter &&
                    loadFilter.tags &&
                    loadFilter.tags.map((tag, index) => {
                      return (
                        <>
                          <label htmlFor={`topic_${tag.id}`}>
                            <input
                              type="checkbox"
                              id={`tag_${tag.id}`}
                              name="tags"
                              defaultValue=""
                              value={tag.id}
                              onChange={handleCheckboxChange}
                            />{" "}
                            {tag.name}
                          </label>

                          <br />
                        </>
                      );
                    })}
                </form>
              </div>
              {/* <div
                className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated"
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <h3 className="heading-sidebar">Topics Category</h3>
                <form action="#" className="browse-form sidebar-scroll">
                  {loadFilter &&
                    loadFilter.topics &&
                    loadFilter.topics.map((topic, index) => {
                      return (
                        <>
                          <label htmlFor={`topic_${topic.id}`}>
                            <input
                              type="checkbox"
                              id={`topic_${topic.id}`}
                              name="vehicle"
                              defaultValue=""
                            />{" "}
                            {topic.name}
                          </label>

                          <br />
                        </>
                      );
                    })}
                </form>
              </div> */}
            </div>
            <div className="col-lg-9">
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
                              class="bi bi-person-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                              <path
                                fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                              />
                            </svg>{" "}
                            <span>
                              {exam.user && exam.user.admin_role === 0
                                ? exam.user.displayname
                                : "ADMIN"}
                            </span>
                            <br></br>
                            <Moment format="DD-MM-YYYY">
                              {exam.created_at}
                            </Moment>
                            <span style={{ float: "right" }}>
                              👁️ {exam && exam.done_count} plays
                            </span>
                          </p>
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
