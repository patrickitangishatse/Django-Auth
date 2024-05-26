import React, { useState } from "react";

const VerifyEmail = () => {
  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>Verify Your email</h1>
          <h3>Check on your email, and enter OTP</h3>

          <form>
            <input
              type="text"
              name="otp"
              placeholder="enter OTP to verify your email"
            />
            <input type="submit" value="Verify" />
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
