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

export const launchGui = async (server = 0) => {
  try {
    const token = localStorage.getItem("token");
    const bearerToken = `Bearer ${token}`;
    server = server === null ? 0 : server;
    await fetch(fileServerEndPoint + `/open-gui?server_id=${server}`, {
      headers: {
        Authorization: bearerToken,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const addCarAPI = async (car) => {
  // const token = localStorage.getItem("token");
  // const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/cars`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: bearerToken,
    },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const deleteCarAPI = async (plateNumber) => {
  // const token = localStorage.getItem("token");
  // const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/cars/${plateNumber}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: bearerToken,
    },
  });
  return res.json();
};

export const updateCarAPI = async (car, plateNumber) => {
  // const token = localStorage.getItem("token");
  // const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/cars/${plateNumber}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: bearerToken,
    },
    body: JSON.stringify(car),
  });
  return res.json();
};

const callGet = async (url) => {
  try {
    // const token = localStorage.getItem("token");
    // const bearerToken = `Bearer ${token}`;
    const data = await fetch(url, {
      // headers: {
      //     Authorization: bearerToken,
      // },
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

export const deleteViolationAPI = async (id) => {
  // const token = localStorage.getItem("token");
  // const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/violations/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: bearerToken,
    },
  });
  return res.json();
};

export const issueViolationAPI = async (id) => {
  // const token = localStorage.getItem("token");
  // const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/violations/${id}/issue`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: bearerToken,
    },
  });
  return res.json();
};

export const getZoneByType = async (type, page = 1) => {
  const url = endPoint + `/api/zones/${type}?page=${page}`;
  return await callGet(url);
};

export const getAlerts = async (page = 1) => {
  const url = endPoint + `/api/alerts?page=${page}`;
  return await callGet(url);
};

export const getAllServers = async () => {
  const url = endPoint + `/api/servers`;
  return await callGet(url);
};

export const getAreas = async () => {
  const url = endPoint + `/api/areas`;
  return await callGet(url);
};

export const addServer = async (serverId, ipAddress) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/servers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify({
      id: serverId,
      ipAddress: ipAddress,
    }),
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

export const signUp = async (email, password, isAdmin) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify({
      email,
      password,
      isAdmin,
    }),
  });
  const jsonRes = await res.json();
  return jsonRes;
};

export const updateServer = async (serverId, ipAddress) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/servers/${serverId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify({
      id: serverId,
      ipAddress: ipAddress,
    }),
  });
  return res.json();
};
export const resetCount = async (zoneId) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/zones/${zoneId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify({
      In: 0,
      Out: 0,
    }),
  });
  return res.json();
};

export const deleteServer = async (serverId) => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const res = await fetch(endPoint + `/api/servers/${serverId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  return res.json();
};

export const downloadVideo = async (videoRelativePath, fileName, ipAddress = null) => {
  let url;
  if (ipAddress !== null) {
    url = `http://${ipAddress}:${flaskPort}` + `/incidents/${videoRelativePath}/${fileName}`;
  } else {
    url = fileServerEndPoint + `/incidents/${videoRelativePath}/${fileName}`;
  }

  try {
    let data = await fetchWithTimeout(url);
    try {
      data = await data.json();
    } catch (err) {
      data = {
        success: true,
      };
    }
    return { data, url };
  } catch (err) {
    console.log(err);
    const data = {
      success: false,
    };
    return { data, url };
  }
};
