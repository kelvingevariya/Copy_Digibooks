import React, { useState, useEffect } from "react";
import DatatableToShow from "../../../component/DatatableToShow";
import { toast } from "react-toastify";
import { fetchLedger } from "../../../Utils/API_Axios";

const LedgerList = () => {
  const [ledgerList, setLedgerList] = useState([]);

  useEffect(() => {
    fetchAllLedger();
  }, []);

  const fetchAllLedger = async () => {
    const response = await fetchLedger();
    if (response?.data?.errorStatus === 200) {
      console.log(response?.data);
      setLedgerList(response?.data?.ledgerList);
      // now redirect to login page...
    } else if (response?.data?.errorStatus === 401) {
      return toast.error(`Error: ${response?.data?.error}`);
    } else {
      return toast.error(`There is some issue on ledgers not found.`);
    }
  };

  const columns = [
    {
      name: "S/No",
      style: {
        maxWidth: "10px",
        fontSize:"16px",
      },
      cell: (row, index) => ++index,
    },
    {
      name: "Ledger Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
      style: {
        fontSize:"16px",
      },
    },
    {
      name: "Under",
      selector: (row) => row.parent,
      sortable: true,
      style: {
        fontSize:"16px",
      },
    },
    {
      name: "GSTIN Number",
      selector: (row) => row.gstn,
      sortable: true,
      style: {
        fontSize:"16px",
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        // minHeight: "72px",
        // border:'1px solid #2f2f2f'
      },
    },
    headCells: {
      style: {
        // paddingLeft: "8px",
        // paddingRight: "8px",
        padding:"0px 8px",
        color: "white",
        backgroundColor: "#2DA2FB",
        fontSize:'16px',
        // border: "1px solid black",
        
      },
    },

    cells: {
      style: {
        // paddingLeft: "8px",
        // paddingRight: "8px",
        padding:"0px 8px",
        border: "1px solid black",
      },
    },
  };

  return (
    <>
      <DatatableToShow
        columns={columns}
        data={ledgerList}
        customStyles={customStyles}
      />
    </>
  );
};

export default LedgerList;
