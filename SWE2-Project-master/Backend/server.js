const mongoose = require("mongoose");
const app = require('./app');
require("dotenv").config({ path: "E:/Downloads/SWE2-Project-master/SWE2-Project-master/Backend/.env" });
mongoose
  .connect(process.env.connect_DB)
  .then(app.listen(process.env.PORT, () => {

    console.log(`Server is running on port ${process.env.PORT}`);
  }
  ))
  .catch((e) => console.log(e));