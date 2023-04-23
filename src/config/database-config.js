const mongoose = require("mongoose");
const { DBNAME } = require("./server-config");
const connect = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${DBNAME}`);
  console.log("db connected");
};
module.exports = connect;
