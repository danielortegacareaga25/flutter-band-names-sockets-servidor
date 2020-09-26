const io = require("./../index").io;

io.on("connection", (client) => {
  console.log("Cliente conectado");
  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (data) => {
    console.log(data);
    io.emit("mensaje", { admin: "Nuevo mensaje del admin" });
  });
});
