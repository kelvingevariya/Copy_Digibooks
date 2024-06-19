import React from "react";
import { PUBLIC_URL } from "../../App";
import { NavLink } from "react-router-dom";
import HamburgerMenu from './HamburgerMenu'


const Sidebar = () => {
 
  return (<>
    <aside className="dashboard_sidebar">
    
      
    
      
 <img src={`${PUBLIC_URL}/images/dashboard_img/slogo.png`} />
      <HamburgerMenu className="hamburger"/>


    {/* <NavLink className='navLink' to='/dashboard' >
        <div className="dashboard_sidebar_menu_item">
          <img src={`${PUBLIC_URL}/images/dashboard_img/home.png`} />
          <p> Home</p>
        </div>
      </NavLink>
      <NavLink className='navLink' to='/masters' >
        <div className="dashboard_sidebar_menu_item">
          <img src={`${PUBLIC_URL}/images/dashboard_img/books.png`} />
          <p> Masters</p>
        </div>
      </NavLink>
      <NavLink className='navLink' to='/trials'  >
        <div className="dashboard_sidebar_menu_item">
          <img src={`${PUBLIC_URL}/images/dashboard_img/trail.png`} />
          <p> Trial Balance</p>
        </div>
      </NavLink> */}
      <NavLink className='navLink' to='/financials'  >
        <div className="dashboard_sidebar_menu_item">
          {/* <img src={`${PUBLIC_URL}/images/dashboard_img/trail.png`} /> */}
          <img src={`${PUBLIC_URL}/images/dashboard_img/whiteDoc.svg`} />
          <p>Financials</p>
      </div>
     </NavLink>
    </aside></>
  );
};

export default Sidebar;
