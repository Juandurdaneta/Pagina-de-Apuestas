const mongoose = require("mongoose");

const uri = "mongodb+srv://josejr22:Samuel0403@cluster0.b3lvx.mongodb.net/Apuestas_futbol?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .catch(err => console.log(err));

const db = mongoose.connection;

db.once("open", _ => {
  console.log("Database is connected to:", uri);
});

db.on("error", err => {
  console.log(err);
});