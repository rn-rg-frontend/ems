'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { getExpenseType } from '../services/api'
import { useSession } from 'next-auth/react'
import { addExpense } from '../services/api'
import { toast } from 'react-toastify'

function Addexpence({ setAddExpence }) {
  const { data: session } = useSession();
  const [newRecords, setnewRecords] = useState([])
  const [record, setRecord] = useState({
    date: '',
    reason: '',
    amount: 0,
    typeOfExpenseId: ''
  })
  const addMore = () => {
    setnewRecords(prev => [...prev, record])
    setRecord({
      date: '',
      reason: '',
      amount: 0,
      typeOfExpenseId: ''
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const data = {
        date: record.date,
        reason: record.reason,
        amount: record.amount,
        typeOfExpenseId: record.typeOfExpenseId,
        account: session?.user?.id
      }
      console.log(data)
      const response = await addExpense(session?.user?.accessToken, data);
      console.log(response);
      toast.success("Expense Added succesfully")
    } catch (error) {
      console.log(error);
      toast.error(error || "Unable to add expense")
    }
  }
  const [accountType, setAccountType] = useState([])

  const fatchExpenseType = async (token) => {
    try {
      const response = await getExpenseType(token);
      setAccountType(response);
    } catch (error) {
      console.log("Unable to get acount types")
    }
  }

  useEffect(() => {
    if (session?.user?.accessToken) {
      fatchExpenseType(session?.user?.accessToken)
    }
  }, [session])

  return (
    <div>
      <form className=''  onSubmit={handleSubmit}>
        <h1 className='text-xl m-auto font-bold text-center mb-2 pb-2 border-b-2'>Add Expence</h1>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center w-4/5 gap-2'>
            <div className='flex flex-col w-1/3'>
              <p>Date</p>
              <Input type='date' value={record.date} onChange={(e) => setRecord(prev => ({ ...prev, date: e.target.value }))} className='border border-black' />
            </div>
            <div className='flex flex-col w-1/3'>
              <p>Expence Reason </p>
              <Input type='text' value={record.reason} onChange={(e) => setRecord(prev => ({ ...prev, reason: e.target.value }))} className='border border-black' />
            </div>
            <div className='flex flex-col w-1/3'>
              <p>Amount</p>
              <Input min='0' type='number' value={record.amount} onChange={(e) => setRecord(prev => ({ ...prev, amount: Number(e.target.value) }))} className='border border-black' />
            </div>
            <div className='flex flex-col w-1/3'>
              <p>Account Type</p>
              {accountType && accountType.length > 0 ? (
                <select
                  value={record.typeOfExpenseId}
                  onChange={(e) => setRecord(prev => ({ ...prev, typeOfExpenseId: Number(e.target.value)  }))}
                  className='border border-black p-2 rounded-sm'
                >
                  {accountType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              ) : (
                <option>Loading...</option>
              )}
            </div>


            <div className='mt-2 w-1/3 flex justify-around'>
              <Button type='button' className='border-rgtheme' onClick={addMore}>
                Add more
              </Button>
              <Button type='submit'>
                Submit
              </Button>
            </div>
          </div>
          <div className='flex w-1/2 flex-col gap-2 mt-2'>
            {newRecords.map((v, key) => <div key={key} className='flex justify-around  border border-black rounded p-2'>
              <p>{v.date}</p>
              <p>{v.reason}</p>
              <p>{v.amount}</p>
              <p>{v.typeOfExpenseId}</p>
            </div>)}
          </div>

        </div>
      </form>
    </div>
  )
}

export default Addexpence