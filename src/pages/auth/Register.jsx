import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PUBLIC_URL } from "../../App";
import { toast } from "react-toastify";
import {
  ERROR_FIELD_TYPES,
  checkEmptyFieldOrError,
} from "../../Utils/Constants";
import { registerUser } from "../../Utils/API_Axios";
import { useQuery } from "@tanstack/react-query";
import { useCustomQuery } from "../../hooks/useQueryHook";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firmname:"",
    fname:"",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [hidePass, setHidePass] = useState(true);
  const [hidePass1, setHidePass1] = useState(true);
  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    // check matching password
    if (formData.password !== formData.cpassword) {
      return toast.error("Password and Confirm Password is Not Match.");
    }

    // check valid email address
    if (checkEmptyFieldOrError(formData.email, ERROR_FIELD_TYPES.EMAIL)) {
      return toast.error(`Email Field is Required, and a Valid Email Address`);
    }
    // check valid phone number
    if (checkEmptyFieldOrError(formData.mobile, ERROR_FIELD_TYPES.PHONE)) {
      return toast.error(
        `Phone Field is Required, and a Valid Phone/Mobile Number`
      );
    }

    // check valid password

    // if (checkEmptyFieldOrError(formData.password, ERROR_FIELD_TYPES.PASSWORD)) {
    //   return toast.error(
    //     `Please enter a valid password. at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special symbol such as @$!%*?&.`
    //   );
    // }
    const { response: _registerUser } = useCustomQuery(formData, registerUser(formData))

    if (_registerUser?.data?.errorStatus === 200) {
      toast
        .success(`Registration Successfull, Please verfiy your token, and then You can now login!!`,{
          onClose: ()=>{
            navigate("/auth/verfiy-token");
          }
        })
     
      console.log(_registerUser);

      // empty the form fields
      setFormData({
        firmname:"",
        fname:"",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });

      // now redirect to login page...
    } else if (_registerUser?.data?.errorStatus === 401) {
      return toast.error(`Error: ${_registerUser?.data?.error}`);
    } else {
      return toast.error(
        `There is some issue on registration try after sometime later.`
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
              <label className="form-label">
                Firm Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={onChangeHandle}
                value={formData.firmname}
                name="firmname"
              />
            
            </div>
            <div className="mb-3">
              <label className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={onChangeHandle}
                value={formData.fname}
                name="fname"
              />
            
            </div>
          
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={onChangeHandle}
                value={formData.email}
                name="email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                onChange={onChangeHandle}
                value={formData.mobile}
                name="mobile"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="d-flex password_div">
                <input
                  type={hidePass1 ? 'password' : 'text'}
                  className="form-control line-height-2 input_password"
                  id="exampleInputPassword1"
                  onChange={onChangeHandle}
                  value={formData.password}
                  name="password"
                />
                <button className="view_eye_btn" onClick={()=>{setHidePass1(!hidePass1)}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg></button>
                </div>
   
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <div className="d-flex password_div">
                <input
                  type={hidePass ? 'password' : 'text'}
                  className="form-control line-height-2 input_password"
                  id="exampleInputPassword1"
                  onChange={onChangeHandle}
                  value={formData.cpassword}
                  name="cpassword"
                />
                <button className="view_eye_btn" onClick={()=>{setHidePass(!hidePass)}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg></button>
                </div>
              <p style={{ fontSize: "12px" }}>
                Confirm password must match the password.
              </p>
            </div>

            <button
              onClick={handleFormSubmit}
              className="btn btn-dark btn-block w-100"
            >
              Sign Up
            </button>

          
            <p className="my-3 text-center rm_link">
            Already have an account??  &nbsp; 
              <NavLink to="/" className='rm_link'>
               Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
