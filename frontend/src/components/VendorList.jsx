import React, { useEffect, useState } from 'react'
import API from '../api'

export default function VendorList({ businessId }){
  const [items, setItems] = useState(null)
  const [addr, setAddr] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    // fetch vendor list for the business
    API.get('/api/treasury/vendors/', { params: { business_id: businessId } }).then(r=>{
      if(mounted) setItems(r.data)
    }).catch(()=>{
      if(mounted) setItems([])
    }).finally(()=>{ if(mounted) setLoading(false) })
    return ()=> mounted = false
  },[businessId])

  const add = async (e) =>{
    e.preventDefault()
    if(!addr) return
    try{
      setLoading(true)
      await API.post('/api/treasury/vendors/', { business: businessId, address: addr })
      setAddr('')
      // optimistic: append to list if available
      setItems(prev => prev? [{ id: Date.now(), address: addr, added_at: new Date().toISOString() }, ...prev] : [{ id: Date.now(), address: addr, added_at: new Date().toISOString() }])
      alert('Vendor add requested')
    }catch(err){
      alert('Failed to add vendor')
    }finally{ setLoading(false) }
  }

  if(loading && items === null) return <div className="p-4">Loading vendors…</div>
  if(!items || items.length === 0) return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="text-sm text-gray-600 mb-2">No vendors added yet.</div>
      <form onSubmit={add} className="flex gap-2">
        <input value={addr} onChange={e=>setAddr(e.target.value)} placeholder="0x... vendor address" className="flex-1 border px-3 py-2 rounded" />
        <button disabled={loading} className="px-3 py-2 bg-indigo-600 text-white rounded">Add</button>
      </form>
    </div>
  )

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">Vendors</div>
        <div className="text-xs text-gray-500">{items.length}</div>
      </div>
      <ul className="space-y-2">
        {items.map(v=> (
          <li key={v.id} className="flex items-center justify-between text-sm">
            <div className="truncate text-gray-700">{v.address}</div>
            <div className="text-xs text-gray-400">{new Date(v.added_at || Date.now()).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="mt-4 flex gap-2">
        <input value={addr} onChange={e=>setAddr(e.target.value)} placeholder="0x... vendor address" className="flex-1 border px-3 py-2 rounded" />
        <button disabled={loading} className="px-3 py-2 bg-indigo-600 text-white rounded">Add</button>
      </form>
    </div>
  )
}
