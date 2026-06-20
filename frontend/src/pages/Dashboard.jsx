import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'
import FlagCard from '../components/FlagCard'
import TransactionList from '../components/TransactionList'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import VendorList from '../components/VendorList'
import EmptyState from '../components/EmptyState'
import StatCard from '../components/StatCard'
import TransactionRow from '../components/TransactionRow'
import RiskPill from '../components/RiskPill'

function formatDate(dt){
  const d = new Date(dt)
  return d.toISOString().slice(0,10)
}

export default function Dashboard(){
  const { businessId } = useParams()
  const [business, setBusiness] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [flags, setFlags] = useState([])
  const [vendorAddr, setVendorAddr] = useState('')

  useEffect(()=>{
    API.get('/api/businesses/').then(r=>{
      const found = r.data.find(b=>String(b.id) === String(businessId))
      setBusiness(found)
    }).catch(()=>setBusiness(null))

    API.get('/api/treasury/transactions/', { params: { business_id: businessId } })
      .then(r=> setTransactions(r.data.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp))))
      .catch(()=> setTransactions([]))

    API.get('/api/risk/flags/', { params: { business_id: businessId } })
      .then(r=> setFlags(r.data))
      .catch(()=> setFlags([]))
  },[businessId])

  const topFlags = flags.filter(f=>!f.reviewed).slice(0,5)

  const handleApprove = async (flag) => {
    // optimistic update: mark reviewed locally and attempt backend PATCH
    setFlags(prev => prev.map(f => f.id === flag.id ? {...f, reviewed: true} : f))
    try{
      await API.patch(`/api/risk/flags/${flag.id}/`, { reviewed: true, action: 'approve' })
    }catch(e){
      // ignore network errors, keep optimistic state
      console.warn('approve failed', e)
    }
  }

  const handleMark = async (flag) => {
    setFlags(prev => prev.map(f => f.id === flag.id ? {...f, reviewed: true} : f))
    try{
      await API.patch(`/api/risk/flags/${flag.id}/`, { reviewed: true, action: 'suspicious' })
    }catch(e){
      console.warn('mark failed', e)
    }
  }

  const handleVendorAdd = async (e) =>{
    e.preventDefault()
    try{
      await API.post('/api/treasury/vendors/', { business: businessId, address: vendorAddr })
      setVendorAddr('')
      alert('Vendor add request sent')
    }catch(err){
      alert('Failed to add vendor')
    }
  }

  // build 30-day outflow data
  const days = {}
  for(let i=29;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i); const k = d.toISOString().slice(0,10); days[k]=0
  }
  transactions.forEach(t=>{
    const day = formatDate(t.timestamp)
    // treat all transactions as outflow for chart
    if(days[day] !== undefined) days[day] += Number(t.amount || 0)/1e18
  })
  const chartData = Object.keys(days).map(k=>({date:k, outflow: days[k]}))

  // seeded placeholder data to match exact design
  const stats = [
    { label: 'USDC Balance', value: '12,458.74', sub: 'Ksh 1,865,310' },
    { label: 'Transactions Today', value: '24', sub: 'Settled on-chain' },
    { label: 'Flagged Today', value: '2', sub: 'Needs your review', alert: true },
    { label: 'Vendors', value: '18', sub: 'On your allowlist' },
  ]

  const seededTx = [
    { id:1, time: '11:42 PM', to: '0x4a9f...c12b', sub: 'New address', amount: '1,200.00', kes: '180,000', status: 'Flagged' },
    { id:2, time: '10:17 AM', to: 'BlueStar Supplies', sub: 'Office supplies', amount: '320.00', kes: '48,000', status: 'Settled' },
    { id:3, time: '09:02 AM', to: 'Payroll - June', sub: 'Staff payroll', amount: '4,800.00', kes: '720,000', status: 'Settled' },
    { id:4, time: '04:33 AM', to: 'Rent - Westlands', sub: 'Monthly rent', amount: '2,000.00', kes: '300,000', status: 'Settled' },
    { id:5, time: '02:11 AM', to: '0x91aa...d33e', sub: 'Not on allowlist', amount: '950.00', kes: '142,500', status: 'Flagged' },
  ]

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Good morning, Wanjiku 👋</h1>
        <div className="text-sm text-gray-500">Here's what's happening with Acacia Supplies today.</div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s,i)=> <StatCard key={i} icon={i===2? '⚠':'•'} label={s.label} value={s.value} sub={s.sub} alert={s.alert} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="font-semibold">Live Transaction Feed</div>
                <div className="text-xs text-gray-400 ml-2">Real-time</div>
              </div>
              <a className="text-sm text-indigo-600">View all</a>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              {seededTx.map(t=> <TransactionRow key={t.id} t={t} />)}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold">Risk Monitor</div>
                  <div className="text-xs text-gray-400">(Real-time Rules)</div>
                </div>
                <a className="text-sm text-indigo-600">Manage rules</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Large single payouts</div>
                  <div className="text-xs text-gray-500">Transfers above your usual threshold</div>
                  <div className="mt-2 text-sm">Threshold: 1,000 USDC</div>
                  <div className="text-xs text-gray-400">Triggered today: 1</div>
                  <a className="text-xs text-indigo-600">View triggered</a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Structuring (smurfing)</div>
                  <div className="text-xs text-gray-500">Multiple transfers just under a round number in one day</div>
                  <div className="mt-2 text-sm">Threshold: 950 USDC</div>
                  <div className="text-xs text-gray-400">Triggered today: 1</div>
                  <a className="text-xs text-indigo-600">View triggered</a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Off-allowlist transfers</div>
                  <div className="text-xs text-gray-500">Transfers to addresses not on your allowlist</div>
                  <div className="mt-2 text-sm">Triggered today: 1</div>
                  <a className="text-xs text-indigo-600">View triggered</a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="text-red-600 font-semibold">Risk Explanation</div>
              <div className="mt-2 font-bold">Off-allowlist transfer</div>
              <div className="text-sm text-gray-700 mt-3">You sent 1,200 USDC (Ksh 180,000) to a new address last night at 11:42 PM that isn't on your approved vendor list. This could be a supplier payment, a refund, or something unexpected. Please confirm.</div>

              <div className="mt-3 bg-gray-50 p-3 rounded">
                <div className="text-xs">Transaction: <a className="text-indigo-600">0x4a9f...c12b</a></div>
                <div className="text-xs">Time: 11:42 PM</div>
                <div className="text-xs">Amount: 1,200 USDC</div>
                <div className="text-xs">Rule: <RiskPill level="high">Off-allowlist</RiskPill></div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded">Approve as legitimate</button>
                <button className="border border-red-600 text-red-600 px-4 py-2 rounded">Mark as suspicious</button>
              </div>

              <div className="mt-2 text-sm"><a className="text-indigo-600">View on Avalanche Explorer</a></div>
            </div>

            <VendorList businessId={businessId} />
          </div>
        </div>
      </div>
    </div>
  )
}
