const isJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

// eslint-disable-next-line no-shadow
export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

interface IRequestParams {
  method: HTTPMethods;
  headers: {
    [key: string]: string;
  };
  body?: string;
}

function apiService<T>(url: string, method: HTTPMethods, body?: unknown | null): Promise<T> {
  const requestParams: IRequestParams = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  if (method === HTTPMethods.POST || method === HTTPMethods.PUT || method === HTTPMethods.PATCH) {
    requestParams.body = JSON.stringify(body);
  }
  return fetch(url, {
    ...requestParams,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `status ${response.status}: ${response.statusText}; bodyUsed: ${response.bodyUsed}; url: ${response.url}; type: ${response.type}; redirected: ${response.redirected}.`,
        );
      }
      return response.text().then((data) => (data.length === 0 ? null : isJson(data)));
    })
    .then((data: T) => data)
    .catch((error) => {
      throw error;
    });
}

const httpService = {
  get: <T>(url: string): Promise<T> => apiService(url, HTTPMethods.GET, null),

  post: <T>(url: string, body?: unknown): Promise<T> => apiService(url, HTTPMethods.POST, body),

  put: <T>(url: string, body?: unknown): Promise<T> => apiService(url, HTTPMethods.PUT, body),

  patch: <T>(url: string, body?: unknown): Promise<T> => apiService(url, HTTPMethods.PATCH, body),
};

export default httpService;
