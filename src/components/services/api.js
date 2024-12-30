import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL

export const getUserList = async (token) => {
    try {
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
export const getUserData = async (token) => {
    try {
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