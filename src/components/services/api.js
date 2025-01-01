import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL

export const getUserList = async (token) => {
    try {
        console.log(token)
        const response = await axios.get(`${api_url}/api/employeeList`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }
};
export const getUserData = async (token, id) => {
    try {
        const response = await axios.get(`${api_url}/api/employeeList${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }
};

export const getLeaveRequest = async (token) => {
    try {
        const response = await axios.get(`${api_url}/api/leaveManagement`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch leave request");
    }
}

export const approveRejectLeave = async (token, data, id) => {
    try {
        const response = await axios.patch(`${api_url}/api/leaveManagement/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to approve or reject request");
    }
}
export const approveRejectWfh = async (token, data, id) => {
    try {
        const response = await axios.patch(`${api_url}/api/WFHManagement/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to approve or reject request");
    }
}

export const getWFHRequest = async (token, data) => {
    try {
        const response = await axios.get(`${api_url}/api/WFHManagement`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed fatch wfh list");
    }
}

export const getExpense = async (token) => {
    try {
        console.log(token)
        const response = await axios.get(`${api_url}/api/expense`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed fatch expense list");
    }
}

export const getExpenseType = async (token) => {
    try {
        console.log(token)
        const response = await axios.get(`${api_url}/api/expenseType`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed fatch expense type")
    }
};

export const addExpense = async (token, data) => {
    try {
        const response = await axios.post(`${api_url}/api/expense`,data,  {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to add expense")
    }
}

export const getSalary = async (token) => {
    try {
        const response = await axios.get(`${api_url}/api/salary`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to get salary")       
    }
}

export const getSalaryHistory = async (token, id) => {
    try {
        const response = await axios.get(`${api_url}/api/salaryHistory/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to get salary history")       
    }
}

export const addEmployees = async (token, data) => {
    try {
        const response = await axios.post(`${api_url}/api/addEmployee`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }

        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Unable to add employee")
    }
}

export const getCV = async (token,id) => {
    try {
        const response = await axios.get(`${api_url}/api/cv/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.headers.get('Content-Type'))
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }
}

export const getLeavesData =async (token,id) => {
    console.log("id:",id)
    console.log("token:",token )
    try {
        const response = await axios.get(`${api_url}/api/leaveManagement/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }

}
export const getWFHData =async (token,id) => {
    console.log("id:",id)
    console.log("token:",token )
    try {
        const response = await axios.get(`${api_url}/api/WFHManagement/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }

}

export const getEmployeeProfile =async (token,id) => {
    console.log(token)
    try {
        const response = await axios.get(`${api_url}/api/employeeList/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }

}

export const uploadCv = async (token,id,data) => {
    try {
        const response = await axios.post(`${api_url}/api/cv/${id}`,data, {
            headers: {
                
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }

}
export const postAnnouncement =async (token,data) =>{
    console.log(token)
    try {
        const response = await axios.post(`${api_url}/api/annocements`,data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return {sussess:true};
    } catch (error) {
        console.log("error" ,error)
    }
}

export const getAnnouncement =async (token) => {
    try {
        const response = await axios.get(`${api_url}/api/annocements`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(data)
    }
}

export const postLeavesData =async (token,data) => {

    console.log("token:",token )
    try {
        const response = await axios.post(`${api_url}/api/leaveManagement/`,data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }

}

export const postWfhdata =async (token,data) => {

    console.log("token:",token )
    try {
        const response = await axios.post(`${api_url}/api/WFHManagement/`,data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }

}

export const postEmployee = async (token, data) => {
    try {
        const response = await axios.post(`${api_url}/api/addEmployee`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Failed to fetch users list");
    }
}

export const editUser = async (token,id, data) => {
    try {
        const response = await axios.patch(`${api_url}/api/addEmployee/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response : "Failed to edit user");
    }
}