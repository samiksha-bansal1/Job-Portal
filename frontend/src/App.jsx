import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import FindJobs from "./pages/FindJobs";
import JobDetail from "./components/JobDetail";
import SearchResults from "./components/SearchResults";
import MyJobs from "./components/MyJobs";
import Profile from "./pages/Profile";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetUp from "./components/admin/CompanySetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./layout/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
           <ProtectedRoute>
       <Layout />
         </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findjobs" element={<FindJobs />} />
          <Route path="/jobdetail/:id" element={<JobDetail />} />
          <Route path="/search-result" element={<SearchResults />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="recruiter">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Companies />} />
          <Route path="create/company" element={<CreateCompany />} />
          <Route path="company/:id" element={<CompanySetUp />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="create/job" element={<PostJob />} />
          <Route path="job/applicants/:id" element={<Applicants />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
