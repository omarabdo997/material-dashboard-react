export const endPoint = process.env.REACT_APP_NODE_END_POINT || "http://localhost:5000";
const fileServerEndPoint = process.env.REACT_APP_FLASK_END_POINT || "http://localhost:5500";
const flaskPort = fileServerEndPoint.split(":")[2];

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

export const isAlive = async (ipAddress = null) => {
  try {
    if (ipAddress !== null) {
      const res = await fetchWithTimeout(`http://${ipAddress}:${flaskPort}/`);
      return true;
    }
    const res = await fetchWithTimeout(fileServerEndPoint + "/");
    return true;
  } catch (e) {
    return false;
  }
};

export const addCarAPI = async (car) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/cars`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const deleteCarAPI = async (plateNumber) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/cars/${plateNumber}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  return res.json();
};

export const updateCarAPI = async (car, plateNumber) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/cars/${plateNumber}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify(car),
  });
  return res.json();
};

const callGet = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const bearerToken = `Bearer ${token}`;
    const data = await fetch(url, {
      headers: {
        Authorization: bearerToken,
      },
    });
    return data.json();
  } catch (err) {
    console.log(err);
  }
};

export const getAllCarsApi = async (page = 1, search = "") => {
  const url = endPoint + `/api/cars?page=${page}&search=${search}`;
  return await callGet(url);
};

export const getAllUsers = async (page = 1, search = "") => {
  const url = endPoint + `/api/users?page=${page}&search=${search}`;
  return await callGet(url);
};

export const getCarApi = async (plateNumber) => {
  if (plateNumber) {
    const url = endPoint + `/api/cars/${plateNumber}`;
    console.log("car url is", url);
    return await callGet(url);
  } else {
    return {
      success: true,
      car: undefined,
      totalCount: 0,
    };
  }
};

export const getViolationsAPI = async (page = 1, type = undefined, plateNumber = undefined) => {
  let url;
  if (type !== undefined) {
    if (plateNumber === undefined) url = endPoint + `/api/violations?page=${page}&type=${type}`;
    else url = endPoint + `/api/cars/${plateNumber}/violations?page=${page}&type=${type}`;
  } else {
    if (plateNumber === undefined) url = endPoint + `/api/violations?page=${page}`;
    else url = endPoint + `/api/cars/${plateNumber}/violations?page=${page}`;
  }
  return await callGet(url);
};

export const getAnalyticsAPI = async (from = undefined, to = undefined) => {
  console.log("from is", from);
  let url;
  if (from !== undefined) {
    if (to === undefined) url = endPoint + `/api/analytics?from=${from}`;
    else url = endPoint + `/api/analytics?from=${from}&to=${to}`;
  } else if (to !== undefined) {
    url = endPoint + `/api/analytics?to=${to}`;
  } else {
    url = endPoint + `/api/analytics`;
  }
  console.log("called url is", url);
  return await callGet(url);
};

export const deleteViolationAPI = async (id) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/violations/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  return res.json();
};

export const issueViolationAPI = async (id) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/violations/${id}/issue`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  return res.json();
};

export const signIn = async (email, password) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const jsonRes = await res.json();

  if (jsonRes.success) {
    localStorage.setItem("token", jsonRes.token);
  }
  return jsonRes;
};

export const addUser = async (formData) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/users`, {
    method: "POST",
    headers: {
      Authorization: bearerToken,
    },
    body: formData,
  });
  const jsonRes = await res.json();
  return jsonRes;
};

export const editUser = async (formData, userId) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: bearerToken,
    },
    body: formData,
  });
  const jsonRes = await res.json();
  return jsonRes;
};
