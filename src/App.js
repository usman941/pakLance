import Landing from "./components/Landing";
import Login from "./pages/Login";
import SeekerLogin from "./pages/SeekerLogin";

import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterAs from "./pages/RegisterAs";
import ForgetPassword from "./pages/ForgetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import CreateProfile from "./pages/CreateProfile";
import BankDetail from "./components/BankDetail";
import JobSeaker from "./pages/JobSeaker";
import JobProviderFixedPrice from "./pages/JobProviderFixedPrice";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Bidding from "./pages/Bidding";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderProjects from "./pages/ProviderProjects";
import AllBids from "./pages/AllBids";
import UpdateProject from "./pages/UpdateProject";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seekerlogin" element={<SeekerLogin/>} />

          <Route path="/register" element={<Register />} />
          <Route path="/registeras" element={<RegisterAs />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/setpassword/:id" element={<SetNewPassword />} />
          <Route
            path="/createprofile"
            element={<ProtectedRoute Component={CreateProfile} />}
          />
          <Route
            path="/bankDetail"
            element={<ProtectedRoute Component={BankDetail} />}
          />
          <Route path="/jobseaker" element={<JobSeaker />} />
          <Route
            path="/jobprovider"
            element={<ProtectedRoute Component={JobProviderFixedPrice} />}
          />
             <Route
            path="/payment"
            element={<ProtectedRoute Component={Payment} />}
          />
          <Route
            path="/setting"
            element={<ProtectedRoute Component={Settings} />}
          />
          <Route path="/chat" element={<ProtectedRoute Component={Chat} />} />
          <Route
            path="/bidding"
            element={<ProtectedRoute Component={Bidding} />}
          />
          <Route path="/projects" element={<ProviderProjects />} />
          <Route path="/bids" element={<AllBids />} />
          <Route
            path="/updateProject"
            element={<ProtectedRoute Component={UpdateProject} />}
          />
        </Routes>
      </Router>

      {/* <Register/> */}
    </>
  );
}
