import React, { useEffect, useState } from 'react'
import VendorList from '../components/VendorList'
import EmptyState from '../components/EmptyState'

export default function Vendors(){
  const [hasVendors, setHasVendors] = useState(true)

  useEffect(()=>{
    // dummy check; VendorList fetch will populate real data
  },[])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Vendors</h2>
        <div className="text-sm text-muted">Manage your approved vendors and add new trusted payees.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-4">
          <div className="font-semibold mb-3">Approved Vendors</div>
          <VendorList />
        </div>

        <aside className="card p-4">
          <div className="font-semibold mb-2">Add vendor</div>
          <p className="text-sm text-muted mb-3">Add a new vendor address to your allowlist to reduce false positives.</p>
          <form onSubmit={(e)=>e.preventDefault()} className="space-y-3">
            <input className="w-full p-2 border rounded" placeholder="0x... or vendor name" />
            <button className="w-full bg-brand text-white py-2 rounded">Add vendor</button>
          </form>
        </aside>
      </div>
    </div>
  )
}
