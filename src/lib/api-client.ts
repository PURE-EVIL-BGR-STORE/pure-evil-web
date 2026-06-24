// Khởi tạo và cấu hình các thư viện bên thứ 3
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  baseURL?: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, baseURL = BASE_URL, ...rest } = options;

  const url = path.startsWith("http") ? path : `${baseURL}${path}`;

  const response = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Request failed");
  }

  return data as T;
}

// Khởi tạo các phương thức API có thể sử dụng toàn cục
export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
};
