import React, { useState } from "react";

const Login = () => {
  return (
    <>
      <div className="form-container">
        <h1>Login Here!</h1>
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
    </>
  );
};

export default Login;
