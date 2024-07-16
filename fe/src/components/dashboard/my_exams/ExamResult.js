import { fetchUserStatsToUser } from "../../../services/UserServices";
import React, { useEffect, useState } from "react";
export default function ExamResult() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);
  console.log("data", data);
  const getUserStatsToUser = async () => {
    try {
      const response = await fetchUserStatsToUser(
        user.id,
        currentPage,
        itemsPerPage
      );
      if (response) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      }
      console.log("ress", response);
    } catch (error) {}
  };
  useEffect(() => {
    getUserStatsToUser();
  }, [currentPage]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">LIST OF TEST RESULTS TAKEN</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Name Exam</th>
                  <th>Total Question</th>
                  <th>Correct Sentences</th>
                  <th>Incorrect Sentences</th>
                  <th>Complete time</th>
                  <th>Exam end time</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.testName &&
                          item.testName.replace(/<\/?(p|strong|i)[^>]*>/gi, "")}
                      </td>
                      <td>{item.totalQuestion}</td>
                      <td>{item.questionRight}</td>
                      <td>{item.questionWrong}</td>

                      <td>{item.totalTime} giây</td>
                      <td>{item.finished}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {totalPages >= 2 && (
          <div className="row mt-5 justify-content-center align-items-center">
            <div className="col-auto">
              <div className="block-27">
                <ul>
                  <li
                    className={currentPage === 1 ? "disabled" : ""}
                    onClick={() => {
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      &lt;
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    className={currentPage === totalPages ? "disabled" : ""}
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
    </>
  );
}
