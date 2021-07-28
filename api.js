import axios from "axios";

// const API_URL = 'http://scanorderpay.ctportfolio.in/api/restaurant';
const API_URL = 'https://admin.squaredmenu.com/api/restaurant';

export const login = async (data) => {
    // var bodyFormData = new FormData();
    // bodyFormData.append('userName', 'Fred');
    const res = await axios({
        method: 'post',
        url: `${API_URL}/login`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    console.log(res.data)
    return res
}
