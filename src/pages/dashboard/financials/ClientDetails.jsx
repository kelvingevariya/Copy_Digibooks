import React from "react"
import { useForm,Controller } from "react-hook-form"
import { TextField,Button } from "@mui/material"

const ClientDetails = ({ clientForm,handleClientForm,REQUIRED_ERROR }) => {
  const { control,handleSubmit,formState: { errors } } = useForm({
    defaultValues: clientForm,
  })
   

  return (
    <div className="white_body">
      <div className="company_details_tab">
        <div className="tab_items">
          <Button disableElevation variant="contained" sx={{ bgcolor: "#2DA2FB" }} className="f-13">Company Details</Button>
        </div>
        <div className="row my-5">
          <div className="col-md-6">
            
                <TextField
                  required
                  name="C_cName"
                  size="small"
                  label="Company Name"
                  fullWidth
                  value={handleClientForm.C_cName}
                  onChange={(e) => { handleClientForm(e) }}
                  error={!!errors.C_cName}
                  helperText={errors.C_cName ? REQUIRED_ERROR.C_cName : ""}
                />
              
            
          </div>
          <div className="col-md-6">
            <div className="flex_input">
              
                  <TextField
                    size="small"
                    name="C_cin"
                    value={handleClientForm.C_cin}
                    onChange={(e) => handleClientForm(e)}
                    label="CIN Number"
                    fullWidth
                  />
                
              
              
                  <TextField
                    name="C_rupeesIn"
                    size="small"
                    required
                    value={clientForm.C_rupeesIn}
                    onChange={(e) => handleClientForm(e)}
                    label="Rupees in"
                    fullWidth
                    error={!!errors.C_rupeesIn}
                    helperText={errors.C_rupeesIn ? REQUIRED_ERROR.C_rupeesIn : ""}
                  />
                
            </div>
          </div>
          <div className="col-md-6 my-5">
                <TextField
                  value={clientForm?.C_address}
                  name="C_address"
                  size="small"
                  required
                  onChange={(e) => handleClientForm(e)}
                  label="Address"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.C_address}
                  helperText={errors.C_address ? REQUIRED_ERROR.C_address : ""}
                />
             
          </div>
        </div>
      </div>

      <div className="signatory_details_tab">
        <div className="tab_items">
          <Button disableElevation variant="contained" sx={{ bgcolor: "#2DA2FB" }} className="f-13">Signatory Details</Button>
        </div>
        <div className="row my-5">
          <div className="col-md-6">
            <div className="flex_input">
                  <TextField
                    value={clientForm.S_sn1}
                    required
                    size="small"
                    name="S_sn1"
                    onChange={(e) => handleClientForm(e)}
                    label="Signatory Name-1"
                    fullWidth
                    error={!!errors.S_sn1}
                    helperText={errors.S_sn1 ? REQUIRED_ERROR.S_sn1 : ""}
                  />
                  <TextField
                    value={clientForm.S_dn1}  
                    name="S_dn1"
                    size="small"
                    required
                    onChange={(e) => handleClientForm(e)}
                    label="Designation-1"
                    fullWidth
                    error={!!errors.S_dn1}
                    helperText={errors.S_dn1 ? REQUIRED_ERROR.S_dn1 : ""}
                  />
            </div>
          </div>
          <div className="col-md-6">
            <div className="flex_input">
                  <TextField
                    value={clientForm.S_sn2}
                    required
                    size="small"
                    name="S_sn2"
                    onChange={(e) => handleClientForm(e)}
                    label="Signatory Name-2"
                    fullWidth
                    error={!!errors.S_sn2}
                    helperText={errors.S_sn2 ? REQUIRED_ERROR.S_sn2 : ""}
                  />
                

                  <TextField
                    value={clientForm.S_dn2}
                    required
                    size="small"
                    name="S_dn2"
                    onChange={(e) => handleClientForm(e)}
                    label="Designation-2"
                    fullWidth
                    error={!!errors.S_dn2}
                    helperText={errors.S_dn2 ? REQUIRED_ERROR.S_dn2 : ""}
                  />
            </div>
          </div>
          <div className="col-md-6 my-5">
            <div className="flex_input">
                  <TextField
                    value={clientForm.S_sn3}
                    required
                    size="small"
                    name="S_sn3"
                    onChange={(e) => handleClientForm(e)}
                    label="Signatory Name-3"
                    fullWidth
                  />
                  <TextField
                    value={clientForm.S_dn3}
                    size="small"
                    name="S_dn3"
                    onChange={(e) => handleClientForm(e)}
                    label="Designation-3"
                    fullWidth
                  />
           
            </div>
          </div>
        </div>
      </div>

      <div className="auditor_details_tab">
        <div className="tab_items">
          <Button disableElevation variant="contained" sx={{ bgcolor: "#2DA2FB" }} className="f-13">Auditor Details</Button>
        </div>
        <div className="row my-5">
          <div className="col-md-4">
                <TextField
                  value={clientForm.A_firmName}
                  required
                  size="small"
                  name="A_firmName"
                  onChange={(e) => handleClientForm(e)}
                  label="Firm Name"
                  fullWidth
                  error={!!errors.A_firmName}
                  helperText={errors.A_firmName ? REQUIRED_ERROR.A_firmName : ""}
                />  
          </div>
          <div className="col-md-4">
                <TextField
                  value={clientForm.A_auditorName}
                  required
                  size="small"
                  name="A_auditorName"
                  onChange={(e) => handleClientForm(e)}
                  label="Auditor Name"
                  fullWidth
                  error={!!errors.A_auditorName}
                  helperText={errors.A_auditorName ? REQUIRED_ERROR.A_auditorName : ""}
                />
          </div>
          <div className="col-md-4">
                <TextField
                  value={handleClientForm.A_designation}
                  required
                  size="small"
                  name="A_designation"
                  onChange={(e) => handleClientForm(e)}
                  label="Designation"
                  fullWidth
                  error={!!errors.A_designation}
                  helperText={errors.A_designation ? REQUIRED_ERROR.A_designation : ""}
                />
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-3">
                <TextField
                  value={clientForm.A_firmRegNo}
                  required
                  size="small"
                  name="A_firmRegNo"
                  onChange={(e) => handleClientForm(e)}
                  label="Firm Regn No"
                  fullWidth
                  error={!!errors.A_firmRegNo}
                  helperText={errors.A_firmRegNo ? REQUIRED_ERROR.A_firmRegNo : ""}
                />
          </div>
          <div className="col-md-3">
                <TextField
                  value={clientForm.A_membershipNo}
                  required
                  name="A_membershipNo"
                  onChange={(e) => handleClientForm(e)}
                  size="small"
                  label="Membership No"
                  type="number"
                  fullWidth
                  error={!!errors.A_membershipNo}
                  helperText={errors.A_membershipNo ? REQUIRED_ERROR.A_membershipNo : ""}
                />
          </div>
          <div className="col-md-3">
                <TextField
                  value={clientForm.A_dateSigning}
                  required
                  size="small"
                  name="A_dateSigning"
                  onChange={(e) => handleClientForm(e)}
                  label="Date of Signing"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.A_dateSigning}
                  helperText={errors.A_dateSigning ? REQUIRED_ERROR.A_dateSigning : ""}
                />
          </div>
          <div className="col-md-3">
                <TextField
                  value={clientForm.A_UDIN}
                  required
                  size="small"
                  name="A_UDIN"
                  onChange={(e) => handleClientForm(e)}
                  label="UDIN"
                  fullWidth
                  error={!!errors.A_UDIN}
                  helperText={errors.A_UDIN ? REQUIRED_ERROR.A_UDIN : ""}
                />
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-3">
                <TextField
                  value={clientForm.A_placeSigning}
                  required
                  size="small"
                  name="A_placeSigning"
                  onChange={(e) => handleClientForm(e)}
                  label="Place of Signing"
                  fullWidth
                  error={!!errors.A_placeSigning}
                  helperText={errors.A_placeSigning ? REQUIRED_ERROR.A_placeSigning : ""}
                />  
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetails