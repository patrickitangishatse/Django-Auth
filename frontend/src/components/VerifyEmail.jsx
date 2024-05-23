import React, { useState } from "react";

const VerifyEmail = () => {
  return (
    <>
      <div className="form-container">
        <h1>Create Account</h1>
        <form>
          <p>Check on your email, and enter OTP</p>
          <input
            type="text"
            name="otp"
            placeholder="enter OTP to verify your email"
          />
          <input type="submit" value="Verify" />
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;
