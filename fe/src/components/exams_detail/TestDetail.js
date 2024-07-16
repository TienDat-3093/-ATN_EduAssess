import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetailExam } from "../../services/UserServices";
import Swal from "sweetalert2";
export default function TestDetail() {
  const { name } = useParams();

  const [data, setData] = useState(null);
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [randomizeAnswers, setRandomizeAnswers] = useState(false);
  const [password, setPassword] = useState("");
  const [relatedExams, setRelatedExams] = useState("");
  const navigate = useNavigate();
  ;
  console.log("relatedExams", relatedExams);
  const extractIdFromName = (name) => {
    const match = name.match(/^(\d+)-/);
    return match ? match[1] : null;
  };
  const hadleInputPassword = (e) => {
    const password = e.target.value;
    setPassword(password);
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
  
  useEffect(() => {
    let id = extractIdFromName(name);

    const getExam = async () => {
      try {
        const response = await fetchDetailExam(id);
        if (response) {
          setData(response.data.data);
          setRelatedExams(response.data.listTest);
        }
        console.log("resdetail", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      getExam();
    }
  }, [name]);
  const shuffleArray = (arr) => {
    const array = arr.slice();

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  if (data) {
    const createdAt = new Date(data.created_at);
    const formattedDate = createdAt.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    /* const loadExams = data.questions.map((question, index) => {
      const loadAnswers = Object.values(question.answers).map((answer, key) => (
        <li key={key} className="d-block font-weight-normal text-dark">
          {answer.text}
          <br />
          {answer.img && (
            <img
              src={answer.answer_url ? answer.answer_url : answer.img}
              alt={`Answer ${key + 1}`}
              className="img-fluid img-thumbnail mt-3 mb-3"
            />
          )}
        </li>
      ));

      return (
        <div key={question.id} className="text p-4">
          <p className="text-dark font-weight-bold">
            Question {index + 1}:{" "}
            {question.question_text.replace(/<\/?(p|strong|i)[^>]*>/gi, "")}
          </p>
          {question.question_img && (
            <img
              src={
                question.question_url
                  ? question.question_url
                  : question.question_img
              }
              alt={`Question ${index + 1}`}
              className="img-fluid img-thumbnail mt-3 mb-3"
            />
          )}

          <ul className="pl-3 list-unstyled">{loadAnswers}</ul>
        </div>
      );
    }); */
    const handleStart = (e) => {
      e.preventDefault();
      let mess;
      if (data.password) {
        if (password === "") {
          mess = "Please enter your password";
        } else if (data.password !== password) {
          mess = "Incorrect password";
        }
      }

      if (mess) {
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
          title: mess,
        });
      } else {
        let questions = data.questions;

        if (randomizeQuestions) {
          questions = shuffleArray(questions);
        }
        if (randomizeAnswers) {
          questions = questions.map((question) => {
            return {
              ...question,
              answers: shuffleArray(Object.values(question.answers)),
            };
          });
        }
        navigate(`/exams/${name}/testing`, {
          state: { examsData: { ...data, questions } },
        });
      }
    };
    console.log("datta", data.password)
    return (
      <>
        <section className="ftco-section bg-light pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated">
                  <div className="card-body">
                    <h3 className="card-title">
                      {data.name.replace(/<\/?(p|strong|i)[^>]*>/gi, "")}
                    </h3>
                    <p></p>
                    <div className="d-flex justify-content-between">
                      <span>
                        📄 {data && data.questions && data.questions.length}{" "}
                        questions
                      </span>

                      <span>👁️ {data && data.done_count} plays</span>
                    </div>
                  </div>
                </div>
                <div className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated">
                  <div className="card-body">
                    <h5 className="card-title">Select mode</h5>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="defaultCheck3"
                          defaultChecked=""
                          checked={randomizeQuestions}
                          onChange={() => {
                            setRandomizeQuestions(!randomizeQuestions);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck3"
                        >
                          Randomize questions
                        </label>
                      </div>

                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="defaultCheck3"
                          defaultChecked=""
                          checked={randomizeAnswers}
                          onChange={() => {
                            setRandomizeAnswers(!randomizeAnswers);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck3"
                        >
                          Randomize answers
                        </label>
                      </div> */}
                    </div>
                    <form className="browse-form">
                      {data && data.password && data.password ? (
                        <div className="form-password-toggle mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-password32"
                          >
                            Password
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              className="form-control"
                              id="basic-default-password32"
                              placeholder="enter password"
                              aria-describedby="basic-default-password"
                              onChange={hadleInputPassword}
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <button
                        onClick={handleStart}
                        className="btn btn-warning mr-2"
                      >
                        Start
                      </button>
                    </form>

                   {data && !data.password ?  (<div className="mt-4">
                      {data &&
                        data.questions &&
                        data.questions.map((question, index) => (
                          <div key={index} className="mt-3 text-dark">
                            <p className="font-weight-bold">
                              Câu {index + 1}:{" "}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: question.question_text,
                                }}
                              />
                            </p>
                            {question.question_img && (
                              <img
                                src={
                                  question.question_url
                                    ? question.question_url
                                    : question.question_img
                                }
                                alt={`Question ${index + 1}`}
                                className="img-fluid img-thumbnail mb-3"
                                style={{ maxWidth: "700px", height: "200px" }}
                              />
                            )}

                            {/* Mapping through answers */}
                            {Object.values(question.answers).map(
                              (answer, key) => (
                                <div key={key} className="mt-3">
                                  <div className="d-flex align-items-center">
                                    <span className="">
                                      {key + 1}. {answer.text}
                                    </span>
                                  </div>
                                  {answer.img && (
                                    <img
                                      src={
                                        answer.answer_url
                                          ? answer.answer_url
                                          : answer.img
                                      }
                                      alt={`Answer ${key + 1}`}
                                      className="img-fluid img-thumbnail mt-2"
                                      style={{
                                        maxWidth: "700px",
                                        height: "200px",
                                      }}
                                    />
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        ))}
                    </div>):""}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 sidebar">
                <div className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated">
                  <div className="card-body">
                    <h5 className="card-title">Related exams</h5>
                    <ul className="list-unstyled">
                      {relatedExams &&
                        relatedExams.map((exam, index) => (
                          <li className="mb-2">
                            <NavLink
                              to={`/exams/${exam.id}-${generateSlug(
                                exam.name.replace(
                                  /<\/?(p|strong|i)[^>]*>/gi,
                                  ""
                                )
                              )}`}
                            >
                              {exam.name.replace(
                                /<\/?(p|strong|i)[^>]*>/gi,
                                ""
                              )}{" "}
                              {/* <span className="badge badge-secondary">
                              168 câu
                            </span>{" "} */}
                              <span className="badge badge-secondary">
                                {exam.done_count} plays
                              </span>
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
