import axios, { AxiosInstance, AxiosResponse } from 'axios';

export function getClient(BASE_URL: string) {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL
  });

  return {
    get: <T>(url: string): Promise<AxiosResponse<T>> => axiosInstance.get<T>(url),
    post: <T>(url: string, data: any): Promise<AxiosResponse<T>> => axiosInstance.post<T>(url, data),
    patch: <T>(url: string, data: any): Promise<AxiosResponse<T>> => axiosInstance.patch<T>(url, data),
    delete: <T>(url: string): Promise<AxiosResponse<T>> => axiosInstance.delete<T>(url),
  };
}
