import axios from 'axios'

export default async function axiosScript (type, path, args) {

    if(type === 'get') {
        let data = await axios.get(`greatwoodstc.com${path}`)
        return data
    }
    else if(type === 'post'){
        let data = await axios.post(`greatwoodstc.com${path}`, args)
        return data
    }
    else {
        return {success: false, message: 'Axios http call type not defined'}
    }
}