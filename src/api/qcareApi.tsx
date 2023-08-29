import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURL = 'https://q-care.info/api'
const baseURL = 'http://192.168.1.84:4000/api'

const qcareApi = axios.create({ baseURL });

qcareApi.interceptors.request.use(

    async(config) => {
        const token = await AsyncStorage.getItem('token')

        if(token){
            config.headers!['x-token'] = token;
        } 
        return config;
    }
);

export default qcareApi