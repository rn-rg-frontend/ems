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
        const response = await axios.patch(`${api_url}/api/leaveManagement/${id}`,data, {
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

export const addEmployees = async (token, data) => {
    try {
        const response = await axios.post(`${api_url}/api/addEmployee`, data, {
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
            
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : "Unable to add employee")
    }
}
