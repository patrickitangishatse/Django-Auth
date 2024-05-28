import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsLoading(true);

    if (!otp) {
      setErrors("OTP is required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/verify-email/",
        JSON.stringify({ otp }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Email verified successfully");
        navigate("/login"); // Redirect to login page or another page as needed
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.otp?.[0] ||
        error.response?.data?.non_field_errors?.[0] ||
        "Something went wrong";
      toast.error(errorMessage);
      setErrors(errorMessage);
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>Verify Your Email</h1>
          <h3>Check your email and enter the OTP</h3>
          {errors && <p style={{ color: "red", padding: "2px" }}>{errors}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP to verify your email"
            />
            <input
              type="submit"
              value={isLoading ? "Verifying..." : "Verify"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
