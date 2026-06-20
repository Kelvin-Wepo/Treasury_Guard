import React from 'react'
import EmptyState from '../components/EmptyState'

export default function Approvals(){
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Approvals</h2>
        <div className="text-sm text-muted">Approve or reject pending payouts and vendor payments.</div>
      </div>

      <div className="card p-6">
        <div className="font-semibold mb-3">Pending approvals</div>
        <EmptyState title="No pending approvals" subtitle="All recent payouts have been approved or reviewed." />
      </div>
    </div>
  )
}
