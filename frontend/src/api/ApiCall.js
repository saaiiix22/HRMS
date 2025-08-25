import Api from "./Api"

// ! LOGIN API
export const loginApi = async (creds) => {
    try {
        const res = await Api.post('/login', {
            employeeCode: creds.userId,
            password: creds.password
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
// ! LOGOUT
export const logoutFunction = async () => {
    try {
        const res = await Api.post('/logout')
        return res
    } catch (error) {
        throw error
    }
}

// ! USER DETAILS - THE USER WHO LOGGED IN
export const specificUserInfo = async (empToken) => {
    try {
        const res = await Api.get('/user', {
            headers: {
                Authorization: `Bearer ${empToken}`
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

// ! EMP EDUCATION DETAILS
export const employeeEducation = async (empToken) => {
    try {
        const res = await Api.get('/education/empeducation', {
            headers: {
                Authorization: `Bearer ${empToken}`
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

// ! UPDATE DETAILS - BASIC
export const updateBasicDetailsAPI = async (obj) => {
    try {
        const res = await Api.put('/updateDetails', obj,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        return res
    } catch (error) {
        throw error
    }
}


// ! UPDATE EDUCATION
export const updatedEducation = async (data) => {
    try {
        const res = await Api.post('/education/addEducation', { empEduArr: data }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res;
    } catch (error) {
        throw error;
    }
};


// ! ADDRESS SHOWING
export const getAddress = async () => {
    try {
        const res = await Api.get('/address/seeaddress', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    } catch (error) {
        throw error
    }
}

// ! DYNAMIC MENU
export const dynamicMenu=async() =>{
    try {
        const res = await Api.get()
    } catch (error) {
        
    }
}
// ! BIRTHDAY
export const eventAtOffice =async()=>{
    try {
        const res = await Api.get('/officeEvent')
        return res
    } catch (error) {
        throw error       
    }
}
// ! UPDATE ADDRESS

export const updateAddress = async(payload)=>{
    try {
        const res = await Api.post('/address/updateAddress', payload)
        return res.data;
    } catch (error) {
        throw error
    }
};