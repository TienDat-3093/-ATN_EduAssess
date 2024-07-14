import axios from "axios";

const fetchLogin = (email, password) => {
  return axios.post(
    "http://localhost:8000/api/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export { fetchLogin };

const fetchLogout = (token) => {
  console.log(`Bearer ${token}`);
  return axios.post(
    "http://localhost:8000/api/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export { fetchLogout };

const fetchGetUser = (token) => {
  console.log(`Bearer ${token}`);
  return axios.post(
    "http://localhost:8000/api/profile",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export { fetchGetUser };

const fetchRefreshAccess = (token) => {
  console.log(`Bearer ${token}`);
  return axios.post(
    "http://localhost:8000/api/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export { fetchRefreshAccess };

const fetchRegister = (formData) => {
  return axios.post(
    "http://localhost:8000/api/register",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchRegister };

const fetchPasswordReset= (email) => {
  return axios.post(
    "http://localhost:8000/api/reset-password",
    {email},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export { fetchPasswordReset };


const fetchEditAccount = (formData,token) => {
  return axios.post(
    "http://localhost:8000/api/edit-account",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
       /*  "Content-Type": "application/json", */
      },
    }
  );
};
export { fetchEditAccount };
const fetchEditPassword = (formData,token) => {
  return axios.post(
    "http://localhost:8000/api/edit-password",
    { formData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export { fetchEditPassword };
//EndUsers
const fetchAllExams = (currentPage, itemsPerPage) => {
  
  return axios.get(`http://localhost:8000/api/exams/index/`,{
    params:{currentPage, itemsPerPage}
  });
};
export { fetchAllExams };

const fetchDetailExam = (id) => {
  return axios.get(`http://localhost:8000/api/exams/show/${id}`);
};
export { fetchDetailExam };

const fetchQuestionsToUser = (userId,currentPage,itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/questions/index`, {
    params: { userId,currentPage,itemsPerPage },
  });
};
export { fetchQuestionsToUser };

const fetchQuestionsToFilter = (userId, adminRole, levelIds, topicIds,currentPage,itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/questions/filter`, {
    params: { userId, adminRole, levelIds, topicIds,currentPage,itemsPerPage },
  });
};
export { fetchQuestionsToFilter };

const fetchQuestionsToSearch = (userId, adminRole, keyword,currentPage,itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/questions/search`, {
    params: { userId, adminRole, keyword,currentPage,itemsPerPage },
  });
};
export { fetchQuestionsToSearch };

const fetchShowQuestion = (userId, adminRole, questionId) => {
  return axios.get(`http://localhost:8000/api/questions/show`, {
    params: { userId, adminRole, questionId },
  });
};
export { fetchShowQuestion };

const fetchCreateQuestion = (formData) => {
  return axios.post(
    "http://localhost:8000/api/questions/create",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchCreateQuestion };

const fetchEditQuestion = (formData) => {
  return axios.post(
    "http://localhost:8000/api/questions/edit",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchEditQuestion };

const fetchDeleteQuestion = (formData) => {
  return axios.post(
    "http://localhost:8000/api/questions/delete",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchDeleteQuestion };

const fetchExamsToUser = (userId,currentPage, itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/exams/index-user`, {
    params: { userId,currentPage, itemsPerPage },
  });
};
export { fetchExamsToUser };

const fetchGetQuestion = (
  levelIds,
  topicIds,
  userId,
  quantity,
  quesReturnId
) => {
  return axios.get(`http://localhost:8000/api/exams/get-question`, {
    params: { levelIds, topicIds, userId, quantity, quesReturnId },
  });
};
export { fetchGetQuestion };

const fetchCreateExam = (formData) => {
  return axios.post(
    "http://localhost:8000/api/exams/create",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchCreateExam };



const fetchEditExam = (formData) => {
  return axios.post(
    "http://localhost:8000/api/exams/edit",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchEditExam };

const fetchShowExamEdit = (userId, adminRole, examId) => {
  return axios.get(`http://localhost:8000/api/exams/show-edit`, {
    params: { userId, adminRole, examId },
  });
};
export { fetchShowExamEdit };

const fetchShowExamCreate = () => {
  return axios.get(`http://localhost:8000/api/exams/show-create`, {});
};
export { fetchShowExamCreate };

const fetchDeleteExam = (formData) => {
  return axios.post(
    "http://localhost:8000/api/exams/delete",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchDeleteExam };

const fetchExamToSearch = (userId, keyword,currentPage, itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/exams/search`, {
    params: { userId, keyword,currentPage, itemsPerPage },
  });
};
export { fetchExamToSearch };

const fetchExamToFilter = (userId, news, outstanding,currentPage,itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/exams/filter`, {
    params: { userId, news, outstanding,currentPage,itemsPerPage },
  });
};
export { fetchExamToFilter };

const fetchExamToSearchAll = (keyword,currentPage, itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/exams/search-all`, {
    params: { keyword,currentPage,itemsPerPage },
  });
};
export { fetchExamToSearchAll };
const fetchLoadFilter = () => {
  return axios.get(`http://localhost:8000/api/exams/load-filter`);
};
export { fetchLoadFilter };

const fetchExamToFilterAll = (news,outstanding,tags,topics,currentPage, itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/exams/filter-all`,{params:{news,outstanding,tags,topics,currentPage, itemsPerPage}});
};
export { fetchExamToFilterAll };

//
const fetchCreateUserStats = (formData) => {
  return axios.post(
    "http://localhost:8000/api/user-stats/create",
    { formData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export { fetchCreateUserStats };

const fetchUserStatsToUser = (userId,currentPage,itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/user-stats/index-user`, {
    params: { userId, currentPage, itemsPerPage },
  });
};
export { fetchUserStatsToUser };

const fetchUserStatsToExam = (examId,currentPage,itemsPerPage) => {
  return axios.get(`http://localhost:8000/api/user-stats/index-exam`, {
    params: { examId,currentPage,itemsPerPage },
  });
};
export { fetchUserStatsToExam };
