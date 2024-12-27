'use client'

import { createContext, useContext, useState } from "react"

const EmployeeContext = createContext()

export const useProvider = () =>  useContext(EmployeeContext)

import React from 'react'

function EmployeeProvider({children}) {
    const [selectedEmployee,setSelectedEmployee] = useState() 
  return (
    <EmployeeContext.Provider  value={{selectedEmployee,setSelectedEmployee}}>
        {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeProvider