export const API_BASE_URL = 'http://localhost:8080/api';

export const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      })
    );
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return null;
}