import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { fetchFYYears, uploadPreviousYearTB, uploadPreviousYearTBUpdated } from "../../../Utils/API_Axios";
import { MasterHeadForPreviousDB } from "../../../Utils/MasterHead";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const PreviousYearTB = ({companyID,  setUploadDataStatus = false }) => {
  const [fyYears, setFyYears] = useState([]);
  const [formData, setFormData] = useState({});
  const [xlsxData, setXLSXData] = useState([]);
  const [xfile, setFile] = useState("");
  const [headErros, setHeadErrors] = useState([]);
  const [updateLedgerHead, setUpdateLedgerHead] = useState({});
  const [duplicateD, setDuplicateD] = useState([]);

  useEffect(() => {
    fetchFY();
  }, []);

  const fetchFY = async () => {
    try {
      const response = await fetchFYYears();
      if (response?.data?.errorStatus === 200) {
        console.log(response?.data);
        setFyYears(response?.data?.fylist);
      } else if (response?.data?.errorStatus === 401) {
        toast.error(`Error: ${response?.data?.error}`);
      } else {
        toast.error(`There is some issue on ledgers not found.`);
      }
    } catch (error) {
      console.error("Error fetching FY years:", error);
      toast.error("An error occurred while fetching FY years.");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const file = xfile;
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setXLSXData(jsonData);

      // You can use setFormData to store file data or use it for any other purpose
      // setFormData({ ...formData, fileData: jsonData });

      // Example: uploading file data
      if (formData.fy_year !== "") {
        const sendingData = {
          fy_year: formData.fy_year,
          file_data: jsonData,
          Company_ID: companyID,
          User_ID: JSON.parse(localStorage.getItem("userDetails"))._id,
        };
        const response = await uploadPreviousYearTB(sendingData);
        if (response?.data?.errorStatus === 200) {
          setHeadErrors(response?.data?.headErrors);
          toast.success(`Previous Year Data Uploaded...`);
          setUploadDataStatus(true);
          // now redirect to login page...
        } else if (response?.data?.errorStatus === 401) {
          return toast.error(`Error: ${response?.data?.error}`);
        } else {
          return toast.error(
            `There is some issue on entering client details try after sometime later.`
          );
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectOnChange = (e, error) => {
    e.preventDefault();
    const newHeader = e.target.value;
    if(newHeader === 'Please Select Correct Header'){
      alert('Please Select All Headers Correctly');
      return;
    }

    setUpdateLedgerHead((prev) => {
      const updatedEntries = { ...prev };
      const existingEntryKey = Object.keys(updatedEntries).find(
        (key) =>
          updatedEntries[key].Ledger_Name === error.Ledger_Name &&
          updatedEntries[key].Old_head === error.Head
      );

      if (existingEntryKey) {
        // Update existing entry
        updatedEntries[existingEntryKey] = {
          Head: newHeader,
          Old_head: error.Head,
          Ledger_Name: error.Ledger_Name,
        };
      } else {
        // Add new entry
        updatedEntries[Object.keys(updatedEntries).length] = {
          Head: newHeader,
          Old_head: error.Head,
          Ledger_Name: error.Ledger_Name,
        };
      }
      return updatedEntries;
    });
  };



  const updateMyHeads = async () => {
    console.log(  updateLedgerHead);
    console.log(headErros);

    const updateDataHeadsToSend = (data, updates) => {
      return data.map(entry => {
          for (let key in updates) {
              const update = updates[key];
              if ( entry.Head === update.Old_head) {
                  return { ...entry, Head: update.Head };
              }
          }
          return entry;
      });
  };
  
  const updatedDataNow = updateDataHeadsToSend(headErros, updateLedgerHead);
  console.log(updatedDataNow);


  
  const response = await uploadPreviousYearTBUpdated(updatedDataNow);
  if (response?.data?.errorStatus === 200) {
    setHeadErrors(response?.data?.headErrors);
    toast.success(`Previous Year Data Uploaded...`);
    setUploadDataStatus(true);
    // now redirect to login page...
  } else if (response?.data?.errorStatus === 401) {
    return toast.error(`Error: ${response?.data?.error}`);
  } else {
    return toast.error(
      `There is some issue on entering client details try after sometime later.`
    );
  }

  }










  const uniqueHeaders = [];
  const uniqueHeadErrors = headErros?.filter((_error) => {
    if (!uniqueHeaders.includes(_error.Head)) {
      uniqueHeaders.push(_error.Head);
      return true;
    }
    return false;
  });


  return (
    <div className="white_body">
      <div className="warning d-flex" style={{ marginBottom: "10px" }}>
        <p className="f-13 mt-5px">
          <span style={{ color: "red" }}>Please Note:</span> Add the Previous
          Year Trail Balance for the purpose of Previous Year Comparison in your
          Financials.
        </p>
        <a
          href="./Template.xlsx"
          className="f-13 margin-left-300px"
          download
          target="_blank"
        >
          Please Download the Template.{" "}
          <img src="./excel.svg" height="30" width="30" />{" "}
        </a>
      </div>
      <div className="d-flex gap-4 align-items-center">
        <div className="col-md-2 align-middle">
          <FormControl fullWidth size="small">
            <InputLabel id="select-label">fy_year</InputLabel>
            <Select
              labelId="select-label"
              value={formData.fy_year}
              label="fy_year"
              onChange={handleOnChange}
              required
            >
              <MenuItem value="">
                <em>Select FY</em>
              </MenuItem>
              {fyYears.map((item, index) => (
                <MenuItem value={item._id} key={index}>{item.year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <input
            className="f-13"
            type="file"
            name="previous_year_tb"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="col-md-6 ">
          <Button
            onClick={handleFileUpload}
            variant="contained"
            sx={{ bgcolor: "#2DA2FB" }}
            color="primary" disableElevation
          >
            Upload
          </Button>
          <Button
            className="mx-4 my-5"
            onClick={updateMyHeads}
            variant="contained"
            sx={{ bgcolor: "#2DA2FB" }}
            color="primary" disableElevation
          >
            Update All
          </Button>
        </div>
      </div>

      <div className="my-2">
        <TableContainer >
          <Table className="fa_register_table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ borderRight: "1px solid #e0e0e0", color: "white" }}>
                  Excel Head
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>Select Correct Head</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uniqueHeadErrors?.map((_error, index) => (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ borderRight: "1px solid #e0e0e0" }}>
                  {_error?.Head}
                  </TableCell>

                  <TableCell align="left">
                    <FormControl sx={{ width: 'auto', marginTop: -1 }}>
                      <Select
                        name="previous_year_data"
                        onChange={(e) => handleSelectOnChange(e, _error)}
                        variant="outlined"
                        size="small"
                        displayEmpty
                        defaultValue=""
                      >
                        <MenuItem value="" disabled>
                          Please Select Correct Header
                        </MenuItem>
                        {Object.entries(MasterHeadForPreviousDB).map(([key, value], idx) => (
                          <MenuItem value={key} key={idx}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PreviousYearTB;
