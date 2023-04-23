const express = require("express");
const server = express();
const connect = require("./config/database-config");
const { PORT } = require("./config/server-config");
const user = require("./models/users");
const Trepo = require("./repository/transaction-repo");
const routing = require("./routes/index");
const cors = require("cors");

// server.use(cors());
server.use(express.json());
server.use("/api", routing);

const createAndstartServer = async () => {
  server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
  });
  await connect();
  // await user.create({
  //   email: "adminn@gmail.com",
  //   password: "12345",
  //   username: "adminn",
  // });
  // const usere = await user.findById("643e4de55292c76b26c8068a");
  // const ans = usere.createToken();
  // console.log(ans);
  const tservice = new Trepo();
  // await tservice.customApi({ fyear: 2023, fmonth: 4, fdate: 23 });
};
createAndstartServer();
