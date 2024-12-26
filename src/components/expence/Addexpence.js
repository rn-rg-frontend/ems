'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function Addexpence({setAddExpence}) {
  const [newRecords, setnewRecords] = useState([])
  const [record,setRecord] = useState({
    date:'',
    reason:'',
    amount:0
  })
  const addMore = () => {
    setnewRecords(prev => [...prev,record])
    setRecord({
      date:'',
      reason:'',
      amount:0
    })
  }
  return (
    <div>
      <form className=''>
        <h1 className='text-xl m-auto font-bold text-center mb-2 pb-2 border-b-2'>Add Expence</h1>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center w-4/5 gap-2'>
            <div className='flex flex-col w-1/3'>
              <p>Date</p>
              <Input type='date' value={record.date} onChange={(e)=> setRecord(prev => ({...prev,date:e.target.value}))} className='border border-black' />
            </div>
            <div className='flex flex-col w-1/3'>
              <p>Expence Reason </p>
              <Input type='text' value={record.reason} onChange={(e)=> setRecord(prev => ({...prev,reason:e.target.value}))} className='border border-black' />
            </div>
            <div className='flex flex-col w-1/3'>
              <p>Amount</p>
              <Input type='number' value={record.amount} onChange={(e)=> setRecord(prev => ({...prev,amount:e.target.value}))} className='border border-black' />
            </div>
            <div className='mt-2 w-1/3 flex justify-around'>
              <Button type='button' className='border-rgtheme' onClick={addMore}>
                Add more
              </Button>
              <Button type='button' onClick={() => setAddExpence(false)} >
                Submit
              </Button>
            </div>
          </div>
          <div className='flex w-1/2 flex-col gap-2 mt-2'>
          {newRecords.map((v,key) => <div key={key} className='flex justify-around  border border-black rounded p-2'>
              <p>{v.date}</p>
              <p>{v.reason}</p>
              <p>{v.amount}</p>
            </div>)}
          </div>
          
        </div>
      </form>
    </div>
  )
}

export default Addexpence