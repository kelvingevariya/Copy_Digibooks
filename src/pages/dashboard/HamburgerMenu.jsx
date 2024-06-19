import React, { useState } from "react";
import { PUBLIC_URL } from "../../App";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="hamburger">
      <Hamburger
        className=""
        toggled={isOpen}
        toggle={() => setOpen(!isOpen)}
      />
     

      {isOpen && (
        <nav className="dashboard_sidebar_nav">
          <NavLink className="navLink" to="/dashboard">
            <div className="dashboard_sidebar_menu_item">
              <img src={`${PUBLIC_URL}/images/dashboard_img/home.png`} />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink className="navLink" to="/masters">
            <div className="dashboard_sidebar_menu_item">
              <img src={`${PUBLIC_URL}/images/dashboard_img/books.png`} />
              <p>Masters</p>
            </div>
          </NavLink>
          <NavLink className="navLink" to="/trials">
            <div className="dashboard_sidebar_menu_item">
              <img src={`${PUBLIC_URL}/images/dashboard_img/trail.png`} />
              <p>Trial Balance</p>
            </div>
          </NavLink>
          <NavLink className="navLink" to="/financials">
            <div className="dashboard_sidebar_menu_item">
              <img src={`${PUBLIC_URL}/images/dashboard_img/whiteDoc.svg`} />
              <p>Financials</p>
            </div>
          </NavLink>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;