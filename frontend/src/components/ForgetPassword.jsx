import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsLoading(true);

    if (!email) {
      setErrors("Email is required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/password-reset/",
        JSON.stringify({ email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Password reset link sent to your email");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.email?.[0] ||
        "Something went wrong, please try again";
      toast.error(errorMessage);
      setErrors(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Reset Password</h1>
        <h3>Enter your email to receive a password reset link</h3>
        {errors && <p style={{ color: "red", padding: "2px" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            value={isLoading ? "Sending..." : "Send Reset Link"}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
