import React from 'react'

export default function Settings(){
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <div className="text-sm text-muted">Configure integrations, webhooks, and team access.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-4">
          <div className="font-semibold mb-2">Integrations</div>
          <div className="text-sm text-muted mb-3">Connect wallets, explorers and third-party services.</div>
          <button className="bg-brand text-white px-3 py-2 rounded">Manage integrations</button>
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-2">Team</div>
          <div className="text-sm text-muted mb-3">Invite teammates and set roles.</div>
          <button className="bg-brand text-white px-3 py-2 rounded">Manage team</button>
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-2">Security</div>
          <div className="text-sm text-muted mb-3">2FA, keys, and access controls.</div>
          <button className="bg-brand text-white px-3 py-2 rounded">Security settings</button>
        </div>
      </div>
    </div>
  )
}
