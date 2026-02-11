import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Login from './components/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from './config'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  // verify admin token with backend (prevents stale/invalid token)
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setVerifying(true);
        await axios.get(backendUrl + '/api/user/verify-admin', {
          headers: { token }
        });
      } catch {
        setToken('');
        toast.error('Session expired. Please login again.');
      } finally {
        setVerifying(false);
      }
    })();
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === ""
      ? <Login setToken={setToken}/>
      :  <>
        <Navbar setToken={setToken} />
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            {verifying ? (
              <p className="text-sm text-gray-500">Verifying session...</p>
            ) : (
            <Routes>
              <Route path="/add" element={<Add token={token}/>} />
              <Route path="/list" element={<List token={token}/>} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="/users" element={<Users token={token} />} />
            </Routes>
            )}
          </div>
        </div>
      </>
  
      }
      </div>
  )
}

export default App
