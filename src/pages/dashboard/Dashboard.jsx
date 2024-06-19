import React from 'react'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'

const Dashboard = () => {
  return (
    <div className='dashboard_main'>
      {/* Dashboard Page (Only Access if you are login.)
      <button onClick={()=>localStorage.removeItem("userToken")}>Logout</button> */}



    <Sidebar className="sidebar" />
      <main className='main_content'>
       <TopHeader />
      </main>


    </div>
  )
}

export default Dashboard
