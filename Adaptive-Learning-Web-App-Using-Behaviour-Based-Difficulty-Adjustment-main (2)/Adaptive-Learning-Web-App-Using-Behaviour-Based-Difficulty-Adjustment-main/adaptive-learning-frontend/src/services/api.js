// ================= CONFIG =================
const CONFIG = {
  BASE_URL: "http://localhost:5000"
};

// ================= GET TOKEN =================
export function getToken() {
  return localStorage.getItem("token");
}

// ================= POST REQUEST (WITH AUTH) =================
export async function postRequest(endpoint, body) {
  const token = getToken(); // ✅ get token

  try {
    const res = await fetch(CONFIG.BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ FIXED
      },
      body: JSON.stringify(body)
    });

    if (res.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return null;
    }

    const data = await res.json();

    console.log("POST RESPONSE:", data); // 🔥 DEBUG

    return data;

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ================= GET REQUEST (WITH AUTH) =================
export async function fetchWithAuth(endpoint) {
  const token = getToken();

  try {
    const res = await fetch(CONFIG.BASE_URL + endpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ FIXED
        "Content-Type": "application/json"
      }
    });

    if (res.status === 401) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return null;
    }

    const data = await res.json();

    console.log("GET RESPONSE:", data); // 🔥 DEBUG

    return data;

  } catch (error) {
    console.error('Auth Fetch Error:', error);
    throw error;
  }
}

// ================= LOGIN =================
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ SAVE TOKEN HERE (VERY IMPORTANT)
    localStorage.setItem("token", data.token);

    console.log("TOKEN SAVED:", data.token); // 🔥 DEBUG

    return data;

  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}

export default CONFIG;