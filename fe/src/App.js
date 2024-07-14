import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Tests from "./pages/Tests";
import DashBoard from "./pages/DashBoard";
import Detail from "./pages/Detail";
import Testing from "./components/exams_detail/Testing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexExam from "./components/dashboard/my_exams/IndexExam";
import CreateExam from "./components/dashboard/my_exams/CreateExam";
import EditExam from "./components/dashboard/my_exams/EditExam";
import IndexQuestion from "./components/dashboard/questions/IndexQuestion";
import CreateQuestion from "./components/dashboard/questions/CreateQuestion";
import EditQuestion from "./components/dashboard/questions/EditQuestion";
import ExamResult from "./components/dashboard/my_exams/ExamResult";
import UserStats from "./components/exams_detail/UserStats";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/exams" element={<Tests />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/exams/:name" element={<Detail />}></Route>
        <Route path="/exams/:name/testing" element={<Testing />}></Route>
        <Route path="/dashboard/my-exams" element={<IndexExam />}></Route>
        <Route path="/dashboard/my-exams/user-stats/:id" element={<UserStats />}></Route>
        <Route path="/dashboard/my-exams/create" element={<CreateExam />}></Route>
        <Route path="/dashboard/my-exams/edit/:id" element={<EditExam />}></Route>
        <Route path="/dashboard/my-exams/exam-results" element={<ExamResult />}></Route>
        <Route path="/dashboard/questions" element={<IndexQuestion />}></Route>
        <Route path="/dashboard/questions/create" element={<CreateQuestion />}></Route>
        <Route path="/dashboard/questions/edit/:id" element={<EditQuestion />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
