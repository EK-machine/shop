export interface httpErr {
  response: {
    data: string;
  };
  message: string;
}

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

function apiService<T>(url: string, method: HTTPMethods, body?: unknown | null, hideError = false): Promise<T> {
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
        // eslint-disable-next-line no-shadow
        return response.json().then((body) => {
          if (body.length === 0) {
            throw new Error(response.statusText);
          } else {
            throw new Error(JSON.stringify(body));
          }
        });
      }
      return response.text().then((data) => (data.length === 0 ? null : isJson(data)));
    })
    .then((data: T) => data)
    .catch((error: httpErr) => {
      if (!hideError) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data;
          console.error(errorMessage);
          throw error;
        } else if (error) {
          if (typeof JSON.parse(error.message) === 'object') {
            if ('message' in JSON.parse(error.message)) {
              if (JSON.parse(error.message).message !== '') {
                console.error(JSON.parse(error.message).message);
              }
            }
          } else {
            console.error(error.message);
          }
        } else {
          console.error('Something went wrong.');
        }
      }
      throw error;
    });
}

const httpService = {
  get: <T>(url: string, hideError?: boolean): Promise<T> => apiService(url, HTTPMethods.GET, null, hideError),

  post: <T>(url: string, body?: unknown, hideError?: boolean): Promise<T> =>
    apiService(url, HTTPMethods.POST, body, hideError),

  put: <T>(url: string, body?: unknown, hideError?: boolean): Promise<T> =>
    apiService(url, HTTPMethods.PUT, body, hideError),

  patch: <T>(url: string, body: unknown, hideError?: boolean): Promise<T> =>
    apiService(url, HTTPMethods.PATCH, body, hideError),
};

export default httpService;
