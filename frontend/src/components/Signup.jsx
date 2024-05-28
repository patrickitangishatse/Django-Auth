import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsLoading(true);

    const { email, first_name, last_name, password, password2 } = formData;

    if (!email || !first_name || !last_name || !password || !password2) {
      setErrors("All fields are required");
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
        "http://127.0.0.1:8000/api/register/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate("/otp/verify");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.response?.data?.password2?.[0] ||
        error.response?.data?.non_field_errors?.[0] ||
        "Something went wrong";
      toast.error(errorMessage);
      setErrors(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Create Account</h1>
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
            type="text"
            name="first_name"
            placeholder="Enter Your First Name"
            value={formData.first_name}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Enter Your Last Name"
            value={formData.last_name}
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
            type="password"
            name="password2"
            placeholder="Confirm Your Password"
            value={formData.password2}
            onChange={handleOnChange}
          />
          <input type="submit" value={isLoading ? "Loading..." : "Register"} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
