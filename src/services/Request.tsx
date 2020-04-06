import axios from 'axios';
import { useState } from 'react';

  export const sendGetRequest = async (URL: string) => {
    // const  apiKEY  =  "<YOUR_API_KEY_HERE>";
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
      data: data
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
    }).then(response => {
      return response.data;
    })
  };
  
  export const sendPutRequest = async (URL: string, data: any) => {
    return await axios({
      url: URL,
      method: 'put',
      data: data
    }).then(response => {
      return response.data;
    })
  };