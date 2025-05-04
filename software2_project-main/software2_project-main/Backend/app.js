const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
console.log("Mongo URI:", process.env.connect_DB);

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));

mongoose
  .connect(process.env.connect_DB)
  .then(() => console.log("connected..."))
  .catch((e) => console.log(e));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/users", require("./routers/usersApi/getRoutes"));
app.use("/api/users", require("./routers/usersApi/postRoutes"));
app.use("/api/users", require("./routers/usersApi/putRoutes"));
app.use("/api/users", require("./routers/usersApi/deleteRoutes"));

app.use("/api/products", require("./routers/productsApi/getRoutes"));
app.use("/api/products", require("./routers/productsApi/postRoutes"));
app.use("/api/products", require("./routers/productsApi/putRoutes"));
app.use("/api/products", require("./routers/productsApi/deleteRoutes"));

app.use("/", require("./routers/authRoutes/authRoutes"));
app.use("/", require("./routers/view/viewRoutes"));

//app.use("/api/discount", require("./routes/discountApi/applyDiscount"));
//app.use("/api/discount", require("./routes/discountApi/removeDiscount"));

app.listen(process.env.PORT, () => {

  console.log(`Server is running on port ${process.env.PORT}`);
}
);