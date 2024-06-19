import Search from "@mui/icons-material/Search"
import { TableCell,TableRow,TableHead,TableBody,Table,Select,MenuItem,Input } from "@mui/material"
import React from "react"

const FARegister = () => {
  return (
    <div className="white_body">
      <div className="warning">
        <p>
          <span style={{ color: "red" }}>Please Note:</span> This tool does not
          do any calculations for depreciation, you need to make sure all the
          Deperication Entries are passed Assed-wise and the same will be
          fetched over here.
        </p>
      </div>

      <div className="table_data ">
      <Table className="fa_register_table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }} className="table_cell" colSpan={2}>Ledger Name</TableCell>
              <TableCell sx={{ color: "white" }} className="table_cell">Asset Type</TableCell>
              <TableCell sx={{ color: "white" }} className="table_cell">Asset Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="table_cell" colSpan={2}>ABC Ledger</TableCell>
              <TableCell sx={{ width: "32vw" }} className="table_cell">
                <Select sx={{
                  "& fieldset": { border: 'none' },
                }} disableUnderline className="formInput">
                  <MenuItem value="Tangible Asset">Tangible Asset</MenuItem>
                  <MenuItem value="In-Tangible Asset">In-Tangible Asset</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="table_cell">
                <Input className="formInput border_gray" disableUnderline sx={{ outline: "none"}} type="text" name="asset_category" placeholder="Please Enter Asset Category" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FARegister;
