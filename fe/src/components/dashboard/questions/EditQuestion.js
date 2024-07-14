import { useEffect, useState } from "react";
import {
  fetchEditQuestion,
  fetchShowQuestion,
} from "../../../services/UserServices";
import Swal from "sweetalert2";
import SideBar from "../SideBar";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
export default function EditQuestion() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const selects = localStorage.getItem("selects");
  const [selectType, setSelectType] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const selectData = JSON.parse(selects);
  const { id } = useParams();
  const [data, setData] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    {
      id: uuidv4(),
      value: "",
      image: null,
      correct: false,
      url: null,
      oldImg: null,
    },
  ]);
  const [uploadedImage, setUploadedImage] = useState(null);
  console.log("selectData", selectData);
  console.log("data", data);
  console.log("answre", answers);
  console.log(
    "type",
    selectType,
    "level",
    selectedLevel,
    "topic",
    selectedTopic
  );
  const isValidImageUrl = (url) => {
    const regex = /^http:\/\/localhost:8000\/.*\.(jpg|jpeg|png|gif)$/i;
    return regex.test(url);
  };
  const getShowQuestion = async () => {
    try {
      const response = await fetchShowQuestion(user.id, user.admin_role, id);
      if (response) {
        setData(response.data.data);

        if (!response.data.data.answers) return;
        const formattedAnswers = response.data.data.answers.map((answer) => ({
          id: uuidv4(),
          value: answer.text,
          image: null,
          correct: answer.is_correct === 1,
          url: answer.img ? `${answer.answer_url}` : null,
          oldImg: answer.img,
        }));
        setAnswers(formattedAnswers);
      }
    } catch (error) {}
  };

  const handleEditQuestion = async () => {
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
      questionId: id,
      questionText: questionText ? questionText : data.question_text,
      questionImage: uploadedImage ? uploadedImage : data.question_img,
      topic: document.querySelector('input[name="topic"]:checked').value,
      level: document.querySelector('input[name="level"]:checked').value,
      type: selectType ? selectType : data.question_type_id,
      answers: answers.map((answer) => ({
        answerText: answer.value,
        answerImage: answer.image ? answer.image : answer.oldImg,
        answerCorrect: answer.correct,
      })),
    };
    console.log("fromdat", questionData);
     try {
      const response = await fetchEditQuestion(questionData);
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
        navigate("/dashboard/questions");
        console.log("res", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleClickType = (e) => {
    const selectedValue = Number(e.target.value);
    setSelectType(selectedValue);
    if (selectedValue === 3) {
      setAnswers([
        { id: uuidv4(), value: "", image: null, correct: false },
        { id: uuidv4(), value: "", image: null, correct: false },
      ]);
    } else {
      setAnswers([{ id: uuidv4(), value: "", image: null, correct: false }]);
    }
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
  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      {
        id: uuidv4(),
        value: "",
        image: null,
        correct: false,
        url: null,
        oldImg: null,
      },
    ]);
  };
  const handleRemoveAnswer = (index, e) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((answer, i) => i !== index);
      return updatedAnswers;
    });
  };

  useEffect(() => {
    setQuestionText(data.question_text);
    setSelectType(data.question_type_id);
    setSelectedTopic(data.topic_id);
    setSelectedLevel(data.level_id);
  }, [data]);

  useEffect(() => {
    getShowQuestion();
  }, [id]);

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
                      <h3 className="mb-2">Edit Question</h3>
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
                                  data={data.question_text}
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
                          {uploadedImage ? (
                            <div className="mb-3">
                              <label className="form-label">
                                Photo Uploaded:
                              </label>
                              <div>
                                <img
                                  src={URL.createObjectURL(uploadedImage)}
                                  alt="Uploaded"
                                  style={{ maxWidth: "50%", height: "auto" }}
                                />
                              </div>
                            </div>
                          ) : data && data.question_url &&isValidImageUrl(data.question_url) ? (
                            <div className="mb-3">
                              <label className="form-label">
                              Photo uploaded:
                              </label>
                              <div>
                                <img
                                  src={data.question_url}
                                  alt="Uploaded"
                                  style={{ maxWidth: "50%", height: "auto" }}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <label htmlFor="major" className="form-label">
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
                                  {selectData
                                    ? selectData.topics.map((topic, index) => (
                                        <li
                                          className="list-inline-item"
                                          key={index}
                                        >
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              id={`topic_${topic.id}`}
                                              name="topic"
                                              value={topic.id}
                                              checked={
                                                selectedTopic === topic.id
                                              }
                                              onChange={() =>
                                                setSelectedTopic(topic.id)
                                              }
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
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="level" className="form-label">
                                Type question{" "}
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
                                  {selectData
                                    ? selectData.types.map((type, index) => (
                                        <li
                                          className="list-inline-item"
                                          key={index}
                                        >
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              id={`type_${type.id}`}
                                              value={type.id}
                                              name="type"
                                              checked={
                                                selectType === type.id}
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
                            <div className="col-md-6 mb-3">
                              <label htmlFor="level" className="form-label">
                                Levels <span className="text-danger">*</span>
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
                                  {selectData
                                    ? selectData.levels.map((level, index) => (
                                        <li
                                          className="list-inline-item"
                                          key={index}
                                        >
                                          <div className="form-check form-check-inline">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              id={`level_${level.id}`}
                                              value={level.id}
                                              name="level"
                                              checked={
                                                selectedLevel === level.id
                                              }
                                              onChange={() =>
                                                setSelectedLevel(level.id)
                                              }
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

                          <div className="mb-3">
                            <label htmlFor="status" className="form-label">
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
                                            value={answer.value}
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
                                        {answer.image ? (
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Photo uploaded:
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
                                        ) : answer && answer.url ? (
                                          <div className="mb-3">
                                            <label className="form-label">
                                            Photo uploaded:
                                            </label>
                                            <div>
                                              <img
                                                src={answer.url}
                                                alt="Uploaded"
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "100px",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-1 text-center p-0">
                                      {selectType !== "3" && (
                                        <button
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
                                        </button>
                                      )}
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
                        onClick={handleEditQuestion}
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
