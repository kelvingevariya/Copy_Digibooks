import React,{ useEffect,useState } from "react"
import { fetchFYYears,getCompanysDetails } from "../../../Utils/API_Axios"
import { toast } from "react-toastify"
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  
} from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import SearchIcon from "@mui/icons-material/Search"

const SelectClient = ({
  clientForm,
  handleClientForm,
  REQUIRED_ERROR,
  setClientForm,
  setValues,getValues
}) => {
  const [fyYears,setFyYears] = useState([])
  const [companiesList,setCompaniesList] = useState([])
  const [searchQuery,setSearchQuery] = useState("")

  
  
  const filteredCompanies = companiesList?.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  

  useEffect(() => {
    fetchFY()
    fetchCompanies()
  },[searchQuery])
  

  const fetchFY = async () => {
    const response = await fetchFYYears()
    
    if (response?.data?.errorStatus === 200) {
      setFyYears(response?.data?.fylist)
      
    } else if (response?.data?.errorStatus === 401) {
      toast.error(`Error: ${response?.data?.error}`)
      
    } else {
      toast.error(`There is some issue on ledgers not found.`)
      
    }
  }
  

  const fetchCompanies = async () => {
    const user_id = JSON.parse(localStorage.getItem("userDetails"))._id
    const response = await getCompanysDetails({ user_id })
    if (response?.data?.errorStatus === 200) {
      setCompaniesList(response?.data?.companies)
      
    } else if (response?.data?.errorStatus === 401) {
      toast.error(`Error: ${response?.data?.error}`)
     
    } else {
      toast.error(`There is some issue on ledgers not found.`)
      
    }
  }
  

  const setcompanyName = (id) => {

    handleClientForm({ target: { name: "CompanyID",value: id } })
  }
  const val = getValues()
  console.log(val)
  console.log(clientForm)
  return (
    <div className="white_body">
    <div className="row">
      <div className="col-md-4">
          <TextField
            label="Search companies..."
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
    </div>

    <div className="col-md-2">
              <FormControl size="small" fullWidth error={!!REQUIRED_ERROR.SL_year}>
                <InputLabel>FY Year</InputLabel>
                <Select
                  name="SL_year"
                  label="FY Year"
                  onChange={(e) => {
                    handleClientForm(e)
                  }}
                >
                  <MenuItem value="">
                    <em>Select FY</em>
                  </MenuItem>
                  {fyYears.map((item,index) => (
                    <MenuItem value={item._id} key={index}>
                      {item.year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
        </div>
      </div>

      <div className="my-3 opacity-50 f-13">
        
          <>
            <CheckCircleIcon color="success" /> Selected: Tally Backup of{" "}
            {companiesList.find((item) => item._id === clientForm.CompanyID)?.name ||
              ""}
          </>
      
       </div>

       <div className="client_list">
        <label className="form-label f-13 font-bold" htmlFor="search_company">
          Please Select the Tally Backup Below
        </label>
        <div>
          {filteredCompanies?.map((company,index) => (
            <>
            <div
              className={`col-md-5 my-2 mx-2 text-left  cursor-pointer ${
                clientForm.CompanyID === company._id ? "_selected" : ""
              }`}
              key={company._id}
              onClick={() => {setcompanyName(company._id)}}
            >
              <p>
                <span><img src='/images/dashboard_img/folder.svg' className="folder_svg" /> &nbsp;&nbsp; {++index}.  </span>
                {company.name}
              </p>
            </div>
          </>
          ))}
        </div>
      </div>
    </div>
  )

}
export default SelectClient