import React from "react";

const Signup = () => {
  return (
    <>
      <div className="form-container">
        <h1>Create Account</h1>
        <form>
          <input type="email" name="email" placeholder="user@example.com" />
          <input
            type="text"
            name="first_name"
            placeholder="Enter Your First Name"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Enter Your Last Name"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Your Password"
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};

export default Signup;
