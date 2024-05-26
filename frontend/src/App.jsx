import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Signup,
  Login,
  VerifyEmail,
  ForgetPassword,
  Profile,
} from "./components/";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/otp/verify" element={<VerifyEmail />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
