import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

// Components
import Topbar from "./global/topbar";
import Sidebar from "./global/sidebar";
import Login from "./Login/Login.jsx";
import Signup from "./Login/Signup.jsx";

// Pages
import AccountantDashboard from "./scenes/accountant/dashboard";
import Calculate from "./scenes/accountant/payroll/calculate.jsx";
import Maintain from "./scenes/accountant/payroll/maintain.jsx";
import Payslips from "./scenes/accountant/payroll/payslips.jsx";
import Email from "./scenes/accountant/updateinfo/email.jsx";
import Name from "./scenes/accountant/updateinfo/name.jsx";
import Password from "./scenes/accountant/updateinfo/password.jsx";
import Updateinfo from "./scenes/accountant/updateinfo/updateinfo.jsx";

import Apply from "./scenes/candidate/apply/apply.jsx";
import CandidateDashboard from "./scenes/candidate/dashboard/index.jsx";

import ChangeEmailc from "./scenes/candidate/update/email.jsx";
import ChangeNamec from "./scenes/candidate/update/name.jsx";
import ChangePasswordc from "./scenes/candidate/update/password.jsx";

import Updateall from "./scenes/candidate/update/updateinfo.jsx";

import Dashboard from "./scenes/employee/dashboard";
import RequestLeave from "./scenes/employee/requestleave/requestleave";
import Update from "./scenes/employee/updateemployeeinfo/updateinfo.jsx";
import ChangeEmaile from "./scenes/employee/updateemployeeinfo/email.jsx";
import ChangeNamee from "./scenes/employee/updateemployeeinfo/name.jsx";
import ChangePassworde from "./scenes/employee/updateemployeeinfo/password.jsx";


import ManagerDashboard from "./scenes/manager/dashboard";
import Team from "./scenes/manager/team";
import Form from "./scenes/manager/form";
import Requests from "./scenes/manager/invoices";
import Contacts from "./scenes/manager/contacts";
import ReportPage from "./scenes/manager/reports/generate";
import Updateinfom from "./scenes/manager/updateinfo/updateinfo.jsx";

import Emailm from "./scenes/manager/updateinfo/email.jsx";
import ChangeNamem from "./scenes/manager/updateinfo/name.jsx";
import Passwordm from "./scenes/manager/updateinfo/password.jsx";
 

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("role"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, [isAuthenticated]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" height="100vh" width="100%" overflow="hidden">
          {!userRole ? (
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <>
              <Box width="260px" bgcolor={theme.palette.background.alt} flexShrink={0}>
                <Sidebar isSidebar={isSidebar} role={userRole} />
              </Box>
              <Box display="flex" flexDirection="column" flexGrow={1} minWidth={0}>
                <Box p={2} flexShrink={0}>
                  <Topbar setIsSidebar={setIsSidebar} />
                </Box>
                <Box flexGrow={1} overflow="auto" p={3}>
                  <Routes>
                    {userRole === "accountant" && (
                      <>
                        <Route path="/" element={<AccountantDashboard />} />
                        <Route path="/update" element={<Updateinfo />} />
                        
                        <Route path="/update/email" element={<Email />} />
                        <Route path="/update/name" element={<Name />} />
                        <Route path="/update/password" element={<Password />} />
                        
                        <Route path="/payroll/calculate" element={<Calculate />} />
                        <Route path="/payroll/payslips" element={<Payslips />} />
                        <Route path="/payroll/maintain" element={<Maintain />} />
                      </>
                    )}
                    {userRole === "candidate" && (
                      <>
                        <Route path="/" element={<CandidateDashboard />} />
                        <Route path="/apply" element={<Apply />} />
                        <Route path="/update" element={<Updateall />} />
                      
                        <Route path="/update/email" element={<ChangeEmailc />} />
                        <Route path="/update/name" element={<ChangeNamec />} />
                        <Route path="/update/password" element={<ChangePasswordc />} />
                    
                      </>
                    )}
                    {userRole === "employee" && (
                      <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/requestleave" element={<RequestLeave />} />
                        <Route path="/updateemployeeinfo" element={<Update />} />
                        <Route path="/updateemployeeinfo/email" element={<ChangeEmaile />} />
                        <Route path="/updateemployeeinfo/name" element={<ChangeNamee />} />
                        <Route path="/updateemployeeinfo/password" element={<ChangePassworde />} />
                      </>
                    )}
                    {userRole === "manager" && (
                      <>
                        <Route path="/" element={<ManagerDashboard />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/invoices" element={<Requests />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/reports" element={<ReportPage />} />
                        <Route path="/updateinfo" element={<Updateinfom />} />
                        <Route path="/update/email" element={<Emailm />} />
                        <Route path="/update/name" element={<ChangeNamem />} />
                        <Route path="/update/password" element={<Passwordm />} />
                        
                      </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
