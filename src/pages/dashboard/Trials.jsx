import React, { useState } from "react";
import Tagged from "./trial/Tagged";
import Untagged from "./trial/Untagged";
import AllTrail from "./trial/AllTrail";


const Trials = ({companyID}) => {
  const [currentTab, setCurrentTab] = useState(1);

  const changeCurrentTab = (id) => {
    setCurrentTab(id);
  };

  return (
    <>
      {/* <TopHeader /> */}
      <div className="tab_items">
        <button
          className={currentTab == "1" ? "tabactive" : ""}
          onClick={() => changeCurrentTab(1)}
          style={{fontWeight: 500}}
        >
          Un-Tagged
        </button>
        <button
          className={currentTab == "2" ? "tabactive" : ""}
          onClick={() => changeCurrentTab(2)}
          style={{fontWeight: 500}}
        >
          Tagged
        </button>
        <button
          className={currentTab == "3" ? "tabactive" : ""}
          onClick={() => changeCurrentTab(3)}
          style={{fontWeight: 500}}
        >
          All
        </button>
      </div>

      {/* ledges */}
      <div
        className={`tab_data ${currentTab == "1" ? "active" : ""}`}
        style={{
          display: currentTab == "1" ? "block" : "none",
          margin: "20px 0",
        }}
      >
        <Untagged companyID={companyID} currentTab={currentTab} />
      </div>

      {/* masters */}
      <div
        className={`tab_data ${currentTab == "2" ? "active" : ""}`}
        style={{
          display: currentTab == "2" ? "block" : "none",
          margin: "20px 0",
        }}
      >
        <Tagged companyID={companyID} currentTab={currentTab} />
      </div>

      {/* items */}
      <div
        className={`tab_data ${currentTab == "3" ? "active" : ""}`}
        style={{
          display: currentTab == "3" ? "block" : "none",
          margin: "20px 0",
        }}
      >
        <AllTrail companyID={companyID}  currentTab={currentTab}/>
      </div>
    </>
  );
};

export default Trials;
