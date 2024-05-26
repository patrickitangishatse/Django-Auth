import React, { useState } from "react";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>Login Here</h1>
          <h3>Welcome Back!!</h3>
          <form>
            <input type="email" name="email" placeholder="user@example.com" />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
