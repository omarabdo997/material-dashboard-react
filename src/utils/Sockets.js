import openSocket from "socket.io-client";

const socketEndpoint = process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:5001";
const socket = openSocket(socketEndpoint);
// socket.auth = { token: localStorage.getItem("token") };

// export const changeToken = () => {
//     socket.disconnect();
//     socket.auth = { token: localStorage.getItem("token") };
//     socket.connect();
// }

socket.on("connect", () => {
  console.log("connected in client");
});

// export const disconnectListener = (cb) => {
//     socket.on("disconnect", () => {
//         cb()
//     })
// }
const alertsListener = (cb) => {
  socket.on("car", (car) => {
    cb(car);
  });
};

export default alertsListener;
