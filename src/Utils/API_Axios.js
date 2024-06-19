import axios from "axios";

import Logout from "../pages/auth/Logout";

 export const baseURL = "http://localhost:8000/api";
//export const baseURL = "/api";

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};
export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error login user:", error);
    return false;
  }
};


export const forgotPass = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/auth/forgot-pass`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("OTP not send failed");
    }
  } catch (error) {
    console.error("Error otp user:", error);
    return false;
  }
};
export const updatePass = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/auth/update-pass`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("OTP not send failed");
    }
  } catch (error) {
    console.error("Error otp user:", error);
    return false;
  }
};




export const verifyToken = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/verify-ip-token`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
    }
  } catch (error) {
    console.error("Error login user:", error);
    return false;
  }
};

export const fetchLedger = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/ledger/get-all-ledger`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else if (response.status === 101) {
      // token verify failed redirec to login page...
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);

    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    window.location.href = '/';
    <Logout />;
    return false;
  }
};
export const fetchFYYears = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/util/get-financial-years`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else if (response.status === 101) {
      // token verify failed redirec to login page...
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);

    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    window.location.href = '/';
    <Logout />;
    return false;
  }
};

export const fetchTrailUnTagged = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/account/get-all-accounting-trail-balance`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};
export const fetchTrail = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/account/fetch-parent`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};
export const fetchWithParent = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/account/fetch-from-parent`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};
export const addTaggedTrail = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/account/add-tagged`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};

export const registerClientDetails = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/financial/create-client-details`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};
export const getClientDetails = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/financial/get-client-details`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else {
      throw new Error("Fetching Error on Client Details failed");
    }
  } catch (error) {
    console.error("Error fetching client Details:", error);
    return false;
  }
};

export const uploadPreviousYearTB = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/financial/upload-previous-year-tb`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};

export const getCompanysDetails = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}/financial/get-companies`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else {
      throw new Error("Fetching Error on Client Details failed");
    }
  } catch (error) {
    console.error("Error fetching client Details:", error);
    return false;
  }
};

// temp work

export const fetchWithTempUntagged = async (payload) => {
  console.log('fetchWithTempUntagged', payload)
  try {
    const response = await axios.post(
      `${baseURL}/account/fetch-from-temp`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};


export const uploadPreviousYearTBUpdated = async (payload) => {
  try {
    const response = await axios.post(
      `${baseURL}/financial/upload-previous-year-tb-update`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (response?.data?.errorStatus === 200) {
      return response;
    } else if (response?.data?.errorStatus === 401) {
      return response;
    } else if (response?.data?.errorStatus === 402) {
      return response;
    } else {
      throw new Error("Token Verified failed");
      window.location.href = '/';
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userToken");
      <Logout />;
    }
  } catch (error) {
    console.error("Error login user:", error);
    window.location.href = '/';
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");
    <Logout />;
    return false;
  }
};
