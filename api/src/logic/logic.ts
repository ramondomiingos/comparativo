import axios from 'axios';

import AppConfig from '../config/configs';

export const getExtrato = async (token:string) =>{
    return await  axios.get('http://'+ AppConfig.UNIPOT_HOST+':8001/extrato', {
        params: {
          token: token
        }} )
    .then(function (response) {
      // handle success
     
      return response.data
    })
    .catch(function (error) {
      // handle error
   
      return error
    })
}