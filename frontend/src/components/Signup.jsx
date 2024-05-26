import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState("");
  const handleOnChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  const { email, first_name, last_name, password, password2 } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !first_name || !last_name || !password || !password2) {
      setErrors(" All fields are required");
    } else {
      console.log(formdata);

      // Make call to api
      const res = axios.post("http://127.0.0.1:8000/api/register/", formdata);

      // Check our Response
      response = res.data;
      console.log(response);
      if (res.status == 201) {
        // Redirect to Verify Email Component
        navigate("/otp/verify");
        toast.success(response.message);
      }
    }
  };
  console.log(errors);

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>Create Account</h1>
          <p style={{ color: "red", padding: "2px" }}>{errors ? errors : ""}</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={email}
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="first_name"
              placeholder="Enter Your First Name"
              value={first_name}
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Enter Your Last Name"
              value={last_name}
              onChange={handleOnChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleOnChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Your Password"
              value={password2}
              onChange={handleOnChange}
            />
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
