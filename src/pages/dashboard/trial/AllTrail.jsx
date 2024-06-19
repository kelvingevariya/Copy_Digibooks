import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchWithTempUntagged } from "../../../Utils/API_Axios";
import { toIndianCommaFormat } from "../../../Utils/math";
import { Table,TableHead,TableRow,TableCell,TableBody } from "@mui/material"

function AllTrail({companyID}) {
  const [jsonData, setJsonData] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch jsonData or set it using some other method
    // For example:
    const fetchData = async () => {
      try {
        const response = await fetchWithTempUntagged({companyID});

        if (response?.data?.errorStatus === 200) {
          setJsonData(
            // response?.data?.unTagged.filter((item) => !item.isTagged)
            response?.data?.data
          );
          // now redirect to login page...
        } else if (response?.data?.errorStatus === 401) {
          return toast.error(`Error: ${response?.data?.error}`);
        } else {
          return toast.error(
            `There is some issue on fetching Trail unTagged not found.`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const renderRows = (data, padding, lastHeaderPadding) => {
    // Map through each item in the data array

    return data.map((item, index) => {
      return item?.name ? (
        <React.Fragment key={index}>
          <tr>
            <td
              style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            >
              {item.name}
            </td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
          </tr>

          {/* Recursively render children if they exist */}
          {item.children &&
            renderRows(item.children, padding + 10, lastHeaderPadding)}
          {/* Render ledger entries if they exist */}

          {item.ledger &&
            item.ledger.map((ledger, i) => {
              return (
                <tr key={`${index}-${i}`} className="ledger_child">
                  <td style={{ paddingLeft: `${padding + 10}px` }}>
                    {ledger.name}
                  </td>
                  <td className='numeric'>{toIndianCommaFormat(ledger.opening_balance) || ""}</td>
                  <td className='numeric'>{toIndianCommaFormat(ledger.debit) || ""}</td>
                  <td className='numeric'>{toIndianCommaFormat(ledger.credit) || ""}</td>
                  <td className='numeric'>{toIndianCommaFormat(ledger.closing_balance) || ""}</td>
                  <td>{ledger?.head || ""}</td>
                  <td>{ledger?.child || ""}</td>
                  
                </tr>
              );
            })}
        </React.Fragment>
      ) : null;
    });
  };

  return (
    <div className="tab_data">
      <div className="tableTrail">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col" className="f-13">Particulars</TableCell>
              <TableCell scope="col" className="f-13">Open Bal</TableCell>
              <TableCell scope="col" className="f-13">Debit</TableCell>
              <TableCell scope="col" className="f-13">Credit</TableCell>
              <TableCell scope="col" className="f-13">Close Bal</TableCell>
              <TableCell scope="col" className="f-13">Head</TableCell>
              <TableCell scope="col" className="f-13">Child</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="myTable">{renderRows(jsonData,10,10)}</TableBody>
        </Table>
      </div>
      {/* <button className="updateButton" onClick={handleSubmit}>
        Update
      </button> */}
    </div>
  );
}

export default AllTrail;
