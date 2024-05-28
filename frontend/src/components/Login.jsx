import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setErrors("Both fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Login successful");
        navigate("/dashboard"); // Redirect to dashboard or another page as needed
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.detail || "Invalid credentials, please try again";
      toast.error(errorMessage);
      setErrors(errorMessage);
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>Login Here</h1>
          <h3>Welcome Back!!</h3>
          {errors && <p style={{ color: "red", padding: "2px" }}>{errors}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleOnChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleOnChange}
            />
            <input
              type="submit"
              value={isLoading ? "Logging in..." : "Login"}
            />
          </form>
          <Link
            to="/forget_password"
            style={{ marginTop: "10px", display: "block" }}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
