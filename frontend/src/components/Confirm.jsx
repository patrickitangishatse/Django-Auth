import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordResetConfirm = () => {
  const navigate = useNavigate();
  const { uidb64, token } = useParams(); // Get uidb64 and token from URL

  useEffect(() => {
    const confirmResetToken = async () => {
      try {
        await axios.get(
          `http://127.0.0.1:8000/api/password-reset-confirm/${uidb64}/${token}/`
        );
        // If successful, navigate to the set new password page
        navigate(`/set-new-password/${uidb64}/${token}`);
      } catch (error) {
        toast.error("Invalid or expired link");
        navigate("/password-reset-request");
      }
    };

    confirmResetToken();
  }, [uidb64, token, navigate]);

  return (
    <div className="container">
      <div className="form-container">
        <h1>Verifying...</h1>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
