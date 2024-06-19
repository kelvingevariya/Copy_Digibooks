import React,{useState} from "react";
import { PUBLIC_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const TopHeader = () => {

const [search, setSearch] = useState("")
const navigate = useNavigate();

const userInfo = JSON.parse(localStorage.getItem('userDetails'));
console.log('userInfo',userInfo)
{/* <img src={`${PUBLIC_URL}/images/dashboard_img/Profile.png`} /> */}

  return (
    <header className="top_header">
      <div className="welcome_text">
        <h2>{userInfo.firmname} </h2>
        <p>
         (Welcome Back Mr.{userInfo.fname}
          <img src={`${PUBLIC_URL}/images/dashboard_img/wave.png`} />)
        </p>
      </div>
      <div className="install_plugin">
        {/* <img src={`${PUBLIC_URL}/images/dashboard_img/Plug.png`} /> */}
        <p>Install Tally Pluger</p>
      </div>
      <div>
        <TextField
          type="search"
          variant="outlined"
          size="small"
          placeholder={'Search'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="profile_icon">
        <Button className="logout_btn"
        onClick={()=>{
          localStorage.removeItem('userDetails');
          localStorage.removeItem('userToken');
          toast.success(
            `Logout Successfull,now redirecting to login page!!`,
            {
              onClose: () => {
                navigate("/");
              },
            }
          );
          }}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopHeader;
