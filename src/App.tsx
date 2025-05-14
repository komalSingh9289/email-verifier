import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';


const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardLayout user = {user} >
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
