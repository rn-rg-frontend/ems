'use client'

import { createContext, useContext, useState } from "react";
import React from "react";

const EmployeeContext = createContext();

export const useProvider = () => useContext(EmployeeContext);

function EmployeeProvider({ children }) {
  console.log(children); 

  const [selectedEmployee, setSelectedEmployee] = useState();
  const [employeeId, setEmployeeId] = useState(); 

  return (
    <EmployeeContext.Provider value={{ selectedEmployee, setSelectedEmployee, employeeId, setEmployeeId }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;
