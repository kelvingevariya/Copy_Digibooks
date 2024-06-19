import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getClientDetails,
  registerClientDetails,
} from "../../../Utils/API_Axios";
import Sidebar from "../Sidebar";
import TopHeader from "../TopHeader";
import Trials from "../Trials";
import ClientDetails from "./ClientDetails";
import FARegister from "./FARegister";
import PreviousYearTB from "./PreviousYearTB";
import RelatedPartyTrans from "./RelatedPartyTrans";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SelectClient from "./SelectClient";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form"

const Financials = () => {
  const {register,formState:{errors},setValue,resetField,getValues} = useForm()
  const [page, setPage] = useState(1);
  const [clientForm, setClientForm] = useState({});
  const [REQUIRED_ERROR, SET_REQUIRED_ERROR] = useState({});
  const [uploadDataStatus, setUploadDataStatus] = useState(false);
  console.log(clientForm)
  const pageSerial = [
    {
      page: 1,
      title: "Select Client",
    },
    {
      page: 2,
      title: "Client Details",
    },
    {
      page: 3,
      title: "Previous Year TB",
    },
    {
      page: 4,
      title: "TB Tagging",
    },
    {
      page: 5,
      title: "FA Register",
    }
  ];

  useEffect(() => {
    clientDetailsFromDB();
  }, []);

  const clientDetailsFromDB = async (CompanyID, SL_year) => {
    let LoginUserId = JSON.parse(localStorage.getItem("userDetails"))._id;
    const response = await getClientDetails({
      loginId: LoginUserId,
      CompanyID: CompanyID || clientForm.CompanyID,
      SL_year: SL_year || clientForm.SL_year,
    });

    if (response?.data?.clientDetails != null) {
      const savedPage = response.data.clientDetails.SubmissionStage || 1;
      setClientForm({
        ...response.data.clientDetails,
        SL_year: SL_year || clientForm.SL_year,
        SubmissionStage: savedPage || 1,
      });
      setValue({...response.data.clientDetails,
        SL_year: SL_year || clientForm.SL_year,
        SubmissionStage: savedPage || 1,});
      setPage(savedPage);
    } else {
      setClientForm({});
      // setValue({})
      setPage(1);
    }
  };

  const changePageAndContent = (id) => {
    setPage(id);
    setClientForm((prev) => ({ ...prev, SubmissionStage: id }));
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatClientForm = (form) => {
    const formattedForm = {};

    for (const key in form) {
      if (form.hasOwnProperty(key) && typeof form[key] === "string") {
        formattedForm[key] = capitalizeFirstLetter(form[key]);
      } else {
        formattedForm[key] = form[key];
      }
    }

    return formattedForm;
  };

  const handlePrevious = () => {
    changePageAndContent(page - 1);
  };

  const handleNext = async () => {
    let error = 0;

    if (page === 1) {
      if (
        checkClientRequiredField("SL_year", clientForm, REQUIRED_ERROR) &&
        checkClientRequiredField("CompanyID", clientForm, REQUIRED_ERROR)
      ) {
        toast.success(`Tally Data Selected Successfully.`);
        await clientDetailsFromDB(clientForm.CompanyID, clientForm.SL_year);
        changePageAndContent(clientForm.SubmissionStage || 2);
      }
    } else {
      if (page === 2) {
        if (
          checkClientRequiredField("C_cName", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("C_rupeesIn", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("C_address", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("S_dn1", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("S_dn2", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("S_sn1", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("S_sn2", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("A_UDIN", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField(
            "A_auditorName",
            clientForm,
            REQUIRED_ERROR,
          ) &&
          checkClientRequiredField(
            "A_dateSigning",
            clientForm,
            REQUIRED_ERROR,
          ) &&
          checkClientRequiredField(
            "A_designation",
            clientForm,
            REQUIRED_ERROR,
          ) &&
          checkClientRequiredField("A_firmName", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField("A_firmRegNo", clientForm, REQUIRED_ERROR) &&
          checkClientRequiredField(
            "A_membershipNo",
            clientForm,
            REQUIRED_ERROR,
          ) &&
          checkClientRequiredField("A_placeSigning", clientForm, REQUIRED_ERROR)
        ) {
          if (await insertClientDetails(clientForm)) {
            // toast.success(`Client Details Updated Successfully.`);
            changePageAndContent(page + 1);
          }
        }
      } else if (page === 3) {
        // toast.success(`Previous Year TB Updated Successfully.`);
        changePageAndContent(page + 1);
      } else if (page === 4) {
        // toast.success(`TB Tagging Completed Successfully.`);
        changePageAndContent(page + 1);
      } else if (page === 5) {
        // toast.success(`FA Register Updated Successfully.`);
        changePageAndContent(page + 1);
      } else if (page === 6) {
        // toast.success(`Related Party Trans Updated Successfully.`);
        changePageAndContent(page + 1);
      }
    }
  };

  const insertClientDetails = async (clientData) => {
    const payload = clientData;
    payload.LoginUserId = JSON.parse(localStorage.getItem("userDetails"))._id;
    payload.SL_year = clientData.SL_year;
    const payloadCapital = formatClientForm(payload);
    const response = await registerClientDetails(payloadCapital);
    if (response?.data?.errorStatus === 200) {
      return true;
    } else if (response?.data?.errorStatus === 401) {
      return toast.error(`Error: ${response?.data?.error}`);
    } else {
      return toast.error(
        `There is some issue on entering client details. Try again later.`,
      );
    }
  };

  const handleSubmit = () => { };

  const handleClientForm = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    const { name, value } = e.target;

    if (name === "SL_year") {
      if (value !== clientForm[name]) {
        setClientForm((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setClientForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const checkClientRequiredField = (key, clientForm, REQUIRED_ERROR) => {
    SET_REQUIRED_ERROR({});

    if (clientForm.hasOwnProperty(key) && clientForm[key] !== "") {
      return true;
    } else {
      SET_REQUIRED_ERROR({ ...REQUIRED_ERROR, [key]: key });
      alert("Please Fill all the details.");
    }
    return false;
  };








  return (
    <div className="dashboard_main">
      <Sidebar />
      <main className="main_content">
        <TopHeader />
        <div className="sub_header">
          <div className="cc">
            <Stepper activeStep={page - 1}     >
              {pageSerial.map(({ title, page }) => (
                <Step key={page} >
                  <StepLabel >
                    {title}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <div className="prev_next">
              <Button
                className={` ${page !== 1 ? "show" : "hide"}`}
                onClick={handlePrevious}
                variant="contained"
                sx={{ bgcolor: "#2DA2FB" }}
                color="primary" disableElevation>
                Previous
              </Button>
              <Button
                className={`${page !== pageSerial.length ? "show" : "hide"}`}
                sx={{ bgcolor: "#2DA2FB" }}
                onClick={handleNext}
                variant="contained" disableElevation>
                Next
              </Button>
              <Button
                className={`${page === pageSerial.length ? "show" : "hide"}`}
                sx={{ bgcolor: "#2DA2FB" }}
                onClick={handleSubmit}
                variant="contained" disableElevation>
                Submit
              </Button>
            </div>
          </div>

        </div>


        {page === 1 && (
          <SelectClient
            setValues={setValue}
            getValues={getValues}
            clientForm={clientForm}
            setClientForm={setClientForm}
            handleClientForm={handleClientForm}
            REQUIRED_ERROR={REQUIRED_ERROR}
          />
        )}
        {page === 2 && (
          <ClientDetails
            clientForm={clientForm}
            setClientForm={setClientForm}
            handleClientForm={handleClientForm}
            REQUIRED_ERROR={REQUIRED_ERROR}
          />
        )}
        {page === 3 && (
          <PreviousYearTB companyID={clientForm.CompanyID}  setUploadDataStatus={setUploadDataStatus} />
        )}
        {page === 4 && <Trials companyID={clientForm.CompanyID} />}
        {page === 5 && <FARegister />}
      </main>
    </div>
  );
};



export default Financials;