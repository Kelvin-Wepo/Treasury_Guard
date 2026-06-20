import React, { useState, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Transactions from './pages/Transactions'

const Vendors = lazy(()=>import('./pages/Vendors'))
const Rules = lazy(()=>import('./pages/Rules'))
const Approvals = lazy(()=>import('./pages/Approvals'))
const Settings = lazy(()=>import('./pages/Settings'))
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App(){
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header onMenu={() => setSidebarOpen(true)} />

        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/dashboard/:businessId" element={<Dashboard/>} />
              <Route path="/transactions" element={<Transactions/>} />
              <Route path="/vendors" element={<Suspense fallback={<div>Loading...</div>}><Vendors/></Suspense>} />
              <Route path="/rules" element={<Suspense fallback={<div>Loading...</div>}><Rules/></Suspense>} />
              <Route path="/approvals" element={<Suspense fallback={<div>Loading...</div>}><Approvals/></Suspense>} />
              <Route path="/settings" element={<Suspense fallback={<div>Loading...</div>}><Settings/></Suspense>} />
              <Route path="/portfolio" element={<Portfolio/>} />
              <Route path="/" element={<Navigate to="/portfolio" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
