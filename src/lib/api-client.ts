const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  baseURL?: string
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, baseURL = BASE_URL, ...rest } = options

  const url = path.startsWith('http') ? path : `${baseURL}${path}`

  // Placeholder for injecting client-side Authorization header if required
  const authHeaders: Record<string, string> = {}

  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error ?? 'Request failed')
  }

  return data as T
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
}
