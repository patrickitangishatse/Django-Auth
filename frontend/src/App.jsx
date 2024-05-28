import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Signup,
  Login,
  VerifyEmail,
  ForgetPassword,
  Profile,
  PasswordResetConfirm,
  NewPassword,
} from "./components/";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/otp/verify" element={<VerifyEmail />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route
            path="/password-reset-confirm/:uidb64/:token"
            element={<PasswordResetConfirm />}
          />
          <Route
            path="/set-new-password/:uidb64/:token"
            element={<NewPassword />}
          />
        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
