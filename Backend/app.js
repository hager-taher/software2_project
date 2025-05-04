const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv/config");

app.set("view-engine", "ejs");
app.use(express.static("public"));

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

//app.use("/api/products", require("./routes/productsApi/getRoutes"));
//app.use("/api/products", require("./routes/productsApi/postRoutes"));
//app.use("/api/products", require("./routes/productsApi/putRoutes"));
//app.use("/api/products", require("./routes/productsApi/deleteRoutes"));

app.use("/", require("./routers/authRoutes/authRoutes"));
//app.use("/", require("./routers/view/viewRoutes"));

//app.use("/api/discount", require("./routes/discountApi/applyDiscount"));
//app.use("/api/discount", require("./routes/discountApi/removeDiscount"));

app.listen(8018);