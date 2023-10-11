const mongoose = require("mongoose");
require("dotenv").config();

module.exports.dataBaseConnection = async (app) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to Database");
    // app.listen(process.env.PORT);
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
