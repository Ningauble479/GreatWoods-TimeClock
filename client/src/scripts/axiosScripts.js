import axios from 'axios'

export default async function axiosScript (type, path, args) {

    if(type === 'get') {
        let data = await axios.get(`${path}`)
        return data
    }
    else if(type === 'post'){
        let data = await axios.post(`${path}`, args)
        return data
    }
    else {
        return {success: false, message: 'Axios http call type not defined'}
    }
}