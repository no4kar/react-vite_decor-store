/* eslint-disable @typescript-eslint/no-explicit-any */
// const BASE_URL = 'https://mate.academy/students-api';
const BASE_URL = 'http://localhost:8081/api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  // offers: <T>(url: string) => request<T>(url, 'GET'),
  // wallpaper: <T>(url: string) => request<T>(url, 'GET'),
};
