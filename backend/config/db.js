const mongoose = require("mongoose");
const colors = require("colors");

exports.connectDB = async () => {
  try {
    const conne = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `connected to mongodb Database ${conne.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgRed.blue);
  }
};
