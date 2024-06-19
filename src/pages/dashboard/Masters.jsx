import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import LedgerList from "./ledger/LedgerList";

const Masters = () => {
  const [currentTab, setCurrentTab] = useState(1);

  const changeCurrentTab = (id) => {
    setCurrentTab(id);
  };

  return (
    <div className="dashboard_main">
      {/* Dashboard Page (Only Access if you are login.)
      <button onClick={()=>localStorage.removeItem("userToken")}>Logout</button> */}

      <Sidebar />
      <main className="main_content">
        <TopHeader />

        <div className="tab_items">
          <button
            className={currentTab == "1" ? "active" : ""}
            onClick={() => changeCurrentTab(1)}
          >
            Ledgers
          </button>
          <button
            className={currentTab == "2" ? "active" : ""}
            onClick={() => changeCurrentTab(2)}
          >
            Masters
          </button>
          <button
            className={currentTab == "3" ? "active" : ""}
            onClick={() => changeCurrentTab(3)}
          >
            Items
          </button>
        </div>

        {/* ledges */}
        <div
          className={`tab_data ${currentTab == "1" ? "active" : ""}`}
          style={{ display: currentTab == "1" ? "block" : "none", margin:'20px 0' }}
        >
          <LedgerList />
        </div>

        {/* masters */}
        <div
          className={`tab_data ${currentTab == "2" ? "active" : ""}`}
          style={{ display: currentTab == "2" ? "block" : "none", margin:'20px 0' }}
        >
          Show Master
        </div>

        {/* items */}
        <div
          className={`tab_data ${currentTab == "3" ? "active" : ""}`}
          style={{ display: currentTab == "3" ? "block" : "none", margin:'20px 0' }}
        >
          Show Items
        </div>
      </main>
    </div>
  );
};

export default Masters;
