const Band = require("../models/band");
const Bands = require("../models/bands");

const io = require("./../index").io;

const bands = new Bands();

bands.addBand(new Band("Skipknot"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Slayer"));
bands.addBand(new Band("System Of a Down"));
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (data) => {
    console.log(data);
    io.emit("mensaje", { admin: "Nuevo mensaje del admin" });
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
  client.on("add-band", (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });
  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("emitir-mensaje", (payload) => {
    console.log("emitir mensaje", payload);
    client.broadcast.emit("nuevo-mensaje", payload);
  });
});
