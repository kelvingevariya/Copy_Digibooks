import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PUBLIC_URL } from "../../App";

import { forgotPass } from "../../Utils/API_Axios";
import { useCustomQuery } from "../../hooks/useQueryHook";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onChangeHandle = (e) => {
    setEmail( e.target.value);
  };

  const handleFormSubmit = async () => {

    // try login now
    const { response } = useCustomQuery(email, forgotPass({email:email}));
    if (response?.data?.errorStatus === 200) {
      toast.success(
        `Forgot Password OTP send, Please check...!!`,
        {
          onClose: () => {
            navigate("/auth/reset-pass");
          },
        }
      );


      // empty the form fields
      setEmail("");

      // now redirect to login page...
    }else if (response?.data?.errorStatus === 402) {
      return toast.warning(`Message: ${response?.data?.message}`);
    }
     else if (response?.data?.errorStatus === 401) {
      return toast.error(`Error: ${response?.data?.error}`);
    } else {
      return toast.error(
        `There is some issue sending OTP try after sometime later.`
      );
    }
  };

  return (
    <div style={{ maxHeight: "100vh", height: "100%", overflow: "hidden" }}>
      <div className="row">
        <div className="col-md-4 login_img_box">
          <img
            src={`${PUBLIC_URL}/images/login_img.png`}
            alt=""
            className="login_img"
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5 login_form_box">
          <img
            src={`${PUBLIC_URL}/images/logo.png`}
            alt=""
            style={{ height: "10vh" }}
          />
          <div style={{ width: "70%" }}>
  
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Enter Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={onChangeHandle}
                  value={email}
                  name="email"
                />
              </div>
           
              <button
                onClick={handleFormSubmit}
                className="btn btn-dark btn-block w-100"
              >
                Send OTP (Forgot Password)
              </button>
       
            <p className="my-3 text-end">
              <NavLink to="/">
                Try Login, Login?
              </NavLink>
            </p>
            <p className="my-3 text-end">
              <NavLink to="/auth/register">
                Don't have an account, Register?
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
