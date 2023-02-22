/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation } from 'react-query';
import axios from './baseAxiosMethod';

export const postRequest = async ({ url, data }) => {
  const response = await axios.post(url, data);
  return response.data;
};

export const putRequest = async ({ url, data }) => {
  const response = await axios.put(url, data);
  return response.data;
};

export const getRequest = async ({ url }) => {
  const response = await axios.get(url);
  return response.data;
};

export const deleteRequest = async ({ url }) => {
  const response = await axios.delete(url);
  return response.data;
};

export const fetchQuery = (key, url, cb) => {
  const data = useQuery(key, async () => getRequest({ url }), cb);
  return data;
};

export const mutateQuery = (method, cb) => {
  switch (method) {
    case 'PUT':
      return useMutation(putRequest, cb);
    case 'DELETE':
      return useMutation(deleteRequest, cb);
    default:
      return useMutation(postRequest, cb);
  }
};
