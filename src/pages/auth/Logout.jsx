import React, { useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions when component mounts
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    toast.success("Logout Successful, now redirecting to login page!!", {
      onClose: () => {
        navigate("/"); // Redirect to login page
      },
    });
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

  // Return null since there's no JSX to render
  return null;
};

export default Logout;