import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PUBLIC_URL } from "../../App";

import { loginUser } from "../../Utils/API_Axios";
import { useQuery } from "@tanstack/react-query";
import { useCustomQuery } from "../../hooks/useQueryHook";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_or_mobile: "",
    password: "",
  });

  const [hidePass, setHidePass] = useState(true);

  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { response } = useCustomQuery("formData", loginUser(formData))

  const handleFormSubmit = async () => {


    // try login now
    const response = await loginUser(formData);
    if (response?.data?.errorStatus === 200) {
      localStorage.setItem('userToken', response?.data?.token)
      localStorage.setItem('userDetails', JSON.stringify(response?.data?.user))
      toast.success(
        `Login Successfull, You can now redirecting to dashboard!!`,
        {
          onClose: () => {
            navigate("/dashboard");
          },
        }
      );


      // empty the form fields
      setFormData({
        email_or_mobile: "",
        password: "",
      });

      // now redirect to login page...
    } else if (response?.data?.errorStatus === 402) {
      return toast.warning(`Message: ${response?.data?.message}`, {
        onClose: () => {
          navigate("/auth/verfiy-token");
        },
      });
    }
    else if (response?.data?.errorStatus === 401) {
      return toast.error(`Error: ${response?.data?.error}`);
    } else {
      return toast.error(
        `There is some issue on login try after sometime later.`
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
          <h4 className="text-white lilita">Making Finance Intelligent Artificially</h4>
          <p className="text-white lilita">because just an AI is not enough</p>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5 login_form_box">
          <img
            src={`${PUBLIC_URL}/images/logo.png`}
            alt=""
            style={{ height: "15vh" }}
          />
          <div style={{ width: "70%" }}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label line-height-2 f-500">
                Email or Mobile No
              </label>
              <input
                type="email"
                className="form-control line-height-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={onChangeHandle}
                value={formData.email_or_mobile}
                name="email_or_mobile"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label  line-height-2 f-500">
                Password
              </label>
              <div className="d-flex password_div">
                <input
                  type={hidePass ? 'password' : 'text'}
                  className="form-control line-height-2 input_password"
                  id="exampleInputPassword1"
                  onChange={onChangeHandle}
                  value={formData.password}
                  name="password"
                />
                <button className="view_eye_btn" onClick={() => { setHidePass(!hidePass) }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg></button>
              </div>

            </div>
            <p className="my-3 text-end">
              <NavLink to="/auth/forgot-pass" className='rm_link'>Forgot your Password?</NavLink>
            </p>
            <button
              onClick={handleFormSubmit}
              className="btn btn-dark btn-block w-100  line-height-2"
            >
              Sign In
            </button>

            <div className="or-line">
              <hr className="line" />
              <span className="or-text">Or</span>
              <hr className="line" />
            </div>
            <p className="my-3 text-center rm_link">
              Are you new??  &nbsp;
              <NavLink to="/auth/register" className='rm_link'>
                Create An Account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
