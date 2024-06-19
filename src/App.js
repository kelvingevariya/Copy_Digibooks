
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import VerifyToken from "./pages/auth/VerifyToken";
import Register from "./pages/auth/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Masters from "./pages/dashboard/Masters";
import Trials from "./pages/dashboard/Trials";
import Financials from "./pages/dashboard/financials/Financials";
import ForgotPass from "./pages/auth/ForgotPass";
import ResetPass from "./pages/auth/ResetPass";



export const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000'


function App() {

  return (
    <>
        
        <ToastContainer autoClose={1000} />
      <Router>
      
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/auth/register" exact element={<Register/>} />
          <Route path="/auth/verfiy-token" exact element={<VerifyToken/>} />
          <Route path="/auth/forgot-pass" exact element={<ForgotPass/>} />
          <Route path="/auth/reset-pass" exact element={<ResetPass/>} />



          {/* protected routes */}
          <Route path="/dashboard" exact element={<ProtectedRoute Component={Dashboard}/>} />
          <Route path="/masters" exact element={<ProtectedRoute Component={Masters}/>} />
          <Route path="/trials" exact element={<ProtectedRoute Component={Trials}/>} />
          <Route path="/financials" exact element={<ProtectedRoute Component={Financials}/>} />



        </Routes>
    
      </Router>
    </>
  );
}

export default App;
