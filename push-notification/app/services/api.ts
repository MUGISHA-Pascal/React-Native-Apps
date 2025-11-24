// services/api.ts
const API_URL = "http://10.12.73.199:5000/api"; // Replace with your local IP

const handleResponse = async (response: Response) => {
  const data = await response.text();
  try {
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to parse JSON response:", data);
    throw new Error(`Invalid JSON response: ${data.substring(0, 100)}...`);
  }
};

const fetchWithErrorHandling = async (
  url: string,
  options: RequestInit = {}
) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`API Error (${response.status}):`, errorData);
      throw new Error(`Request failed with status ${response.status}`);
    }
    return handleResponse(response);
  } catch (error) {
    console.error("Network error:", error);
    throw new Error(
      "Failed to connect to the server. Please check your connection."
    );
  }
};

export const login = async (email: string, password: string) => {
  return fetchWithErrorHandling(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  return fetchWithErrorHandling(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
  });
};

export const createHomework = async (
  token: string,
  title: string,
  description: string,
  dueDate: string
) => {
  return fetchWithErrorHandling(`${API_URL}/homework`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, dueDate }),
  });
};

export const getHomeworks = async (token: string) => {
  console.log(
    "Fetching homeworks with token:",
    token ? `${token.substring(0, 10)}...` : "No token"
  );

  const response = await fetchWithErrorHandling(`${API_URL}/homework`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error("Error in getHomeworks:", error);
    throw error;
  });

  console.log("Homeworks response:", response);
  return response;
};
