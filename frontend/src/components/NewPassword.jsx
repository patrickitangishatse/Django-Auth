import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewPassword = () => {
  const [formData, setFormData] = useState({ password: "", password2: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { uidb64, token } = useParams(); // Get uidb64 and token from URL

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsLoading(true);

    const { password, password2 } = formData;

    if (!password || !password2) {
      setErrors("Both fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== password2) {
      setErrors("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/set-new-password/`,
        JSON.stringify({ password, uidb64, token }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Password reset successful");
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.detail ||
        "Something went wrong, please try again";
      toast.error(errorMessage);
      setErrors(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Set New Password</h1>
        {errors && <p style={{ color: "red", padding: "2px" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm new password"
            value={formData.password2}
            onChange={handleOnChange}
          />
          <input
            type="submit"
            value={isLoading ? "Resetting..." : "Reset Password"}
          />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
