import { request, APIRequestContext, expect } from '@playwright/test';

let apiContext: APIRequestContext;

export async function initAPIContext() {
  apiContext = await request.newContext({
    baseURL: 'https://gigglefinance.com/api',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_TOKEN || ''}`,
    },
  });
  return apiContext;
}

export async function getRequest(endpoint: string) {
  const res = await apiContext.get(endpoint);
  expect(res.ok()).toBeTruthy();
  return res.json();
}

export async function postRequest(endpoint: string, data: any) {
  const res = await apiContext.post(endpoint, { data });
  expect(res.ok()).toBeTruthy();
  return res.json();
}

export async function putRequest(endpoint: string, data: any) {
  const res = await apiContext.put(endpoint, { data });
  expect(res.ok()).toBeTruthy();
  return res.json();
}

export async function deleteRequest(endpoint: string) {
  const res = await apiContext.delete(endpoint);
  expect(res.ok()).toBeTruthy();
  return res.json();
}

// Example usage in test:
// const api = await initAPIContext();
// const response = await getRequest('/loans');
