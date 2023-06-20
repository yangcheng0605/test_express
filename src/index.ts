import App from "./app";
const server = App.server;
server.on("listening", onListening);
function onListening () {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  // 输出当前目录（不一定是代码所在的目录）下的文件和文件夹
  console.log(`Listening on ${bind}`);
}