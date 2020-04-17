  import axios, { AxiosBasicCredentials } from 'axios';
  import apikey from '../apikey.json';

  const auth: AxiosBasicCredentials = {
    username: apikey.name,
    password: apikey.password
  };

  export const sendGetRequest = async (URL: string) => {
    return await axios({
      url: URL,
      method: 'get',
    }).then(response => {
      return response.data;
    })
    .catch(response => {
      console.log(response);
      alert(response);
    })
  };

  export const sendPostRequest = async (URL: string, data: any) => {
    return await axios({
      url: URL,
      method: 'post',
      data: data,
      auth: auth,
    }).then(response => {
      return response.data;
    })
    .catch(response => {
      console.log(response);
      alert(response);
    })
  };
  
  export const sendDeleteRequest = async (URL: string) => {
    return await axios({
      url: URL,
      method: 'delete',
      auth: auth,
    }).then(response => {
      return response.data;
    })
  };
  
  export const sendPutRequest = async (URL: string, data: any) => {
    return await axios({
      url: URL,
      method: 'put',
      data: data,
      auth: auth,
    }).then(response => {
      return response.data;
    })
  };

  export const sendPatchRequest = async (URL: string, data: any) => {
    return await axios({
      url: URL,
      method: 'patch',
      data: data,
      auth: auth,
    }).then(response => {
      return response.data;
    })
  };